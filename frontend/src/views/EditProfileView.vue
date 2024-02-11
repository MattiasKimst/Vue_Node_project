<template>
  <div class="container">

    <h1>Edit Profile</h1>
    <div class="card">
      <ProfileForm/>
    </div>
  </div>
</template>

<script>
import ProfileForm from '@/components/EditProfile.vue';


export default {
  components: {

    ProfileForm
  }
};
</script>
<style scoped>
h1{
  text-align: center;
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
.container {
  display: flex;


  height: 40vh;
}
</style>