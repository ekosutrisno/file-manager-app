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
            <span>Add memeber</span>
        </button>
      </div>
    </div>
  </header>
  <div class="max-w-screen-xl p-4 mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div v-for="team in people" :key="team.id" class="w-full h-full relative overflow-hidden hover:shadow-xl cursor-pointer flex flex-col items-start p-2 rounded-md bg-indigo-600 shadow text-white transform hover:translate-y-1 transition-transform">
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
  </div>
</template>

<script>
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
  setup() {
    return {
      people,
    }
  },
}
</script>