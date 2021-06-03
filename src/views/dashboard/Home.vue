<template>
<div class="flex flex-col h-full">
  <div class="flex-none h-36 flex-shrink-0 border-b">
    <header class="bg-white shadow sm:px-6 lg:px-8">
      <div class="max-w-7xl flex items-center justify-between mx-auto pb-2 px-4 sm:px-6 lg:px-8">
        <h1 class="md:text-xl font-bold text-gray-900 text-sm">
          <router-link to="/u/dashboard/">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>  
          </router-link> <span class="font-medium">Exo</span><span class="text-indigo-500 font-bold">Box</span>
        </h1>
        <div class="text-gray-900">
          <button @click="openModal = !openModal" class="py-2 px-4 font-semibold text-sm bg-white border inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span>Create bucket</span>
          </button>
        </div>
      </div>
    </header>
    <div class="flex items-center justify-center p-4">
        <div class="w-full md:max-w-md">
          <label for="search-bucket" class="sr-only">Search Bucket</label>
          <input id="search-bucket" v-model="filterBucket" name="search-bucket" type="text" autocomplete="off" required class="appearance-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Search bucket..." />        
        </div>
    </div>
  </div>
  <div class="flex-1 overflow-y-auto on-scrollbar p-4">
    <div v-if="listFiltered.length" class="grid mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
      <BucketCard v-for="(bucket, idx) in listFiltered" :key="idx" :bucket="bucket"/>
    </div>
    <div v-else-if="listFiltered.length == 0 && isProcess" class="flex flex-col items-center justify-center">
      <Loader/>
      <p>Fetching Bucket</p>
    </div>
    <div v-else class="bg-gray-50 p-4 flex-1">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">You don't have a bucket yet,</span>
          <span class="block text-indigo-600">let's start.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <button type="button" @click="openModal = !openModal" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <ModalCreateBucket 
    :open="openModal" 
    @close-modal="openModal = false" 
    @on-success-created="getListOfBucket"
  />
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs} from 'vue'
import BucketCard from "../../components/BucketCard.vue"
import axios from 'axios'
import ModalCreateBucket from '../../components/ModalCreateBucket.vue';
import Loader from '../../components/Loader.vue';

const baseURL = 'https://shielded-hollows-85991.herokuapp.com/file';

export default {
  components: { BucketCard, ModalCreateBucket, Loader },
  setup(){
    
    const openModal = ref(false);

    const state = reactive({
      buckets: [],
      filterBucket: '',
      isProcess: false
    })

    const getListOfBucket = async () => {
      state.isProcess = true;
      const response = await axios.get(`${baseURL}/bucket`);
      state.buckets = response.data;
      state.isProcess = false;
    }

    const listFiltered = computed(() => {
      return state.buckets
        .sort((a,b) => {return b.creationDate - a.creationDate})
          .filter(bucket => bucket.name.includes(state.filterBucket));
    })

    onMounted(()=> getListOfBucket());

    return{
      ...toRefs(state),
      listFiltered, 
      getListOfBucket,
      openModal
    }
  }
}
</script>