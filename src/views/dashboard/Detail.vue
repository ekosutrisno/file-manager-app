<template>
   <div class="sm:px-6 lg:px-8 flex flex-col h-full">
     <div class="flex-none flex-shrink-0 h-48 border-b">
      <div class="lg:px-6 px-4 pb-2 flex justify-between items-center border-b border-gray-200">
        <router-link to="/u/dashboard" class="flex items-center space-x-1 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
          <span>
              Back
          </span>
         <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
         </span>
        </router-link>
        <div class="inline-block sm:inline-flex items-center space-x-2">
          <div class="sm:flex hidden items-center space-x-1 justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white">
            <span>Bucket: </span> 
            <span class="uppercase">
                {{$route.params.bucketName }}
            </span>
          </div>
          <button @click="openModal = !openModal" class="flex items-center space-x-1 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
        <div class="flex items-center justify-center p-4">
            <div class="w-full md:max-w-md">
              <label for="search-object" class="sr-only">Search Object</label>
              <input id="search-object" v-model="filterObject" name="search-object" type="text" autocomplete="off" required class="appearance-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Search object..." />        
            </div>
        </div>
        <div class="p-4 flex flex-row items-center sm:justify-end">
          <div class="mr-2">
            <label for="bucket-name" class="sr-only">Bucket Name</label>
            <input id="bucket-name" v-model="prefixPath" name="bucket-name" type="text" autocomplete="off" class="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Path (prefix)" />
          </div>
          <button class="focus:outline-none">
            <label for="file-upload" class="relative cursor-pointer py-2 px-3 transition bg-indigo-100 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div class="inline-flex items-center space-x-2">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </span>
                </div>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  class="sr-only"
                  @change="onUploadObject" 
                />
              </label>
          </button>
        </div>
     </div>
      <div class="p-2 flex-1 overflow-y-auto on-scrollbar">
          <div class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <button v-if="isRecursiveFolder" @click="onLoadBucketObjectList" class="flex items-center space-x-1 justify-center px-4 py-2 my-2 border border-transparent rounded-md shadow-sm text-sm font-medium hover:text-white text-indigo-600 transition-colors hover:bg-indigo-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            </button>
            <div v-if="dataObjectList.length" class="w-full p-2 sm:p-4 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <ObjectFileCard 
                v-for="(object, idx) in dataObjectList" 
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-load-bucket-object="onLoadBucketObjectList"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>
            <div v-else-if="dataObjectList.length == 0 && isProcess" class="flex flex-col items-center justify-center">
              <Loader/>
              <p>Fetching Object</p>
            </div>
            <div v-else>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        class="sr-only"
                        @change="onUploadObject" 
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF, and File up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
   </div>
   <ModalDeleteBucket 
      :open="openModal" 
      @close-modal="openModal= false" 
      :isEmpty="checkIsEmpty"
      :bucketNameToDelete="$route.params.bucketName"
   />
   
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import ModalDeleteBucket from '../../components/ModalDeleteBucket.vue';
import ObjectFileCard from '../../components/ObjectFileCard.vue';
import Loader from '../../components/Loader.vue';
import {baseURL} from '../../assets/env';
import { useStore } from 'vuex';

/**
 * @author Eko Sutrisno
 */
export default {
  components:{
    ModalDeleteBucket,
    ObjectFileCard,
    Loader
  },
   setup () {

     const route = useRoute();
     const router = useRouter();
     const store = useStore();

     const openModal = ref(false);
     
     const state = reactive({
       objects: computed(()=> store.state.object_module.objects),
       isRecursiveFolder: computed(()=> store.state.object_module.isRecursiveFolder),
       prefixPath: '',
       filterObject: '',
       isProcess: computed(()=> store.state.object_module.isProcess),
     })

     /**
      * Check if the bucket is Empty
      */
     const checkIsEmpty = computed(() => state.objects.length == 0);

    /**
     * Load All Bucket When Mounted
     */
     const onLoadBucketObjectList = ()=>{
       var bucketName = route.params.bucketName;
       store.dispatch("object_module/setObjectData", bucketName);
     }

     const dataObjectList =computed(() => {
       return state.objects
          .filter(object => object.objectName
            .toLowerCase()
            .includes(state.filterObject.toLowerCase()));
     })

    /**
     * All Mounted actions
     */
    onMounted(()=> onLoadBucketObjectList());

    const onLoadBucketObjectListPath = (path) =>{
       var data = {
          bucketName: route.params.bucketName,
          path: path
        }
      store.dispatch("object_module/setObjectDataPath", data);

    }

    /**
     * Upload Object action
     */
     const onUploadObject = (event) => {
         if (event.target.files && event.target.files[0]) {
            const fileToUpload = event.target.files[0];
            let formData = new FormData();
            formData.append('file', fileToUpload);

            var bucketName = route.params.bucketName;

            let URL = state.prefixPath.trim().length > 0 
                      ? `${baseURL}/object?bucket=${bucketName}&path=${state.prefixPath.toLowerCase()}`
                      : `${baseURL}/object?bucket=${bucketName}`

            var dataPayload = {
              formData: formData,
              bucketName: bucketName,
              url: URL
            }
            store.dispatch("object_module/onUploadObject", dataPayload)
              .then(()=>{
                state.filterObject= "";
              });
         }else{
            alert('Error when upload File')
         }
      }

    return {
      ...toRefs(state),
      openModal,
      checkIsEmpty,
      dataObjectList,
      onUploadObject, 
      onLoadBucketObjectList,
      onLoadBucketObjectListPath
    }
   }
}
</script>