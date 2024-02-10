<template>
  <div class="container">
    <div class="card">
      <SignupForm />
    </div>
  </div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "SignupView",
  components: {
    SignupForm,
  },
};
</script>

<style>


.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card {
  max-width: 400px; /* Adjust the max-width as needed */
  padding: 10px;
  border-radius: 15px;
  background-color: #ebf3db;
  text-align: center;
}
</style>
