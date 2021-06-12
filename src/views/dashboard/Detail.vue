<template>
   <div class="sm:px-6 lg:px-8 flex flex-col h-full max-w-screen-2xl mx-auto relative">
     <!-- Uploading / Downloading Indicator -->
     <teleport to="#modal-teleport">
      <div v-if="isUploading || isDownloading || isDeleteProcess"  class="absolute bottom-5 font-semibold font-quicksand rounded-md right-5 z-10 w-60 h-14 shadow-xl px-4 flex items-center border bg-white">
        <p class="text-sm">{{ isUploading ? "Uploading "+ processStatus : isDeleteProcess ? "Deleting" :"Downloading" }}</p>
        <Loader />
      </div>
     </teleport>

     <div class="flex-none flex-shrink-0 h-32 border-b">
      <div class="lg:px-6 px-4 pb-2 flex justify-between items-center border-b border-gray-200">
        <router-link to="/u/dashboard" class="flex items-center mr-2 justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
          <span class="hidden md:block">
              Back
          </span>
         <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
         </span>
        </router-link>

        <div class="w-full md:max-w-md mx-auto">
          <label for="search-object" class="sr-only">Search Object</label>
          <input id="search-object" v-model="filterObject" name="search-object" type="text" autocomplete="off" required class="appearance-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Search object..." />        
        </div>

        <div class="inline-block sm:inline-flex items-center space-x-2">
          <div class="sm:flex hidden items-center space-x-1 justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white">
            <span class="hidden lg:block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>  
            </span> 
            <span class="uppercase">
                {{$route.params.bucketName }}
            </span>
          </div>
          <button @click="openModal = !openModal" class="flex items-center space-x-1 justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="py-4 px-4 md:px-10 flex items-center justify-between">
        <p class="hidden md:inline-flex items-center text-sm">
          <span class="cursor-pointer text-indigo-400 hover:text-indigo-800" @click="onLoadBucketObjectList">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </span>
          <span class="font-extrabold text-indigo-600">{{ path ? './'+path : './' }}</span>
        </p>
        <div class="flex items-center sm:justify-end">
          <div class="mr-2">
            <label for="bucket-name" class="sr-only">Bucket Name</label>
            <input id="bucket-name" v-model="prefixPath" name="bucket-name" type="text" autocomplete="off" class="appearance-none relative block w-32 md:w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Add Folder" />
          </div>
          <button class="focus:outline-none">
            <label for="file-upload" class="relative cursor-pointer py-2 px-3 transition bg-indigo-50 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
                  multiple 
                  type="file" 
                  class="sr-only"
                  accept="*"
                  @change="onUploadObject" 
                />
              </label>
          </button>
          <button @click="onChangeDisplay" class="ml-2 cursor-pointer py-2 px-3 transition bg-indigo-50 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <svg v-if="display === 'list'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 hi w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <transition
          enter-active-class="transition ease-out duration-100 transform"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75 transform"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
      >
      
        <div v-if="countSelected" class="py-2 px-4 flex items-center justify-between bg-white shadow-2xl border h-16 z-20 right-5 md:right-10 absolute w-2/3 md:w-2/5 rounded-md">
          <div>
            <span class="text-sm">Items </span>
            <span class="font-semibold">{{countSelected}}</span>
          </div>
          <div class="inline-flex items-center space-x-2">
            <button @click="deleteMultiple" class="ml-2 inline-flex items-center space-x-2 cursor-pointer py-2 px-3 transition bg-indigo-50 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Delete</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button @click="clearSelectedItems" class="ml-2 inline-flex items-center space-x-2 cursor-pointer py-2 px-3 transition bg-indigo-50 rounded-md font-medium text-indigo-600 hover:bg-indigo-700 hover:text-indigo-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </transition>
     </div>

      <div class="py-2 px-2 md:px-6 flex-1 overflow-y-auto on-scrollbar">
          <div v-if="display === 'block'" class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <button v-if="isRecursiveFolder" @click="onLoadBucketObjectList" class="flex items-center space-x-1 justify-center px-4 py-2 my-2 border border-transparent rounded-md shadow-sm text-sm font-medium hover:text-white text-indigo-600 transition-colors hover:bg-indigo-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            </button>
            <!-- Show Directory -->
            <p v-if="directories.length && !isRecursiveFolder && !onSearhing" class="px-4">Folders</p>
            <div v-if="directories.length && !isRecursiveFolder && !onSearhing" class="w-full nv-transition p-2 sm:p-4 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ObjectFileCard 
                v-for="(object, idx) in directories" 
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>

            <!-- Show File -->
            <div class="flex mt-5 mb-3 items-center justify-between px-4 text-sm" v-if="objects.length && !onSearhing">
              <span>Files</span> 
              <div  class="flex items-start">
                  <div class="flex items-center h-5 space-x-2">
                    <p>Show Check</p>
                    <input  @change="onShowChekMarker" id="on-show" :checked="isOnSelect" name="on-show" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  </div>
              </div>
            </div>
            <div v-if="objects.length && !onSearhing" class="w-full nv-transition p-2 sm:p-4 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ObjectFileCard 
                v-for="(object, idx) in objects" 
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>

            <!-- Show Filter -->
            <p v-if="onSearhing" class="px-4">Relevance</p>
            <div v-if="onSearhing" class="w-full nv-transition p-2 sm:p-4 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ObjectFileCard 
                v-for="(object, idx) in dataObjectList"
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>
          </div>
          <div v-else>
            <button v-if="isRecursiveFolder" @click="onLoadBucketObjectList" class="flex items-center space-x-1 justify-center px-4 py-2 my-2 border border-transparent rounded-md shadow-sm text-sm font-medium hover:text-white text-indigo-600 transition-colors hover:bg-indigo-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>

            <!-- Show Directory List Display -->
            <p v-if="directories.length && !isRecursiveFolder && !onSearhing" class="px-4 text-sm">Folders</p>
            <div v-if="directories.length && !isRecursiveFolder && !onSearhing" class="w-full lg:grid lg:grid-cols-2 lg:gap-2 nv-transition p-2 sm:p-4 space-y-1 lg:space-y-0">
              <ObjectFileCardFlex 
                v-for="(object, idx) in directories" 
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>

            <!-- Show File Display List -->
            <div class="flex mt-5 mb-3 items-center justify-between px-4 text-sm" v-if="objects.length && !onSearhing">
              <span>Files</span> 
              <div  class="flex items-start">
                  <div class="flex items-center h-5 space-x-2">
                    <p>Show Check</p>
                    <input  @change="onShowChekMarker" id="on-show-list" :checked="isOnSelect" name="on-show-list" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  </div>
              </div>
            </div>
            <div v-if="objects.length && !onSearhing" class="w-full nv-transition p-2 sm:p-4 space-y-1">
              <ObjectFileCardFlex 
                v-for="(object, idx) in objects" 
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>

             <!-- Show Filter List Display-->
            <p v-if="onSearhing" class="px-4">Relevance</p>
            <div v-if="onSearhing" class="w-full nv-transition p-2 sm:p-4 space-y-1">
              <ObjectFileCardFlex 
                v-for="(object, idx) in dataObjectList"
                :key="idx" 
                :object="object"
                :isRecursiveFolder="isRecursiveFolder"
                :bucket="$route.params.bucketName"
                @on-show-preview="showSingle(object.objectName)"
                @on-load-bucket-object-path="onLoadBucketObjectListPath"
              />
            </div>

          </div>

          <!-- Drag and Drop Section -->
          <div class="p-2">
             <div v-if="dataObjectList.length == 0 && isProcess" class="flex flex-col mb-5 items-center justify-center">
              <Loader/>
              <p>Fetching Object</p>
            </div>
            <div @dragover="dragover" @dragleave="dragleave" @drop="drop" class="mt-1 max-w-lg mx-auto hidden sm:flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input 
                      name="assetsFieldHandle" 
                      id="assetsFieldHandle"
                      multiple
                      type="file" 
                      class="sr-only"
                      @change="onChange" 
                      ref="file"
                      accept="*"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">
                  PNG, JPG, GIF, and File
                </p>
              </div>
            </div>
          </div>
      </div>
   </div>
   <!-- Modal Delete Bucket -->

  <teleport to="#modal-teleport">
    <ModalDeleteBucket 
        :open="openModal" 
        @close-modal="openModal= false" 
        :isEmpty="checkIsEmpty"
        :bucketNameToDelete="$route.params.bucketName"
    />
  </teleport>

   <!-- Modal Delete Object Confirmation -->
   <teleport  to="#modal-teleport">
      <ModalDeleteObjectConfirm
          :open="isDeleteConfim" 
          @close-modal="isCancelDeleteConfirm"
      />
   </teleport>

    <!-- Preview Component -->
    <teleport  to="#modal-teleport">
      <VueEasyLightbox
        scrollDisabled
        escDisabled
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      />
    </teleport>
   
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router'
import {baseURL} from '../../assets/env';
import { useStore } from 'vuex';
import ModalDeleteBucket from '../../components/ModalDeleteBucket.vue';
import ObjectFileCard from '../../components/ObjectFileCard.vue';
import Loader from '../../components/Loader.vue';
import VueEasyLightbox from "vue-easy-lightbox";
import ModalDeleteObjectConfirm from '../../components/ModalDeleteObjectConfirm.vue';
import ObjectFileCardFlex from '../../components/ObjectFileCardFlex.vue';

