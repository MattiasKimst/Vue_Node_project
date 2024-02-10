<template>
  <div class="post" @click="goToPostView">
    <img src="@/assets/profile-photo.jpg" alt="Profile" height="40" width="40" />
    <p class="post-date">{{ formatDate(postDate) }}</p>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    postDate: String,
    imageData: String,
    content: String,
    likes: Number,
    postIndex: String
  },
  methods: {
    formatDate: function (dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    goToPostView() {
      this.$router.push({ name: 'updatepost', params: { postId: this.postIndex } });
    },
    addLike: function () {
      this.$store.dispatch("addLikeToPostAct", { postIndex: this.postIndex });
    },
  },
};
</script>



<style scoped>
  .postFooter {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .post {
      border: 1px solid #ccc;
      padding: 20px;
      margin: 10px;
      width: 100%;
      max-width: 600px; /* Adjust as needed for your design */
      position: relative;
      background-color: #d8d8d8;
      border-radius: 15px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
      z-index: 0;
  }

  .post-date {
      align-self: flex-end;
      font-style: italic;
      color: #666;
      float: right;
  }

  .post .profile-photo {
      width: 20px;
      height: 20px;
      background-image: url('@/assets/profile-photo.jpg');
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1;

  }
  .post p {
    color: black; /* Set the text color to black or your desired color */
  }


  .post img {
      max-width: 100%;
      height: auto;
  }
  </style>