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
   <Svg1 v-if="object.dir" class="absolute -top-1 right-0"/>
   <Svg2 v-else class="absolute -top-1 right-0"/>
   <!-- End Decorate -->

   <div class="">
      <div class="flex items-center">
         <p @click="emitObjectListPath(object.objectName)" v-if="object.dir" class="inline w-full z-10 focus:outline-none cursor-pointer font-semibold flex-1 truncate hover:underline hover:text-indigo-600">
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
      <button v-if="!object.dir" @click="onShowPreview" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
         <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         </svg>
      </button>
      <button v-if="!object.dir" @click="onDownloadObject(object.objectName)" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
         <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
         </svg>
      </button>
      <button @click=" object.dir ? onDeleteDir(object.objectName) : onDeleteObject(object.objectName)" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
         <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
         </svg>
      </button>
   </div>
</div>
</template>

<script>
import moment from 'moment';
import Svg1 from './svg/Svg1.vue';
import Svg2 from './svg/Svg2.vue';
import { useStore } from 'vuex';
import { computed, reactive, toRefs } from '@vue/runtime-core';
import ModalDeleteObjectConfirm from './ModalDeleteObjectConfirm.vue';

/**
 * @author Eko Sutrisno
 */
export default {
  components: { Svg1, Svg2, ModalDeleteObjectConfirm },
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

      const store = useStore();
      const state = reactive({
         path: computed(()=> store.state.object_module.path),
      });

      /**
       * Emit for Handling onloadbucket with folder
       */
      const emitObjectListPath = (object) => {
         ctx.emit('on-load-bucket-object-path', object);
      }

      /**
       * Emit for Handling onloadbucket with folder
       */
      const onShowPreview = () => {
         ctx.emit('on-show-preview');
      }

     /**
     * Delete Object action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteObject = async ( objectName ) => {

      await store.dispatch("object_module/setIsDeleteConfirm", true);
      var dataPayload ={
         bucketName: props.bucket,
         objectName: objectName,
         isRecursiveFolder: props.isRecursiveFolder,
         path: state.path,
         isDirectory: false
      }
      
      await store.dispatch("object_module/setObjectToDelete", dataPayload);
      
     }

     /**
     * Delete Folder action
     * @param obejctName
     * @param bucketName
     */
     const onDeleteDir = async ( prefixPath )=>{
       
      await store.dispatch("object_module/setIsDeleteConfirm", true);
      var dataPayload ={
         bucketName: props.bucket,
         prefixPath: prefixPath,
         isRecursiveFolder: props.isRecursiveFolder,
         isDirectory: true
      }
      await store.dispatch("object_module/setObjectToDelete", dataPayload);

     }

     /**
     * Dowonload Object action
     * @param obejctName
     * @param bucketName
     */
     const onDownloadObject = async ( objectName )=>{
       var dataPayload ={
          bucketName: props.bucket,
          objectName: objectName
       }
       store.dispatch("object_module/onDownloadObject", dataPayload);
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
         ...toRefs(state),
         emitObjectListPath,
         formatDateModified,
         onDownloadObject,
         onDeleteObject,
         onShowPreview,
         formatBytes,
         onDeleteDir,
      }
   }
}
</script>