<template>
  <form @submit.prevent="updateProfile" class="edit-profile-form">
    <div class="form-item">
      <label for="name">Name</label>
      <input v-model="name" type="text" id="name" placeholder="Name" required>
    </div>

    <div class="form-item">
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" placeholder="Password" required>
    </div>

    <div class="form-item">
      <label for="profile-picture">Profile Picture</label>
      <input type="file" id="profile-picture" @change="handleFileUpload">
    </div>

    <button type="submit">Update Profile</button>
  </form>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      name: "",
      password: "",
      profilePicture: null
    };
  },
  methods: {
    async updateProfile() {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("password", this.password);
      formData.append("profilePicture", this.profilePicture);

      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          body: formData,
          // Add headers if needed, like authorization token
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        // Handle success
        console.log("Profile updated successfully");
      } catch (error) {
        console.error(error.message);
        // Handle error
      }
    },
    handleFileUpload(event) {
      this.profilePicture = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.edit-profile-form {
  text-align: center;
  width: 400px;
  margin: auto;
}

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
  display: inline-block;
  width: 70%;
}

button {

  background-color: #4a69bd;
  border: none;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
}
</style>
