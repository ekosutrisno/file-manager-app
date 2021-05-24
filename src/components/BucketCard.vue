<template>
<router-link :to="`/u/dashboard/bucket/${bucket.name}`">
   <div class="w-full flex h-full p-4 overflow-hidden relative bg-white border hover:shadow-xl cursor-pointer rounded-md">
      <div>
         <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
         </div>
         <div class="font-semibold text-indigo-800 flex">
            <span class="truncate w-40 lg:w-full">
               {{ formatBucketName(bucket.name) }}
            </span>
         </div>
         <p class="font-semibold text-gray-500 text-xs">
           Create date: {{ formatDateCreated(bucket.creationDate) }}
         </p>
      </div>
      <div class="w-40 h-40 rounded-full bg-indigo-400 opacity-20 absolute -bottom-10 -right-12"></div>
   </div>
</router-link>
</template>

<script>
import moment from 'moment';
export default {
   props:{
      bucket:{
         type: Object,
         required: true
      }
   },
   setup () {

      const formatBucketName = (bucketName) =>{
         return bucketName.toUpperCase();
      }

      const formatDateCreated = (date)=>{
         return moment(date).format('lll');
      }
   
      return {formatBucketName,formatDateCreated}
   }
}
</script>