/**
 * @author Eko Sutrisno
 */
export default {
  components:{
    ModalDeleteObjectConfirm,
    ModalDeleteBucket,
    VueEasyLightbox,
    ObjectFileCard,
    Loader,
    ObjectFileCardFlex,
  },
   setup () {

     const route = useRoute();
     const store = useStore();

     const openModal = ref(false);
     
     const state = reactive({
       imgs: "",
       visible: false,
       index: 0, 
       prefixPath: '',
       fileList: [],
       filterObject: '',
       countSelected: computed(()=> store.state.object_module.objects.filter(o => o.deleteMarker).length),
       selectedObject: computed(()=> store.state.object_module.selectedObject),
       display: computed(()=> store.state.display_module.display),
       allObjects: computed(()=> store.state.object_module.allObjects),
       path: computed(()=> store.state.object_module.path),
       objects: computed(()=> store.state.object_module.objects),
       directories: computed(()=> store.state.object_module.directories),
       isRecursiveFolder: computed(()=> store.state.object_module.isRecursiveFolder),
       isOnSelect: computed(()=> store.state.object_module.isOnSelect),
       isProcess: computed(()=> store.state.object_module.isProcess),
       isUploading: computed(()=> store.state.object_module.isUploading),
       isDownloading: computed(()=> store.state.object_module.isDownloading),
       isDeleteConfim: computed(()=> store.state.object_module.isDeleteConfim),
       isDeleteProcess: computed(()=> store.state.object_module.isDeleteProcess),
       processStatus: computed(()=> store.state.object_module.processStatus),
     })

     const isCancelDeleteConfirm = async () =>{
      await store.dispatch("object_module/setIsDeleteConfirm", false);
     }

     /**
      * Check if the bucket is Empty
      */
     const checkIsEmpty = computed(() => state.allObjects.length == 0);
     const onSearhing = computed(() => state.filterObject.trim().length > 0);

    /**
     * Load All Bucket When Mounted
     */
     const onLoadBucketObjectList = ()=>{
       var bucketName = route.params.bucketName;
       store.dispatch("object_module/setObjectData", bucketName);
     }

     const dataObjectList = computed(() => {
       return state.allObjects
          .filter(object => object.objectName
            .toLowerCase()
            .includes(state.filterObject.toLowerCase()));
     })

    /**
     * All Mounted actions
     */
    onMounted(()=> onLoadBucketObjectList());

    const onLoadBucketObjectListPath = (path) =>{
      // Clear Filter
      state.filterObject = "";

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
       const fileToUpload = event.target.files;
       if(fileToUpload.length > 0){
         onUploadMultipleFile(fileToUpload);
       }
      }

    /**
     * Delete Multiple Action
     */
      const deleteMultiple = async () =>{
        var bucketName = route.params.bucketName;
        
        var dataPayload ={
            bucketName: bucketName,
            isRecursiveFolder: state.isRecursiveFolder,
            path: state.path,
            isDirectory: false
          }

        await store.dispatch("object_module/onDeleteMultipleObject", dataPayload);
      }


    /**
     * Upload Multiple File Handler
     * @param files arays of File
     */
     const onUploadMultipleFile = (files) => {
       if(files.length > 0){
            files.forEach( async (file ) => {
                let formData = new FormData();
                formData.append('file', file);

                var bucketName = route.params.bucketName;

                let URL = state.prefixPath.trim().length > 0 
                          ? `${baseURL}/object?bucket=${bucketName}&path=${state.prefixPath.toLowerCase()+'/'}`
                          : `${baseURL}/object?bucket=${bucketName}`

                var dataPayload = {
                  formData: formData,
                  bucketName: bucketName,
                  url: URL
                }
                
                await store.dispatch("object_module/onUploadObject", dataPayload);
            })
       }
       // Clean prefix path
       state.prefixPath= "";
     }

     const show = () => {
        state.visible = true;
      };
     const handleHide = () => {
        state.visible = false;
      };

    const showSingle = (objectName) => {
      var data = {
        bucketName: route.params.bucketName,
        objectName: objectName
      }
      store.dispatch("object_module/setUrlPreview", data)
        .then(() =>{ 
          show();
          state.imgs = computed(()=> store.state.object_module.urlPreview);
        })
    };

    // Instance of Input File
    const file = ref(null);

    const onChange = ()=> {
     state.fileList = [...file.files];

     onUploadMultipleFile(state.fileList);

    }
    const remove = (i) =>{
      state.fileList.splice(i, 1);
    }
    const dragover = (event) => {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('border-indigo-400')) {
        event.currentTarget.classList.remove('border-gray-300');
        event.currentTarget.classList.add('border-indigo-400');
        event.currentTarget.classList.add('bg-indigo-50');
      }
    }
    const dragleave = (event)=> {
      // Clean up
      event.currentTarget.classList.remove('border-indigo-400');
      event.currentTarget.classList.add('border-gray-300');
      event.currentTarget.classList.remove('bg-indigo-50');
    }
    const drop = (event) => {
      event.preventDefault();
      file.files = event.dataTransfer.files;

      // Trigger the onChange event manually
      onChange();

      // Clean Up UI
      event.currentTarget.classList.remove('border-indigo-400');
      event.currentTarget.classList.add('border-gray-300');
      event.currentTarget.classList.remove('bg-indigo-50');
    }

    const onChangeDisplay = () =>{
      var displayPayload = state.display === 'block' ? 'list' : 'block'
      store.dispatch("display_module/onChangeDisplay", displayPayload);
    }

    const onShowChekMarker = (e) =>{
      if (e.target.checked) {
        store.dispatch("object_module/setIsOnSelect", true);
      }else {
        store.dispatch("object_module/setIsOnSelect", false);
      }
    }

    const clearSelectedItems = () =>{
      store.dispatch("object_module/clearSelectedObject", []);
    }

    return {
      ...toRefs(state),
      openModal,
      checkIsEmpty,
      onSearhing,
      dataObjectList,
      handleHide,
      showSingle,
      onUploadObject,
      isCancelDeleteConfirm,
      onLoadBucketObjectList,
      onLoadBucketObjectListPath,
      onChange,
      remove,
      dragover,
      dragleave,
      drop,
      onChangeDisplay,
      deleteMultiple,
      onShowChekMarker,
      clearSelectedItems
    }
   }
}
</script>