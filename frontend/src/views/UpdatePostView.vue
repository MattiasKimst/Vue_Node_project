<template>
  <div class="container">
    <div class="card">
      <p v-if="responseMessage">{{ responseMessage }}</p>

      <form @submit.prevent="updatePost" class="update-post-form">
        <div class="form-item">
          <label for="body">Updated Body</label>
          <input v-model="updatedPostContent" type="text" id="body" placeholder="Updated Body" required>
        </div>

        <button type="submit">Update post</button>
        <button @click.prevent="deletePost" type="button">Delete post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdatePostView",
  data() {
    return {
      postId: null, // Declare postId
      updatedPostContent: "",
      responseMessage: "",
    };
  },
  methods: {
    updatePost: function () {
      const postId = this.$route.params.postId;

      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: this.updatedPostContent }),
      })
          .then((res) => res.json())
          .then((data) => {
            this.responseMessage = data.message;
            setTimeout(() => {
              this.responseMessage = "";
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            this.responseMessage = "Unable to update post due to an error";
          });
    },
    deletePost: function () {
      const postId = this.$route.params.postId;

      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include"
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              // Redirect to MainView or any other desired page
              this.$router.push("/");
            }
          })
          .catch((err) => {
            console.error(err);
            this.responseMessage = "Unable to delete post due to an error";
          });
    },
    fetchPostDetails() {
      fetch(`http://localhost:3000/api/posts/${this.postId}`, {
        method: "GET",
        credentials: 'include'
      })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            console.log('Response from server:', data);
            if (data.postData) {
              this.updatedPostContent = data.postData.content;
            } else {
              this.responseMessage = "Post not found";
            }
          })
          .catch(err => {
            console.log(err);
            this.responseMessage = "Unable to fetch post details due to an error";
          });
    },
  },
  created() {
    this.postId = this.$route.params.postId;
    this.fetchPostDetails();
  },
};
</script>

<style scoped>
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

button {
  border-radius: 15px;
  background-color: #89b2e3;
  border: none;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  margin-top: 10px;
}

.form-item {
  margin: 10px;
  text-align: left;
}

.form-item label {
  margin-bottom: 5px;
  align-self: flex-start;
  display: inline-block;
  width: 30%;
}

.form-item input {
  padding: 8px;
  box-sizing: border-box;
  align-self: flex-end;
  display: inline-block;
  width: 70%;
}
</style>
