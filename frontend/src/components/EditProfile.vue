<template>
  <form @submit.prevent="updateProfile" class="edit-profile-form">
    <div class="form-item">
      <label for="profile-picture">Profile Picture</label>
      <input
          type="file"
          id="profile-picture"
          accept="image/*"
          required
          @change="handleFileUpload"
      >
      <img v-if="profilePicture" :src="createObjectURL(profilePicture)" alt="Preview" />
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
      profilePicture: null,
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
          throw new Error(`Failed to update profile: ${await response.text()}`);
        }

        // Handle success
        console.log("Profile picture updated successfully");
      } catch (error) {
        console.error(error.message);
        // Handle and display the error to the user
      }
    },

    handleFileUpload(event) {
      this.profilePicture = event.target.files[0];

      // Optionally display a preview if you implemented it
      // if (this.profilePicture) {
      //   this.profilePictureUrl = URL.createObjectURL(this.profilePicture);
      // }
    },

    createObjectURL(file) {
      return URL.createObjectURL(file);
    },
  },
};
</script>