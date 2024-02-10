<template>
  <form @submit.prevent="signup" class="signup-form">
    <div class="form-item">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" placeholder="Email" required>
    </div>

    <div class="form-item">
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" placeholder="Password" required>
      <span v-if="message" id="message" style="color: red">{{ message }}</span>
    </div>
    <button type="submit">Signup</button>

  </form>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    signup() {
      // Add your login logic here
      if (this.checkpass()) {
        
        fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: this.email, password: this.password})
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === "fail")
            this.message = data.message;
          else {
            this.$store.dispatch("authenticateUserAct", {user: data.user_id})
            this.$router.push("/");
          }
        }).catch((e) => {
          console.error(e);
          this.message = "Error signing up";
        })
      }
    },
    checkpass() {
      var pass = this.password;
      if (pass.length<8 || pass.length>15){
        this.message = "Password length must be between 8 and 15";
        return false;
      }
      else if (!(/[A-Z]/.test(pass.charAt(0)))){
        this.message = "The first character needs to be a capital letter";
        return false;
      }
      else if (!(/[0-9]/.test(pass))){
        this.message = "Password needs to contain a number";
        return false;
      }
      else if(!(/_/.test(pass))){
        this.message = "Password needs to contain '_'";
        return false;
      }
      else if(!(/[a-z]*[a-z]/.test(pass))){
        this.message = "Password needs to contain at least 2 lowercase characters";
        return false;
      }
      else{
        this.message = "";
        return true;
      }


    },
  },
};
</script>

<style scoped>



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
input[type=submit]{

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