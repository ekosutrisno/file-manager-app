<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <BucketCard v-for="(bucket, idx) in listFiltered" :key="idx" :bucket="bucket"/>
  </div>
</template>

<script>
import { computed, onMounted, reactive} from 'vue'
import BucketCard from "../../components/BucketCard.vue"
import axios from 'axios'

const baseURL = 'http://localhost:9099/file';

export default {
  components: { BucketCard },
  setup(){
    const state = reactive({
      buckets:[]
    })

    const getListOfBucket = async ()=>{
      // const response = await axios.get(`${baseURL}/bucket`);
      // state.buckets = response.data;
      state.buckets = [
        {
          name: 'erajaya-dev',
          creationDate: new Date('2020-12-13')
        },
        {
          name: 'erajaya-test',
          creationDate: new Date('2021-12-11')
        }
      ]
    }

    const listFiltered = computed(()=>{
      return state.buckets.filter(bucket => bucket.name.includes('erajaya'));
    })

    onMounted(()=> getListOfBucket());

    return{
      listFiltered
    }
  }
}
</script>