<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle min-w-full inline-block sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Folder
                </th>
                <th scope="col" class="px-6 hidden md:block py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="data in dataFile" :key="data.ETag">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full group hover:bg-indigo-600 inline-flex items-center justify-center">
                        <svg v-if="onCekDataType(data.Key) == 1" xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-gray-600 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                       <svg v-else-if="onCekDataType(data.Key) == 3" xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-gray-600 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <svg v-else-if="onCekDataType(data.Key) == 4" xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-gray-600 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                       <svg v-else xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-gray-600 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                       </svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium hover:underline cursor-pointer text-gray-900">
                        <router-link to="/u/dashboard/detail">
                           {{ data.Key }}
                        </router-link>
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ data.LastModified }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 hidden md:block whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import DataDummy from '../assets/DataDummy';

export default {
  setup() {
    const state = reactive({
      dataFile: DataDummy
    });

    const onGetData = async () =>{
      // const response = await fetch('http://localhost:8080/files');
      // const responseToJson = await response.json();
      
      // state.dataFile = responseToJson;
      console.log("On Development!");
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

    onMounted(()=>{
      if (state.dataFile.length == 0) {
        onGetData()
      }
    })

    return {
      ...toRefs(state),
      onCekDataType
    }
  },
}
</script>