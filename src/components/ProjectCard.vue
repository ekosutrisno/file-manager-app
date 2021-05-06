<template>
   <div class="w-full h-full flex flex-col justify-between p-4 overflow-hidden relative cursor-pointer bg-gray-700 rounded-md shadow hover:shadow-xl">
      <div>
         <div class="text-white font-semibold text-lg">
            {{ project.projectName }}
         </div>
         <p class="text-sm text-indigo-50"> {{project.description}} </p>
         <p class="my-2 text-yellow-300">{{ formatDateCreated(project.dueDate) }} </p>
      </div>
  
      <div>
         <div class="flex items-center justify-end">
            <img v-for="(team, idx) in project.teams" :key="idx" :class="[idx > 0 ? '-ml-2': '']" class="w-8 h-8 object-cover rounded-full border-2" :src="team.image">
         </div>
         <div class="inline-flex items-center space-x-1">
            <span class="text-xs text-yellow-200" v-for="(tag, idx) in project.tags" :key="idx">#{{tag}}</span>
         </div>
      </div>
      <div class="w-20 h-20 rounded-full bg-indigo-400 opacity-30 absolute -top-10 -right-12"></div>
      <div class="w-40 h-40 rounded-full bg-indigo-50 opacity-20 absolute -bottom-10 -right-12"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
   props:{
      project:{
         type: Object,
         required: true
      }
   },
      
   setup(){
      const formatDateCreated = (date)=>{
            return moment(date).format('lll');
      }

      return{
         formatDateCreated
      }
   }

}
</script>