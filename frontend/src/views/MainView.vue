<template>
    <div class="extraButtons">
        <button @click="logout">Log out</button>
    </div>

    <div id="posts" class="content">
        <post v-for="(post) in this.$store.state.posts" :key="post.id" :postIndex="post.id" :postDate="post.postDate" :imageData="post.imageData" :content="post.content" :likes="post.likes"></post>
    </div>

    <div class="extraButtons">
        <button @click="gotoAddPost">Add post</button>
        <button @click="deleteAllPosts">Delete all</button>
    </div>
</template>

<script>
import Post from "../components/Post.vue";


export default {
    name: "MainView",
    components: {
        post: Post
    },
    methods: {
        logout: function() {
            fetch("http://localhost:3000/auth/logout", {method: "POST", credentials: "include"})
            .then(res => res.json())
            .then(data => {
                if(data.status === "success") {
                    this.$store.dispatch("logoutAct");
                    this.$router.push("/login");
                }
            })
            .catch(err => {
                console.error(err);
            })
        },
        gotoAddPost: function() {
            this.$router.push("/addpost")
        },
        deleteAllPosts: function() {
            fetch("http://localhost:3000/api/posts", {method: "DELETE", credentials: "include"})
            .then(res => res.json())
            .then(data => {
                if(data.status === "success")
                    this.$store.dispatch("setPostsAct", {posts: []});
            }).catch(err => {
                console.error(err)
            })
        }
    },
    mounted: function() {
        fetch("http://localhost:3000/api/posts", {method: "GET", credentials: "include"})
        .then(res => res.json())
        .then(data => {
            if(data.status === "success")
                this.$store.dispatch("setPostsAct", {posts: data.posts});
        }).catch(err => {
            console.error(err)
        })
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 800px;
    height: 100%;
    padding: 20px;
}

.extraButtons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    max-width: 800px; /* Adjust as needed for your design */
    margin: 0 auto;
}

.extraButtons > button{

  background-color: #4a69bd;
  border: none;
  padding: 7px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 20px ;
  margin-bottom: 30px;

}
</style>