<template>
    <div class="flex items-center justify-center w-full ml-10 mr-10 group text-center scale-90" v-touch:swipe.left="decrementIndex" v-touch:swipe.right="incrementIndex">
      <div class="flex  w-fit  flex-col gap-3 items-center justify-center" v-if="trending.length > 0">

        <div
          :key="trending[currentIndex].id + 'image'"
          class=" w-[300px] h-[450px] flex items-center justify-center slide-in-right"
          @click="redirectToAnime"
        >
        
          <img
          loading="lazy"
          decoding='async'
          fetchPriority='high'
            :src="trending[currentIndex].coverImage.extraLarge"
            :alt="trending[currentIndex].title.userPreferred"
            class="w-full h-full object-cover object-center scale-105 cursor-pointer"
            @click="redirectToAnime"
          />
          <div
            class="absolute inset-0 bg-zinc-900 opacity-10 scale-105 group-hover:scale-105 transition-all duration-200 ease-linear cursor-pointer"
            @click="redirectToAnime"
          ></div>
        </div>
        <ul
        :key="trending[currentIndex].id"
        class="w-[300px] self-center flex justify-start gap-2 flex-col "
      >
        <li class="text-white text-lg font-bold font-raleway slide-in-right cursor-pointer" @click="redirectToAnime">
          {{ trending[currentIndex].title.userPreferred }}
        </li>
        
      </ul>
        <ul
        class="text-base flex  gap-1 font-raleway font-medium  mb-7"
      >
      <li v-for="(name, index) in trending" :key="index" @click="changeIndex(index)"
  :class="{
    'cursor-pointer w-[7.5px] h-[7.5px] rounded truncate self-center': true,
    'bg-white opacity-20 font-semibold': currentIndex !== index,
    'bg-white font-semibold active': currentIndex === index,
  }">
</li>

      </ul>
      </div>
     
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        trending: [],
        currentIndex: 0,
        timer: null,
        retries: 3
      }
    },
  
    methods: {
      redirectToAnime() {
        const animeId = this.trending[this.currentIndex].id
        this.$router.push({ path: `/anime/${animeId}` })
      },
      fetchData() {
        const url = 'https://graphql.anilist.co/query'
        const query = `
          query($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int,$isAdult: Boolean) {
            trending: Page(page: 1, perPage: 5) {
              media(sort: TRENDING_DESC, type: ANIME, isAdult: $isAdult) {
                ...media
              }
            }
            season: Page(page: 1, perPage: 8) {
              media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: $isAdult) {
                ...media
              }
            }
            nextSeason: Page(page: 1, perPage: 8) {
              media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME,isAdult: $isAdult) {
                ...media
              }
            }
            popular: Page(page: 1, perPage: 8) {
              media(sort: POPULARITY_DESC, type: ANIME, isAdult: $isAdult) {
                ...media
              }
            }
            top: Page(page: 1, perPage: 10) {
              media(sort: SCORE_DESC, type: ANIME, isAdult: $isAdult) {
                ...media
              }
            }
          }
  
          fragment media on Media {
            id
            title {
              userPreferred
            }
            coverImage {
              extraLarge
              large
              color
            }
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            bannerImage
            season
            seasonYear
            description
            type
            format
            status(version: 2)
            episodes
            duration
            chapters
            volumes
            genres
            isAdult
            averageScore
            popularity
            mediaListEntry {
              id
              status
            }
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            studios(isMain: true) {
              edges {
                isMain
                node {
                  id
                  name
                }
              }
            }
          }
        `
  
        const variables = {
          type: 'ANIME',
          season: 'WINTER',
          seasonYear: 2024,
          nextSeason: 'SPRING',
          nextYear: 2024,
          isAdult: false
        }
  
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client: '15430',
            client_secret: '0LDTy3O2LhkXP7UdgcRWH3OkD7Vr2df1daKZAmau',
            query: query,
            variables: variables
          })
        })
          .then((response) => response.json())
          .then((data) => {
            
            // Assign data to respective variables
            this.trending = data.data.trending.media
          
          })
          .then(() => {
            // Start the timer after data is fetched and assigned
            this.startTimer()
          })
          .catch((error) => {
            console.error('Error fetching data:', error)
  
            if (this.retries > 0) {
              console.log(`Retrying... Attempts left: ${this.retries}`)
              // Decrease the retry count
              this.retries--
  
              // Call fetchData again after a delay
              setTimeout(() => {
                this.fetchData()
              }, 600)
            } else {
              console.error('Retry limit exceeded')
              // Handle the case when retry limit is exceeded
            }
          })
      },
  
      startTimer() {
        this.timer = setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.trending.length
        }, 5000) // Change index every 2 seconds (adjust as needed)
      },
      changeIndex(index) {
        this.currentIndex = index
        clearInterval(this.timer)
        this.startTimer() // Restart the timer
      }
    },
    incrementIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.trending.length
    },
    decrementIndex() {
      this.currentIndex = this.currentIndex === 0 ? this.trending.length - 1 : this.currentIndex - 1
    },
  
    mounted() {
      this.fetchData() // Call fetchData method when the component is mounted
    }
  }
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
  .slide-in-right {
    -webkit-animation: slide-in-right 1.5s linear both;
    animation: slide-in-right 1.5s linear both;
  }
  
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  </style>
  