<template>
  <header class="bg-white shadow sm:px-6 lg:px-8 sticky z-10 top-0">
    <div class="max-w-7xl flex items-center justify-between mx-auto pb-2 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl font-bold text-gray-900">
        <router-link to="/u/dashboard/">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>  
        </router-link> <span class="font-medium">Local</span><span class="text-indigo-500 font-bold">Drive</span>
      </h1>
      <div class="text-gray-900">
        <button @click="openModal = !openModal" class="py-2 px-4 font-semibold text-sm bg-white border inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span>Create bucket</span>
        </button>
      </div>
    </div>
  </header>
  <div class="grid mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <BucketCard v-for="(bucket, idx) in listFiltered" :key="idx" :bucket="bucket"/>
  </div>
  <Modal 
    :open="openModal" 
    @close-modal="openModal= false" 
    @on-success-created="getListOfBucket"
  />
</template>

<script>
import { computed, onMounted, reactive, ref} from 'vue'
import BucketCard from "../../components/BucketCard.vue"
import axios from 'axios'
import Modal from '../../components/Modal.vue';

const baseURL = 'http://localhost:9099/file';

export default {
  components: { BucketCard, Modal },
  setup(){

    
    const openModal = ref(false);

    const state = reactive({
      buckets:[]
    })

    const getListOfBucket = async ()=>{
      const response = await axios.get(`${baseURL}/bucket`);
      state.buckets = response.data;
      // state.buckets = [
      //   {
      //     name: 'erajaya-dev',
      //     creationDate: new Date('2020-12-13')
      //   },
      //   {
      //     name: 'erajaya-test',
      //     creationDate: new Date('2021-12-11')
      //   }
      // ]
    }

    const listFiltered = computed(()=>{
      return state.buckets.filter(bucket => bucket.name.includes('erajaya'));
    })

    onMounted(()=> getListOfBucket());

    return{
      listFiltered, 
      getListOfBucket,
      openModal
    }
  }
}
</script>