<template>
<div class="border relative border-gray-200 p-4 rounded-md h-14 items-center justify-between text-sm hover:shadow-xl">
   <!-- Decorate -->
   <Svg1 v-if="object.dir" class="absolute -top-1 right-0"/>
   <Svg2 v-else class="absolute -top-1 right-0"/>
   
   <!-- End Decorate -->

   <div class="flex items-center justify-between">
      <div class="flex items-center w-full md:w-1/2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
               <input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
         </div>
         <svg v-if="object.dir" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 mx-2 text-indigo-500" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
         </svg>
         <svg v-else xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 mx-2 text-indigo-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
         </svg>
         <p @click="emitObjectListPath(object.objectName)" v-if="object.dir" class="inline w-full z-10 focus:outline-none cursor-pointer flex-1 truncate hover:underline hover:text-indigo-600 hover:font-semibold">
            {{object.objectName}}
         </p>
         <span v-else class="flex-1 w-0 truncate">
            {{formatObjectName(object.objectName)}}
         </span>
       
      </div>
      <div class="inline-flex items-center space-x-1 text-xs">
         <div class="md:inline-flex items-center space-x-2 hidden">
            <span class="hidden md:block" v-if="!object.dir">{{ formatBytes(object.size) }} |</span>
            <span>{{ formatDateModified(object.lastModified) }} </span>
         </div>
         <div class="z-10 relative">
            <svg xmlns="http://www.w3.org/2000/svg" @click="manageOptionShow" class="h-5 w-5 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            
            <transition
               enter-active-class="transition ease-out duration-100 transform"
               enter-from-class="opacity-0 scale-95"
               enter-to-class="opacity-100 scale-100"
               leave-active-class="transition ease-in duration-75 transform"
               leave-from-class="opacity-100 scale-100"
               leave-to-class="opacity-0 scale-95"
            >
               <!-- Options -->
               <div v-click-away="manageOptionShow" v-if="isOpenOption" class="inline-flex w-auto items-center justify-around space-x-2 absolute p-2 bg-white right-5 top-0 shadow-xl border rounded-md">
                  <button v-if="!object.dir && isAllowPreview(object.objectName)" @click="onShowPreview" type="button" class="font-medium rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-indigo-600 hover:text-indigo-500 hover:bg-gray-100">
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
            </transition>
         </div>
      </div>
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
import FileExtentionType from './FileExtentionType.vue';

/**
 * @author Eko Sutrisno
 */
export default {
  components: { 
     Svg1, 
     Svg2, 
     ModalDeleteObjectConfirm,
     FileExtentionType,
   },
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
         isOpenOption: false
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
      * Format object Name and remove base path
      */
      const formatObjectName = (objectName)=>{
         return state.path.length > 0 ? objectName.replace(state.path, "") : objectName;
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

      const checkFileExt = (fileName) =>{
         var fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
         return fileName.includes('.') ? fileName.match(fileExtensionPattern)[0] : '.exe';
      }

      const isAllowPreview = (objectName)=>{
         return checkFileExt(objectName) === '.jpg' 
                  ||checkFileExt(objectName) === '.jpeg' 
                  ||checkFileExt(objectName) === '.webp' 
                  ||checkFileExt(objectName) === '.png' 
                  ||checkFileExt(objectName) === '.pdf' 
                  ||checkFileExt(objectName) === '.svg'
      }

      const manageOptionShow = () => {
         state.isOpenOption = !state.isOpenOption
      }

      return{
         ...toRefs(state),
         isAllowPreview,
         checkFileExt,
         emitObjectListPath,
         formatDateModified,
         onDownloadObject,
         onDeleteObject,
         onShowPreview,
         formatBytes,
         onDeleteDir,
         manageOptionShow,
         formatObjectName
      }
   }
}
</script>