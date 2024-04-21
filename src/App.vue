<script>
import { RouterLink, RouterView } from 'vue-router'
import navBarComp from './components/navBarComp.vue'
import FooterComp from './components/FooterComp.vue'
export default {
  components: { navBarComp, RouterLink, RouterView, FooterComp }
}
</script>

<template>
  <header class="bg-white fixed md:w-full z-50 md:px-10 ">
    <navBarComp />
  </header>
  <RouterView class="md:pt-[2rem]  pt-6" />
  <FooterComp/>
</template>
