<template>
  <div class="container">
    <div class="card">
      <p v-if="responseMessage">{{ responseMessage }}</p>

      <form @submit.prevent="createPost" class="signup-form">
        <div class="form-item">
          <label for="body">Body</label>
          <input v-model="postContent" type="text" id="body" placeholder="Body" required>
        </div>

        <button type="submit">Add post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPostView",
  data() {
    return {
      postContent: "",
      responseMessage: ""
    }
  },
  methods: {
    createPost: function() {
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        credentials: 'include',
        body: JSON.stringify({content: this.postContent})
      })
      .then(res => res.json())
      .then(data => {
        this.responseMessage = data.message;
        setTimeout(() => {
          this.responseMessage = "";
        }, 2000)
      }).catch(err => {
        console.log(err);
        this.responseMessage = "Unable to create post due to an error";
      })
    }
  }
}
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

input[type=email], input[type=password] {
  border: 1px solid grey;
  align-self: flex-end;
  border-radius: 10px;
}

input[type=email]::placeholder {
  text-align: center;
}
input[type=password]::placeholder {
  text-align: center;
}
button{
  border-radius: 15px;
  background-color: #89b2e3;
  border: none;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  font-size: 18px;
}



p + a:visited {
  color: grey;
}

form ~ a {
  color: rgb(103, 103, 255);
  border-radius: 10px;
}

.signup-form {
  text-align: center;
  width: 400px;
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