<template>
  <div class="flex flex-col items-center justify-center font-quicksand">
    <NotFound class="w-40 h-40 md:w-80 md:h-80" />
    <h1 class="my-3">Upss... your page not found!</h1>
    <button
      @click="$router.back()"
      class="
        py-2
        px-3
        transition
        bg-indigo-50
        rounded-md
        font-medium
        text-indigo-600
        hover:bg-indigo-700
        hover:text-indigo-50
        focus-within:outline-none
        focus-within:ring-2
        focus-within:ring-offset-2
        focus-within:ring-indigo-500
      "
    >
      Back
    </button>
  </div>
</template>

<script>
import NotFound from "../components/svg/NotFound.vue";
export default {
  components: { NotFound },
};
</script>
      