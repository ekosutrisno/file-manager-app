<template>
  <router-view></router-view>
</template>
<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('display_module/onChangeDisplay', 'list'));
  },
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');

.nv-transition {
  animation: 0.5s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>