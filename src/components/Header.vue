<template>
  <div class="w-full bg-han-purple p-5 absolute top-0 left-0 z-50">
    <span
      class="helloWorld font-mono align-middle text-white hidden md:inline-block"
      v-if="$route.name === 'Home'"
      ><router-link to="/">hello World!</router-link></span
    >

    <span
      class="helloWorld font-mono align-middle text-white hidden md:inline-block"
      v-if="currentRouteName !== 'Home'"
      ><router-link to="/">Saturday Hack Night</router-link></span
    >
    <span
      ><router-link to="/"
        ><i
          class="helloWorld align-middle text-white md:hidden inline-block bx bx-home"
        ></i></router-link
    ></span>
    <nav
      class="hidden md:inline-block ml-5 align-middle"
      v-if="currentRouteName === 'Home'"
    >
      <a href="#about" v-scroll-to="'#about'">About</a>&nbsp;
      <a href="#getstarted" v-scroll-to="'#getstarted'">Get Started</a>&nbsp;
      <a href="#evaluation" v-scroll-to="'#evaluation'">Evaluation</a>&nbsp;
      <a href="#objectives" v-scroll-to="'#objectives'">Objectives</a>&nbsp;
      <a href="#faq" v-scroll-to="'#faq'">FAQ</a>
    </nav>
    <div class="right-elements float-right align-middle">
      <button
        class="register ml-3"
        @click="login"
        v-tooltip="'Login'"
        v-if="loggedIn === false"
      >
        <i class="bx bx-log-in-circle text-xl align-middle"></i>
      </button>
      <router-link to="/profile">
        <img
          class="rounded-md h-7 w-7 inline-block ml-3"
          :src="githubUser.photoUrl"
          v-if="loggedIn === true"
          v-tooltip="githubUser.screenName"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
const axios = require("axios");

export default {
  data() {
    return {
      githubUser: null,
      loggedIn: this.$session.loggedIn || false,
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      // provider.addScope('repo'); // add scope for github repo
      provider.setCustomParameters({
        allow_signup: "true",
      });

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          this.$session.set("accessToken", token);

          // The signed-in user info BUT FIREBASE USER OBJECT, NOT GITHUB.
          const user = result.user;
          console.log(result.user);

          // currentLoginTimestamp = signupTimestamp ===> signup ===> profile
          //                       !==               ===> login ===> dashboard ==> dashboard option should be shown

          this.githubUser = user.reloadUserInfo;
          this.$session.set("github", user.reloadUserInfo);
          this.$session.set("uid", user.uid);
          this.$session.set("loggedIn", true);
          this.loggedIn = true;

          if (
            result.user.metadata.creationTime !==
            result.user.metadata.lastSignInTime
          ) {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/profile");
          }

          // we need GitHub
          // because that's who we are
          // look at me, being stupid and blogging at 8am in the morning
          // and I'm not even trying to be a good programmer
          // I'm just trying to be a good hacker
          // github copilot gave me these lines above, btw
          // project idea: story prompts using github copilot

          // axios
          //   .get("https://api.github.com/user", {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //   })
          //   .then((res) => {
          //     let github = res.data;
          //     this.githubUser = github;
          //     this.$session.set("github", github);
          //     this.$session.set("loggedIn", true);
          //     this.loggedIn = true;
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          // campus
          // email id *refer firebase User object*
          // phone number
        })
        .catch((error) => {
          console.error(error);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
        });
    },
    register() {
      console.log("hello");
      if (this.$session.exists()) {
        if (this.$session.has("loggedIn")) {
          if (this.$session.get("loggedIn") === true) {
            console.log(this.$session.getAll());
            this.$router.push("register");
          } else {
            this.login();
          }
        } else {
          this.login();
        }
      } else {
        console.log("attempting to login");
        this.login();
      }
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  mounted() {
    // this.$session.destroy();
    if (this.$session.exists()) {
      if (this.$session.has("loggedIn")) {
        if (this.$session.get("loggedIn") === true) {
          this.loggedIn = this.$session.get("loggedIn");
          this.githubUser = this.$session.get("github");
        }
      }
    }
  },
};
</script>

<style scoped>
.helloWorld > a {
  color: inherit !important;
}

a {
  color: cyan;
}
</style>
