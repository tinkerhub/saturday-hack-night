<template>
  <div class="logout mt-20 px-5 md:px-20">
    <h1 class="text-4xl font-mono">Logging you out, YEET!</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$session.destroy();
    this.$router.push("/");
  },
};
</script>

<style></style>
