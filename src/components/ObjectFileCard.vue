<template>
<div class="border relative overflow-hidden border-gray-200 p-4 rounded-md min-h-full items-center justify-between text-sm hover:shadow-xl">
   <!-- Decorate -->
   <div :class="[object.dir ? 'bg-indigo-400 opacity-30 w-28 h-28 -bottom-10 -left-12': 'bg-green-400 opacity-30 w-16 h-16 -bottom-6 -left-5']" class="rounded-full absolute"></div>
   <div :class="[object.dir ? 'text-indigo-600': 'text-green-600']" class="absolute bottom-2 left-2 text-xs font-semibold">
      <svg v-if="object.dir" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
   </div>
   <!-- End Decorate -->
   <div class="">
      <div class="flex items-center">
         <p @click="emitObjectListPath(object.objectName)" v-if="object.dir" class="inline w-auto focus:outline-none cursor-pointer font-semibold flex-1 truncate hover:underline hover:text-indigo-600">
            {{object.objectName}}
         </p>
         <span v-else class="font-semibold flex-1 w-0 truncate">
            {{object.objectName}}
         </span>
      </div>
      <div class="inline-flex items-center space-x-1 text-xs">
         <span>{{ formatDateModified(object.lastModified) }} </span>  <span v-if="!object.dir">| {{ formatBytes(object.size) }}</span>
      </div>
   </div>
   <div class="inline-flex mt-4 space-x-2 justify-end float-right">
      <button v-if="!object.dir" @click="onDownloadObject(object.objectName)" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
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
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import {baseURL} from '../assets/env';
import { reactive } from 'vue';

export default {
   props:{
      object:{
         type: Object,
         required: true
      },
      bucket:{
         type: String,
         required: true
      },
      isRecursiveFolder:{
         type: Boolean,
         required: true
      }
   },
   setup(props, ctx){

      const state = reactive({
         isDownloading: false,
         isDownloadError: false
      });

      /**
       * Emit for Handling onloadbucket
       */
      const emitObjectList = (bucketName) => {
         ctx.emit('on-load-bucket-object', bucketName);
      }

      /**
       * Emit for Handling onloadbucket with folder
       */
      const emitObjectListPath = (object) => {
         ctx.emit('on-load-bucket-object-path', object);
      }

     /**
     * Delete Object action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteObject = async ( objectName )=>{
       var bucketName = props.bucket;
        await axios.delete(`${baseURL}/object/single?bucket=${bucketName}&object=${objectName}`)
        .then(() => {
          if(props.isRecursiveFolder)
           emitObjectListPath()
          else
           emitObjectList(bucketName);
        })
        .catch(err => console.log(err));
     }

     /**
     * Delete Folder action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteDir = async ( prefixPath )=>{
       var bucketName = props.bucket;
        await axios.delete(`${baseURL}/object/path?bucket=${bucketName}&path=${prefixPath}`)
        .then(() => {
          if(props.isRecursiveFolder)
           emitObjectListPath();
          else
           emitObjectList();
        })
        .catch(err => console.log(err));
     }

     /**
     * Dowonload Object action
     * @param obejctName
     * @param bucketName
     */
     const onDownloadObject = async ( objectName )=>{
       var bucketName = props.bucket;
       await axios.get(`${baseURL}/url?bucket=${bucketName}&object=${objectName}`)
        .then((res) => {
           try {
              if(res.status == 200){
               download(res.data);
              }
           } catch (error) {
              console.log(error);
           }
        }).catch(err=> console.log(err));
     }

     const download = (object) => {
         axios({
               url: object.url,
               method: 'GET',
               responseType: 'blob',
            }).then((response) => {
               var fileURL = window.URL.createObjectURL(new Blob([response.data]));
               var fileLink = document.createElement('a');

               fileLink.href = fileURL;
               fileLink.setAttribute('download', object.name);
               document.body.appendChild(fileLink);

               fileLink.click();
            });
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

      return{
         emitObjectListPath,
         formatBytes,
         formatDateModified,
         onDeleteObject,
         onDeleteDir,
         onDownloadObject,
         download
      }
   }
}
</script>