<template>
  <Navbar></Navbar>

  <main>
    <router-view />
  </main>

  <Footer></Footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Footer
    }
}
</script>


<style scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main { /* to fix the components being rendered inside the navbar */
  margin-top: 60px;
  min-height: 85vh; /*so that footer isnt on the top if few content*/
}


</style>
