<template>
   <div class="w-full h-full relative overflow-hidden hover:shadow-xl cursor-pointer flex flex-col items-start p-2 rounded-md bg-indigo-600 shadow text-white transform hover:translate-y-1 transition-transform">
      <img class="w-16 h-16 rounded-full object-cover border-2 shadow" :src="team.image" :alt="team.name">
      <div class="text-gray-50">
         <p class="font-bold">{{team.name}}</p>
         <p class="text-xs mb-2">{{team.email}}</p>
         <p>Dep. {{team.department}}</p>
         <p class="text-xs">{{team.title}} ({{team.role}})</p>
      </div>
   <div class="w-20 h-20 rounded-full bg-indigo-400 opacity-30 absolute -top-10 -right-12"></div>
   <div class="w-40 h-40 rounded-full bg-indigo-100 opacity-30 absolute -bottom-10 -right-12"></div>
   </div>
</template>

<script>
   export default {
      props:{
         team:{
            type: Object,
            required: true,
         }
      }
      
   }
</script>