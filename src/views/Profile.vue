<template>
  <div class="register mt-20 px-5 md:px-20">
    <h3 class="text-2xl md:text-5xl text-ash-gray font-bold">Profile</h3>
    <form @submit.prevent="register" class="mt-10 text-black">
      <fieldset class="bg-white py-5 rounded-md">
        <label
          class="mx-5 text-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
          for="githubUsername"
          >Enter your GitHub username.</label
        >
        <input
          type="text"
          v-model="formData.githubUsername"
          id="githubUsername"
          placeholder="octocat"
          class="w-full mt-3 px-5 focus:outline-none text-black font-mono text-2xl"
          :disabled="true"
          required
        />
      </fieldset>

      <fieldset class="bg-white py-5 rounded-md mt-10">
        <label
          class="mx-5 text-sm bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text"
          for="campusName"
          >Enter your campus name.</label
        >
        <!-- <input
          type="text"
          v-model="formData.campusName"
          id="campusName"
          placeholder=""
          class="w-full mt-3 px-5 focus:outline-none text-black font-mono text-2xl"
          @input="checkForCampus"
          required
        /> -->
        <vue-simple-suggest
          v-model="formData.campusName"
          :list="searchSuggestions"
          :filter-by-query="true"
          value-attribute="id"
          @input="checkForCampus"
          display-attribute="name"
          ref="campusSelect"
          :disabled="isSchoolOrWork"
        >
        </vue-simple-suggest>
        <br />
        <label class="mx-5 text-sm" for="campusName">School or work?</label>
        <input type="checkbox" id="schoolOrWork" v-model="isSchoolOrWork" />
      </fieldset>

      <fieldset class="bg-white py-5 rounded-md mt-10">
        <label
          class="mx-5 text-sm bg-gradient-to-r from-gray-700 via-gray-900 to-black text-transparent bg-clip-text"
          for="phoneNumber"
          >Enter your phone number.</label
        >
        <input
          type="text"
          v-model="temporaryPhoneInput"
          id="phoneNumber"
          placeholder="+911234567890"
          class="w-full mt-3 px-5 focus:outline-none text-black font-mono text-2xl"
          @input="validateNumber"
          required
        />
        <div
          class="p-2 text-sm mx-5 mt-3 bg-red-500 text-white rounded-md"
          v-if="isInvalidNumber === true"
        >
          Enter a valid phone number!
        </div>
      </fieldset>

      <button
        v-ripple="'rgba(255, 255, 255, 0.35)'"
        type="submit"
        class="submit mt-10 rounded-md py-5 px-10 cursor-pointer text-2xl bg-medium-blue"
        :disabled="!haveRecievedAllData"
      >
        Save!
      </button>
    </form>
  </div>
</template>

<script>
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";
import algoliasearch from "algoliasearch/lite";
import { phone } from "phone";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore();

export default {
  components: {
    VueSimpleSuggest,
  },
  data() {
    return {
      formData: {
        githubUsername: this.$session.get("github").screenName,
        campusName: "",
        campusId: null,
        phoneNumber: null,
      },
      searchResults: [],
      temporaryPhoneInput: null,
      isInvalidNumber: true,
      haveRecievedAllData: true,
      isSchoolOrWork: false,
    };
  },
  methods: {
    checkForCampus() {
      const client = algoliasearch(
        "5RG86RCWAH",
        "535fe390a417ef6dedcce809f437e7cd"
      );
      const index = client.initIndex("colleges");

      let results = index
        .search(this.formData.collegeName, {
          attributesToRetrieve: ["name", "address", "id"],
          hitsPerPage: 100,
        })
        .then(({ hits }) => {
          this.searchResults = hits;
          console.log(hits);
        });

      this.formData.campusId = this.$refs.campusSelect.selected.id;
    },
    searchSuggestions() {
      return this.searchResults;
    },
    validateNumber() {
      if (phone(this.temporaryPhoneInput).isValid === true) {
        this.formData.phoneNumber = this.temporaryPhoneInput;
        this.isInvalidNumber = false;
      } else {
        this.isInvalidNumber = true;
      }
    },
    register: function() {
      if (
        (this.formData.githubUsername !== null) &&
        (this.formData.campusName !== "") &&
        (this.formData.campusId !== null) &&
        (phone(this.formData.phoneNumber).isValid === true)
      ) {
        const userRef = doc(db, "users", this.$session.get("uid"));
        const userData = {
          githubID: this.formData.githubUsername,
          campusName: this.formData.campusName,
          campusID: this.formData.campusId,
          phno: this.formData.phoneNumber,
        };

        setDoc(userRef, userData, { merge: true });
      }
    },
  },
  watch: {
    // whenever question changes, this function will run
    isSchoolOrWork: function(newOption, oldOption) {
      if (newOption === true) {
        this.formData.campusName = "school-working";
        this.formData.campusId = "-1";
      } else {
        this.formData.campusName = "";
        this.formData.campusId = null;
      }
    },
    formData: function(newFormData, oldFormData) {
      // console.log("formdata change")
      // if (
      //   newFormData.githubUsername !== null ||
      //   newFormData.campusName !== "" ||
      //   newFormData.campusId !== null ||
      //   phone(newFormData.phoneNumber).isValid === true
      // ) {
      //   this.haveRecievedAllData = true;
      // }
    }
  },
  async mounted() {
    if (this.$session.exists()) {
      if (this.$session.has("loggedIn")) {
        if (this.$session.get("loggedIn") !== true) {
          this.$router.push("/");
        }
      }
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
fieldset {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
}

input[type="submit"] {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
}
</style>
