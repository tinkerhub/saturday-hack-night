<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,200;0,400;0,600;1,700&display=swap");

#app {
  font-family: "Inter", "Helvetica", sans-serif;
  padding-top: 50px;
}
</style>
