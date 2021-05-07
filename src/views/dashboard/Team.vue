<template>
  <header class="bg-white shadow sm:px-6 lg:px-8 sticky z-10 top-0">
    <div class="max-w-7xl flex items-center justify-between mx-auto pb-2 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl font-bold text-gray-900">
        <router-link to="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg> 
        </router-link> <span class="font-medium">My</span><span class="text-indigo-500 font-bold">Team</span>
      </h1>
      <div class="text-gray-900">
        <button @click="openModal = !openModal" class="py-2 px-4 font-semibold text-sm bg-white border inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span>Add member</span>
        </button>
      </div>
    </div>
  </header>
  <div class="max-w-screen-xl p-4 mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <TeamCard v-for="team in people" :key="team.id" :team="team"/>
  </div>
  <ModalAddTeam 
   :open="openModal" 
    @close-modal="openModal= false" 
    @on-success-created="onSuccess"
  />
</template>

<script>
import { ref } from 'vue';
import ModalAddTeam from '../../components/ModalAddTeam.vue';
import TeamCard from '../../components/TeamCard.vue'
const people = [
  { id:'ef20b245-6286-42cd-9974-2a1740ea1447',
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'a508be5f-6988-4741-8ae0-f5c48c9c7c83',
    name: 'Eko Sutrisno',
    title: 'Tukang Makan Nasi Goreng',
    department: 'Test Makanan',
    role: 'Tester',
    email: 'eko.sutrisno@example.com',
    image:
      'https://images.unsplash.com/photo-1581704906775-891dd5207444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default {
  components: { TeamCard, ModalAddTeam },
  setup() {

    const openModal = ref(false);
    const onSuccess =  ()=>{
      console.log("Success Action");
    }

    return {
      openModal,
      onSuccess,
      people,
    }
  },
}
</script>