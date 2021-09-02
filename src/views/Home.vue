<template>
  <div id="home">
    <div class="app-contents px-5 mt-10 md:px-20">
      <h1
        class="
          title
          md:text-8xl
          font-semibold
          text-left
          font-mono
          text-medium-blue
          py-10
          w-auto
          break-words
          text-3xl
        "
      >
        Saturday<br />
        Hack<br />
        Night
      </h1>
      <p
        class="
          description
          border-t-4 border-yellow-300
          py-5
          break-word
          text-2xl
        "
      >
        Hey folks! Thought of a hackathon around an API? Join us now for the
        most awaited event!
      </p>
      <About />
      <GetStarted />
      <Evaluation />
      <Objectives />
      <Faq />
    </div>
  </div>
</template>

<script>
import About from "@/components/About.vue";
import GetStarted from "@/components/GetStarted.vue";
import Evaluation from "@/components/Evaluation.vue";
import Objectives from "@/components/Objectives.vue";
import Faq from "@/components/Faq.vue";

export default {
  name: "App",
  components: {
    About,
    GetStarted,
    Evaluation,
    Objectives,
    Faq
  },
  data() {
    return {
      thisWeekApi: {
        name: "Dialogueflow API",
        description:
          "Ever thought how Google Assistant, Siri, Alexa, etc. work? Dialogflow is the answer, well almost. Dialogflow is a cutting edge ML API from Google using which you too can do fancy stuff like NLP and Speech synthesis.",
        image:
          "https://s3.amazonaws.com/coursesity-blog/2019/09/ivrpowers-post-04.024.jpeg",
        link: "https://cloud.google.com/dialogflow/docs",
      },
    };
  },
};
</script>

<style>
</style>
