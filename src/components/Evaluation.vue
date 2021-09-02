<template>
  <div class="evaluation mt-20" id="evaluation">
    <h3 class="text-3xl text-ash-gray">Evaluation</h3>
    <div
      class="criteria mt-5 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-10"
    >
      <div class="rounded-md pt-5">
        <i
          class="bx bx-code-curly text-2xl p-3 rounded-sm md:text-4xl bg-white text-black"
        ></i>
        <p
          class="text-xl mt-5 font-mono bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text"
        >
          Code Quality
        </p>
        <p class="mt-2">
          Our experts will inspect your code and analyse it's general
          performance.
        </p>
      </div>

      <div class="rounded-md pt-5">
        <i
          class="bx bx-user text-2xl p-3 rounded-sm md:text-4xl bg-white text-black"
        ></i>
        <p
          class="text-xl mt-5 font-mono bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
        >
          Usability
        </p>
        <p class="mt-2">
          This goes without saying, but what you make should be usable for some
          target audience.
        </p>
      </div>

      <div class="rounded-md pt-5">
        <i
          class="bx bx-receipt text-2xl p-3 rounded-sm md:text-4xl bg-white text-black"
        ></i>
        <p
          class="text-xl mt-5 font-mono bg-gradient-to-r from-green-200 via-green-400 to-purple-700 text-transparent bg-clip-text"
        >
          Documentation
        </p>
        <p class="mt-2">
          The code you write must be well documented by any means necessary.
        </p>
      </div>

      <div class="rounded-md pt-5">
        <i
          class="bx bx-rocket text-2xl p-3 rounded-sm md:text-4xl bg-white text-black"
        ></i>
        <p
          class="text-xl mt-5 font-mono bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text"
        >
          Deployable
        </p>
        <p class="mt-2">
          The final product must be in a deployable state.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
