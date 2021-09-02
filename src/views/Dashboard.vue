<template>
  <div class="dashboard mt-20 px-5 md:px-20">
    <h1 class="text-2xl md:text-5xl text-ash-gray font-bold">
      Upcoming Events
    </h1>
    <div
      class="event mt-10 w-full cursor-pointer rounded-md bg-white color-black py-5 px-5 text-black"
    >
      <h3 class="text-3xl font-bold inline-block">{{ event.name }}</h3>
      <button
        v-ripple="'rgba(255, 255, 255, 0.35)'"
        class="float-right rounded-md py-2 px-7 cursor-pointer text-md bg-medium-blue align-middle"
      >
        Register
      </button>
      <!-- <a :href="'https://github.com/' + event.org + '/' + event.repoName" target="_blank">
        <i class="bx bxl-github block text-3xl mt-2"></i
      ></a> -->
      <p class="font-mono mt-5">{{ event.time }}</p>
    </div>

    <div
      ref="popup"
      class="modal bg-background absolute inset-0 w-full h-full text-black px-5 md:px-20 py-40 text-2xl"
    >
      <h3 class="text-2xl md:text-5xl text-ash-gray font-bold">
        Event Registration
      </h3>

      <form @submit.prevent="eventRegister" class="mt-10 text-black">
        <fieldset class="bg-white py-5 rounded-md">
          <label
            class="mx-5 text-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
            for="githubUsername"
            >Enter team name.</label
          >
          <input
            type="text"
            v-model="formData.teamName"
            id="teamName"
            class="w-full mt-3 px-5 focus:outline-none text-black font-mono text-2xl"
            pattern="[a-zA-Z0-9]+"
            required
          />
        </fieldset>
        <fieldset class="bg-white py-5 rounded-md mt-10">
          <label
            class="mx-5 text-sm bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text"
            for="githubRepoURL"
            >Enter GitHub repo URL.</label
          >
          <br />
          <span
            class="mt-3 pl-5 focus:outline-none text-gray-500 font-mono text-2xl inline-block align-vertical"
          >
            https://github.com/{{ $session.get("github").screenName }}/
          </span>
          <input
            type="text"
            v-model="formData.githubRepoURL"
            id="githubRepoURL"
            class="inline-block focus:outline-none text-black font-mono text-2xl align-vertical"
            placeholder="repo"
            pattern="[^\/]+"
            required
          />
        </fieldset>
        <fieldset class="bg-white py-5 rounded-md mt-10">
          <label
            class="mx-5 text-sm bg-gradient-to-r from-gray-700 via-gray-900 to-black text-transparent bg-clip-text"
            for="githubRepoURL"
            >Enter teammates.</label
          >

          <!-- https://codepen.io/foucauld-gaudin/pen/abzBdRz -->
          <div class="chip-container px-5 text-md mt-3">
            <div
              class="chip rounded-md bg-gray-300 p-2 cursor-pointer inline-block mr-3"
              v-for="(chip, i) of chips"
              :key="chip.label"
            >
              {{ chip }}
              <i class="bx bx-x cursor-pointer" @click="deleteChip(i)"></i>
            </div>
            <input
              v-model="currentInput"
              @keypress.enter.prevent="saveChip"
              @keydown.delete="backspaceDelete"
              class="focus:outline-none text-black font-mono text-2xl align-vertical"
            />
          </div>
        </fieldset>
        <button
          v-ripple="'rgba(255, 255, 255, 0.35)'"
          type="submit"
          class="submit mt-10 rounded-md py-5 px-10 cursor-pointer text-2xl bg-medium-blue"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
const db = getFirestore();

export default {
  data() {
    return {
      event: null,
      eventID: null,
      formData: {
        teamName: null,
        uid: this.$session.get("uid"),
        githubRepoURL: null,
        teamMembers: []
      },
      chips: [],
      currentInput: "",
      set: true,
    };
  },
  methods: {
    async saveChip() {
      const { chips, currentInput, set } = this;
      ((set && chips.indexOf(currentInput) === -1) || !set) &&
        chips.push(currentInput);

      const eventsRef = collection(db, "users");
      const q = query(eventsRef, where("githubID", "==", currentInput));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0] && querySnapshot.docs[0].exists()) {
        console.log(querySnapshot.docs[0].id);
        let id = querySnapshot.docs[0].id;
        this.formData.teamMembers.push(id);
      } else {
        // tooltip 
      }

      this.currentInput = "";
    },
    deleteChip(index) {
      this.chips.splice(index, 1);
    },
    backspaceDelete({ which }) {
      which == 8 &&
        this.currentInput === "" &&
        this.chips.splice(this.chips.length - 1);
    },
    async eventRegister() {
      if (this.formData.teamName !== null && this.formData.uid !== null && this.formData.githubRepoURL !== null) {
        let teamData = {
          name: this.formData.teamName, // Some non-null string
          lead: this.formData.uid,
          repo: `https://github.com/${this.$session.get("github").screenName}/${this.formData.githubRepoURL}`,
          members: this.formData.teamMembers
        }
        await addDoc(collection(db, `events/${this.eventID}/teams`), teamData);
      }
    }
  },
  mounted() {
    if (this.$session.exists()) {
      console.log(this.$session.getAll());
      if (this.$session.has("loggedIn")) {
        if (this.$session.get("loggedIn") !== true) {
          this.$redirect.push("/");
        }
      }
    } else {
      this.$router.push("/");
    }

    (async () => {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, where("registration", "==", "true"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.eventID = doc.id;
        this.event = doc.data();
        this.event.time = new Date(
          doc.data().time.seconds * 1000
        ).toLocaleString({
          dateStyle: "short",
          timeStyle: "medium",
        });
      });
    })();
  },
};


// submit function 
// data all present
//
//
// import { doc, setDoc } from "firebase/firestore"; 
//
// teamData = {
//   name: "", // Some non-null string
//   lead: user.uid,
//   repo: "https://github.com/username/repo",
//   members: [ member1UID, member2UID ]
// }

// await addDoc(collection(db, `events/${eventID}/teams`), teamData);
</script>

<style scoped>
a > i {
  color: black !important;
}

#modals-container {
  height: 20px;
  width: 20px;
  background-color: white;
}
</style>
