<template>
  <footer>
    <br>
    <text>Copyright © 2023</text>
  </footer>
</template>

<script> export default {
  name: "Footer"
} </script>

<style scoped> body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: auto;
}

footer {
  height: 50px;
  background-color: #d8d8d8;
  border-radius: 15px;
  margin-top: auto;
}
text {

  padding-left: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;

}

</style>