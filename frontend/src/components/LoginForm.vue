<template>
  <form @submit.prevent="login">
    <div class="form-item">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" placeholder="Email" required>
    </div>

    <div class="form-item">
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" placeholder="Password" required>
    </div>
    <button type="submit" class="center">LogIn</button>
    <button @click="this.$router.push('/signup')" class="center">Signup</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      var data = {
        email: this.email,
        password: this.password,
      };

      // kutsume store'st välja login meetodi, mis suhtleb express.js, kui logimine edukas siis store isAuthenticated muutub True ja saame ligi postidele
      try {
        await this.$store.dispatch("login", data);
        console.log("Login successful!");
        // You can now access isAuthenticated from the store
        console.log("Is Authenticated:", this.$store.getters.isAuthenticated);
        // Redirect to /main or handle the successful login as needed
        this.$router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    },
  },
};
</script>

<style scoped>

.form-item {
  margin: 10px;
  text-align: left;
}

.form-item label {
  margin-bottom: 5px;
  display: inline-block;
  width: 30%;
}

.form-item input {
  padding: 8px;
  box-sizing: border-box;
  width: 70%;
}

button {

  background-color: #4a69bd;
  border: none;
  margin-left: 10px;

  padding: 7px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 18px;
  margin-top: 10px;
}
</style>
