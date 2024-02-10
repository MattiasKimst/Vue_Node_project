<template>
  <div class="container">
    <div class="card">
      <LoginForm/>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};

</script>

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.card {
  max-width: 400px;
  padding: 10px;
  border-radius: 1px;
  background-color: #3b5998;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

.or-divider {
  margin: 10px 0;
  position: relative;
}

.or-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ebf3db;
  padding: 0 10px;
  color: #666;
}

.signup-button {
  border-radius: 15px;
  background-color: #4a69bd;
  border: none;
  padding: 7px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 18px;
  margin-top: 10px;
}
</style>
