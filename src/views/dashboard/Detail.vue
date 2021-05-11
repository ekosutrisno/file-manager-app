<template>
   <div class="sm:px-6 lg:px-8">
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
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <button v-if="isRecursiveFolder" @click="onLoadBucketObjectList" class="flex items-center space-x-1 justify-center px-4 py-2 my-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            </button>
            <ul v-if="dataObjectList.length" class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <li v-for="(object, idx) in dataObjectList" :key="idx" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1">
                  <div class="flex items-center">
                    <svg v-if="onCekDataType(object.objectName) == 1" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <svg v-if="object.dir" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p @click="onLoadBucketObjectListPath(object.objectName)" v-if="object.dir" class="ml-2 inline w-auto focus:outline-none cursor-pointer font-semibold flex-1 truncate hover:underline hover:text-indigo-600">
                      {{object.objectName}}
                    </p>
                    <span v-else class="ml-2 font-semibold flex-1 w-0 truncate">
                      {{object.objectName}}
                    </span>
                  </div>
                  <div class="inline-flex items-center space-x-1 text-xs">
                    <span>{{ formatDateModified(object.lastModified) }} </span>  <span v-if="!object.dir">| {{ formatBytes(object.size) }}</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0 inline-flex space-x-2">
                  <button @click="onDownloadObject(object.objectName)" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button @click=" object.dir ? onDeleteDir(object.objectName) : onDeleteObject(object.objectName)" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
              <li class="p-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center sm:justify-end">
                <div class="mr-2">
                  <label for="bucket-name" class="sr-only">Bucket Name</label>
                  <input id="bucket-name" v-model="prefixPath" name="bucket-name" type="text" autocomplete="off" class="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Path (prefix)" />
                </div>
                <button class="focus:outline-none">
                  <label for="file-upload" class="relative cursor-pointer py-2 px-3 transition bg-indigo-100 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <div class="inline-flex items-center space-x-2">
                        <span>Upload a file</span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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
              </li>
            </ul>
            <ul v-else>
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
            </ul>
          </dd>
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
import axios from 'axios';
import moment from 'moment';
import ModalDeleteBucket from '../../components/ModalDeleteBucket.vue';

export default {
  components:{
    ModalDeleteBucket
  },
   setup () {

     const route = useRoute();
     const router = useRouter();

     const openModal = ref(false);
     
     const state = reactive({
       objects: [],
       isRecursiveFolder: false,
       prefixPath: '',
       filterObject: ''
     })

     /**
      * Check if the bucket is Empty
      */
     const checkIsEmpty = computed(() => state.objects.length == 0);

    /**
     * Load All Bucket When Mounted
     */
     const onLoadBucketObjectList = async ()=>{
       state.isRecursiveFolder = false;
       var bucketName = route.params.bucketName;
       const bucketObject = await axios.get(`http://localhost:9099/file/object/${bucketName}`)
       state.objects = bucketObject.data;
     }

     const dataObjectList = computed(()=>{
       return state.objects
          .filter(object => object.objectName
            .toLowerCase()
            .includes(state.filterObject.toLowerCase()));
     })

    /**
     * All Mounted actions
     */
    onMounted(()=> onLoadBucketObjectList());

    const onLoadBucketObjectListPath = async (path) =>{
       state.isRecursiveFolder = true;
       var bucketName = route.params.bucketName;
       const bucketObject = await axios.get(`http://localhost:9099/file/object/${bucketName}/path?path=${path}`)
       state.objects = bucketObject.data;
    }


    /**
     * Delete Bucket action
     * @param bucketName
     */
     const onDeleteBucket = async ()=>{
        var bucketName = route.params.bucketName;
        await axios.delete(`http://localhost:9099/file/bucket/${bucketName}`)
        .then(() => {
          router.push('/u/dashboard');
        });
     }

    /**
     * Delete Object action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteObject = async ( objectName )=>{
       var bucketName = route.params.bucketName;
        await axios.delete(`http://localhost:9099/file/object/single?bucket=${bucketName}&object=${objectName}`)
        .then(() => {
          if(state.isRecursiveFolder)
           onLoadBucketObjectListPath();
          else
           onLoadBucketObjectList();
        })
        .catch(err => console.log(err));
     }

    /**
     * Delete Folder action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteDir = async ( prefixPath )=>{
       var bucketName = route.params.bucketName;
        await axios.delete(`http://localhost:9099/file/object/path?bucket=${bucketName}&path=${prefixPath}`)
        .then(() => {
          if(state.isRecursiveFolder)
           onLoadBucketObjectListPath();
          else
           onLoadBucketObjectList();
        })
        .catch(err => console.log(err));
     }

    /**
     * Dowonload Object action
     * @param obejctName
     * @param bucketName
     */
     const onDownloadObject = async ( objectName )=>{
       var bucketName = route.params.bucketName;
       await axios.get(`http://localhost:9099/file/object/download?bucket=${bucketName}&object=${objectName}`)
        .then(() => {
          // Res Actions
        }).catch(err=> console.log(err));
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
                      ? `http://localhost:9099/file/object?bucket=${bucketName}&path=${state.prefixPath.toLowerCase()}`
                      : `http://localhost:9099/file/object?bucket=${bucketName}`

            axios.post(URL,
                formData,
                {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }).then(() =>{ 
                  onLoadBucketObjectList();
                  state.prefixPath = '';
                })
                .catch(err=> console.log(err))
         }else{
            alert('Error when upload File')
         }
      }

    /**
     * Cek Data type action for handling icon
     */
     const onCekDataType = ( stringDataname ) => {
      if (stringDataname.includes(".png") || stringDataname.includes(".jpg") || stringDataname.includes(".svg")) {
        return 1;
      }else if(stringDataname.includes(".pdf")){
        return 2;
      }else if(stringDataname.includes(".xls") || stringDataname.includes(".doc")){
        return 3;
      }else if(stringDataname.includes(".json")){
        return 4;
      }
    }

    /**
     * Format date action using momen with format 'Apr 28, 2021 4:00 PM'
     */
    const formatDateModified = ( date )=>{
      return  moment(date).format('lll');
    }

    /**
     * Format Size file function
     */
    const formatBytes = (bytes, decimals = 2)=> {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    return {
      ...toRefs(state),
      openModal,
      checkIsEmpty,
      dataObjectList,
      onCekDataType,
      formatBytes,
      formatDateModified,
      onDeleteBucket,
      onDeleteObject,
      onDeleteDir,
      onDownloadObject,
      onUploadObject, 
      onLoadBucketObjectList,
      onLoadBucketObjectListPath
    }
   }
}
</script>