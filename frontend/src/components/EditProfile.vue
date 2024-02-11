<template>
  <form @submit.prevent="updateProfile" class="edit-profile-form">
    <div class="form-item">
      <label for="profile-picture">Profile Picture</label>
      <input type="file" id="profile-picture" @change="handleFileUpload">
    </div>
    <button type="submit">Update Profile Picture</button>
  </form>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      profilePictureUrl: "", // Define profilePictureUrl property to hold the URL of the profile picture
      profilePicture: null
    };
  },
  methods: {
    async updateProfile() {
      // Prepare form data
      const formData = new FormData();
      formData.append("profilePicture", this.profilePicture);

      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        // Handle success
        console.log("Profile picture updated successfully");
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
  color: white;
}
</style>
