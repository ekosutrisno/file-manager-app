<template>
<div class="flex flex-col h-full">
  <div class="flex-none flex-shrink-0 border-b">
    <header class="bg-white sm:px-6 lg:px-8">
      <div class="max-w-7xl flex items-center justify-between space-x-2 mx-auto pb-2 px-4 sm:px-6 lg:px-8">
        <h1 class="md:text-xl font-bold text-gray-900 text-sm">
          <router-link to="/u/dashboard/">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>  
          </router-link> <span class="font-medium hidden md:inline">Bucket</span>
        </h1>
        <div class="w-full md:max-w-md">
          <label for="search-bucket" class="sr-only">Search Bucket</label>
          <input id="search-bucket" v-model="filterBucket" name="search-bucket" type="text" autocomplete="off" required class="appearance-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Search bucket..." />        
        </div>
        <div class="text-gray-900">
          <button @click="openModal = !openModal" class="py-2 px-4 font-semibold text-sm bg-white border inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="hidden md:block">Create bucket</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
          </button>
        </div>
      </div>
    </header>
  </div>
  <div class="flex-1 overflow-y-auto on-scrollbar p-4">
    <div v-if="listFiltered.length" class="grid mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
      <BucketCard v-for="(bucket, idx) in listFiltered" :key="idx" :bucket="bucket"/>
    </div>
    <div v-else-if="listFiltered.length == 0 && isProcess" class="flex flex-col items-center justify-center">
      <Loader/>
      <p>Fetching Bucket</p>
    </div>
    <!-- <div v-else class="flex-1"> -->
    <div v-else class="max-w-7xl flex flex-col items-center mx-auto px-4">
      <EmptyBox class="h-56 w-56" />
      <h2 class="text-center font-extrabold tracking-tight text-gray-900">
          <span class="block">You don't have a bucket yet,</span>
          <span class="block text-indigo-600">let's start.</span>
        </h2>
      <div class="mt-6 flex lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <button type="button" @click="openModal = !openModal" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Get started
          </button>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</div>
 <teleport  to="#modal-teleport">
    <ModalCreateBucket 
      :open="openModal" 
      @close-modal="openModal = false" 
    />
 </teleport>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs} from 'vue'
import BucketCard from "../../components/BucketCard.vue"
import ModalCreateBucket from '../../components/ModalCreateBucket.vue';
import Loader from '../../components/Loader.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import EmptyBox from '../../components/svg/EmptyBox.vue';

/**
 * @author Eko Sutrisno
 */
export default {
  components: { BucketCard, ModalCreateBucket, Loader, EmptyBox },
  setup(){
    
    const openModal = ref(false);
    const store = useStore();
    const route = useRoute();

    const state = reactive({
      buckets: computed(()=> store.state.bucket_module.buckets),
      filterBucket: '',
      isProcess: computed(()=> store.state.bucket_module.isProcess)
    })

    const getListOfBucket = async () => {
     await store.dispatch('bucket_module/setBucketData');
    }

    const listFiltered = computed(() => {
      return state.buckets
        .sort((a,b) => {return b.creationDate - a.creationDate})
          .filter(bucket => bucket.name.toLowerCase().includes(state.filterBucket.toLowerCase()));
    })

    onMounted(()=>{
      if(route.params.deleteState != "true")
        getListOfBucket()
      }
     );

    return{
      ...toRefs(state),
      listFiltered,
      openModal
    }
  },
}
</script>