<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Main Page</router-link></li>
        <li><router-link to="/contact">About</router-link></li>
      </ul>
    </nav>

    <router-link to="/editprofile">
      <img src="@/assets/profile-photo.jpg" alt="Personal Photo" class="profile-photo">
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Navbar"
}

</script>

<style scoped>
header {
  height: 60px;
  width: 100%;
  background-color: #3b5998;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav li {
  padding: 10px;
}

nav a {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s;
  font-size: large;
}

nav a:hover {
  background-color: #4a69bd;
}

.profile-photo {
  border-radius: 50%;
  margin-right: 20px;
  width: 40px;
  height: 40px;
}
</style>
