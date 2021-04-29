<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="closeModal" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Delete Bucket <span v-if="!isEmpty" class="text-red-600">(Bucket not empty!)</span>
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Bucket must be empty and this action cannot be undone. Type in the name of the bucket to confirm <span class="font-semibold text-indigo-800">`{{bucketNameToDelete}}`</span>
                    </p>
                  </div>
                  <div class="mt-5">
                     <form @submit.prevent="onDeleteBucket">
                        <label for="bucket-name" class="sr-only">Bucket Name</label>
                        <input id="bucket-name" v-model="bucketName" :disabled="!isEmpty" name="bucket-name" type="text" autocomplete="off" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Bucket Name" />
                     </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button v-if="isEmpty" type="button" @click="onDeleteBucket" :disabled="!confrmBucketName" :class="[confrmBucketName ? 'bg-red-600 hover:bg-red-700': 'bg-red-400']" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                Delete
              </button>
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeModal" ref="cancelButtonRef">
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed, ref } from 'vue';
import axios from 'axios';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useRouter } from 'vue-router';

const baseURL = 'http://localhost:9099/file';

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  props:{
     open: {
        type: Boolean,
        required: true,
        default: false
     },
     isEmpty:{
        type: Boolean,
        required: true
     },
     bucketNameToDelete:{
        type: String,
        required: true
     }
  },
  setup(props, ctx){

     const router = useRouter();

     const closeModal = ()=>{
        ctx.emit('close-modal');
     }
     
     const bucketName = ref('');
     const confrmBucketName = computed(()=> props.bucketNameToDelete === bucketName.value);
     const onDeleteBucket = () => {

       if(props.isEmpty && confrmBucketName){
          
         axios.delete(`${baseURL}/bucket/${bucketName.value}`)
         .then(() =>{
            router.push('/u/dashboard');
         })
         .catch(err=> console.log(err));
         // console.log(bucketName.value);
         bucketName.value = '';
         closeModal();
       }
     }

     return{
        closeModal,
        bucketName,
        onDeleteBucket,
        confrmBucketName
     }
  }
}
</script>