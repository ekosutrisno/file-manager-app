<template>
   <div class="sm:px-6 lg:px-8 ">
      <div class="lg:px-6 flex justify-between items-center">
        <router-link to="/u/dashboard" class="flex items-center space-x-1 w-32 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
         <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
         </span>
          <span>
              Back
          </span>
        </router-link>
        <div class="inline-flex items-center space-x-2">
          <div class="flex items-center space-x-1 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white">
            <span>Bucket: </span> 
            <span class="uppercase">
                {{$route.params.bucketName }}
            </span>
          </div>
          <button @click="onDeleteBucket" class="flex items-center space-x-1 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <li v-for="object in objects" :key="object.lastModified" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1">
                  <div class="flex items-center">
                    <svg v-if="onCekDataType(object.objectName) == 1" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span class="ml-2 flex-1 w-0 truncate">
                      {{object.objectName}}
                    </span>
                  </div>
                  <div class="inline-flex items-center space-x-1 text-xs">
                    {{ formatDateModified(object.lastModified) }}
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0 inline-flex space-x-2">
                  <button type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </dd>
        </div>
   </div>
   
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import moment from 'moment';

const data = [{"eTag":"\"2c13a155d721d1267820d3d09d5314f4\"","objectName":"A01.png","lastModified":"2021-04-28T08:14:43.593Z","versionId":null,"size":597816,"owner":{"id":"02d6176db174dc93cb1b899f7c6078f08654445fe8cf1b6ce98d8855f66bdbf4","displayName":"minio"},"storageClass":"STANDARD","userMetadata":null,"dir":false,"latest":false,"deleteMarker":false},{"eTag":"\"dde42adf45c9025cb4964511ed24736b\"","objectName":"A02.png","lastModified":"2021-04-28T08:14:43.713Z","versionId":null,"size":878855,"owner":{"id":"02d6176db174dc93cb1b899f7c6078f08654445fe8cf1b6ce98d8855f66bdbf4","displayName":"minio"},"storageClass":"STANDARD","userMetadata":null,"dir":false,"latest":false,"deleteMarker":false},{"eTag":"\"692d41444f2374dd51710cee510177cf\"","objectName":"A03.jpg","lastModified":"2021-04-28T08:14:43.093Z","versionId":null,"size":57023,"owner":{"id":"02d6176db174dc93cb1b899f7c6078f08654445fe8cf1b6ce98d8855f66bdbf4","displayName":"minio"},"storageClass":"STANDARD","userMetadata":null,"dir":false,"latest":false,"deleteMarker":false},{"eTag":"\"2a995b7c7e08f343a5c17fe87cb14141\"","objectName":"application.yml","lastModified":"2021-04-28T08:07:59.173Z","versionId":null,"size":598,"owner":{"id":"02d6176db174dc93cb1b899f7c6078f08654445fe8cf1b6ce98d8855f66bdbf4","displayName":"minio"},"storageClass":"STANDARD","userMetadata":null,"dir":false,"latest":false,"deleteMarker":false}]

export default {
   setup () {

     const route = useRoute();
     const router = useRouter();
     const state = reactive({
       objects: []
     })

     const onLoadBucketObjectList = async () =>{
       var bucketName = route.params.bucketName;
      //  const bucketObject = await axios.get(`http://localhost:9099/file/object/${bucketName}`)
      //  state.objects = bucketObject.data;
      state.objects = data
     }

     const onDeleteBucket = async () =>{
        var bucketName = route.params.bucketName;
        await axios.delete(`http://localhost:9099/file/bucket/${bucketName}`)
        .then(res => {
          router.push('/u/dashboard')
          console.log(res)
        });
     }

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

    const formatDateModified = ( date )=>{
      return  moment(date).format('lll');
    }

     onMounted(()=>onLoadBucketObjectList());
      

      return {
        ...toRefs(state),
        onCekDataType,
        formatDateModified,
        onDeleteBucket
      }
   }
}
</script>