<template>
   <div>
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
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span class="ml-2 flex-1 w-0 truncate">
                    resume_back_end_developer.pdf
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                  </a>
                </div>
              </li>
              <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span class="ml-2 flex-1 w-0 truncate">
                    coverletter_back_end_developer.pdf
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                  </a>
                </div>
              </li>
              <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="ml-2 flex-1 w-0 truncate">
                    black_cat.jpg
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
   </div>
   
</template>

<script>
export default {
   setup () {
      

      return {}
   }
}
</script>