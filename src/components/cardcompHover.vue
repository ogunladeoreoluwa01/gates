<template>
  <div class="relative group max-w-fit cursor-pointer">
    <div
      v-if="checkCondition()"
      class="scale-[75%] sm:scale-[85%] md:scale-[95%] lg:scale-100 rounded-full text-zinc-50 absolute text-base top-[-10px] left-[-10px] w-[2.85rem] h-[2.85rem] justify-center items-center z-10 font-bold font-raleway flex bg-black shadow-zinc-800 shadow-md"
      :style="{ backgroundColor: itemBackgroundColor }"
    >
      #{{ index + 1 }}
    </div>
    <div class="flex flex-col max-w-fit items-start gap-[0.1rem]">
      <div
        class="w-[150px] h-[220px] sm:w-[184px] sm:h-[264px] md:w-[207px] md:h-[297px]  lg:w-[230px] lg:h-[330px] overflow-hidden rounded-t-md"
        :style="{ backgroundColor: itemBackgroundColor }"
      >
        <img
          :src="imageSrc"
          :alt="altText"
          class="w-[150px] h-[220px] sm:w-[184px] sm:h-[264px] md:w-[207px] md:h-[297px]  lg:w-[230px] lg:h-[330px] md:hover:grayscale-0 hover:scale-110 md:grayscale-[45%] transition-all duration-200 ease-linear object-cover rounded-t-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        />
      </div>
      <span
        class="w-[150px]  sm:w-[184px]  md:w-[207px]   lg:w-[230px]  truncate leading-none md:text-base text-sm text-zinc-900 dark:text-zinc-50 font-bold font-raleway capitalize"
      >
        {{ headingText }}
      </span>
    </div>
    <div
      class="scale-90 w-[300px] min-h-[200px] absolute rounded-md flex-col z-40 gap-2 shadow-lg bg-white dark:text-zinc-50 dark:bg-zinc-800 p-4 md:group-hover:flex hidden top-[35%] -translate-y-[-40%] -right-[0.5rem] translate-x-[15%] transition-all duration-300 ease-linear animate-fade-in"
    >
      <h1 class="font-semibold capitalize text-base" :style="{ color: itemBackgroundColor }">
        {{ headingText }}
      </h1>
      <h1 class="text-base font-semibold capitalize">
        {{ transformString(status) }}
      </h1>
      <h1 class="font-semibold capitalize text-base" :style="{ color: itemBackgroundColor }">
        {{ format }} {{ format === 'TV' ? 'Show' : '' }}
      </h1>

      <h1 class="text-base font-semibold capitalize">{{ episodes }} episodes</h1>
      <ul class="flex flex-row gap-1 flex-wrap">
        <li
          v-for="(genre, genreIndex) in genres"
          :key="genreIndex"
          class="text-xs font-bold py-1 px-2 rounded-full text-white bg-black"
          :style="{ backgroundColor: itemBackgroundColor }"
        >
          {{ genre }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkCondition() {
      return (
        this.index <= 99 &&
        (this.search === 'trending' ||
          this.search === 'popular' ||
          this.search === 'top-100' ||
          this.numbersAllowed === true)
      )
    },
    transformString(str) {
      return str.replace(/[_-]/g, ' ')
    }
  },
  props: {
    index: {
      type: Number,
      default: 0,
      reqiured: false
    },
    search: {
      type: String,
      default: 'hello',
      reqiured: false
    },
    status: {
      type: String,
      default: 'airing'
    },
    genres: {
      type: Array,
      default: () => []
    },
    episodes: {
      type: String,
      default: '02'
    },
    format: {
      type: String,
      default: 'TV'
    },
    itemBackgroundColor: {
      type: String,
      default: 'red'
    },
    imageSrc: {
      type: String,
      default: 'https://i.pinimg.com/736x/dd/e8/3e/dde83e1a3738b62cc2b517278ea195ee.jpg'
    },
    altText: {
      type: String,
      default: ''
    },
    headingText: {
      type: String,
      default: 'Default Name'
    },
    numbersAllowed: {
    type: Boolean,
    default: false // Default value is false
  }
  }
}
</script>
