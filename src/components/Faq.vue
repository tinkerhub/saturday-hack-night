<template>
  <div class="faq md:-mt-20 mt-20" id="faq">
    <h3 class="text-3xl text-ash-gray">FAQ</h3>
    <div class="faq-item mt-7" v-for="faq in faqs" :key="faq.title">
        <p class="text-2xl font-mono  text-ash-gray">{{ faq.title }}</p>
        <p class="mt-2">{{ faq.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          title: "What is Saturday Hack Night?",
          value:
            "Saturday Hack Night is a biweekly hackathon organized by TinkerHub. The focus of the event is to provide learners the opportunity to explore a unique API and build exciting projects. TinkerHub will provide any credits or mentorship needed while you only have to think of one thing, Build!",
          category: "Tab-1",
        },
        {
          title: "Who can participate?",
          value:
            "You. Are you passionate about tech? Do you like to build something unique? Are you that curious cat who loves to explore uncharted territory? Then this is your opportunity.",
          category: "Tab-1",
        },
        {
          title: "What should the team size be?",
          value:
            "Individual or maximum 3 members. You can participate on your own or team-up with your friends, the more the merrier, right?",
          category: "Tab-1",
        },
        {
          title: "What is the schedule of the program?",
          value:
            "Saturday evening 6 PM to 11 PM every odd saturday you will be able to take part in the program. Yes it is a recurring event and yes, you are welcome every time.",
          category: "Tab-1",
        },
        {
          title: "Still have questions?",
          value:
            "Contact our core team - you can get in tough with us on our Discord channel (you will be added on registration) or ping us directly.",
          category: "Tab-1",
        },
      ],
    };
  },
};
</script>

<style></style>
