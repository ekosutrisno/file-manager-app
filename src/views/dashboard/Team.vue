<template>
  <header class="bg-white shadow sm:px-6 lg:px-8 z-10 top-0">
    <div class="max-w-7xl flex items-center justify-between mx-auto pb-2 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl font-bold text-gray-900">
        <router-link to="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg> 
        </router-link> <span class="font-medium">T</span><span class="text-indigo-500 font-bold">eam</span>
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

// &auto=format&fit=facearea&facepad=4&w=256&h=256&q=60

const people = [
  { id:'97f2b1ee-3826-4524-a069-a774341c7f13',
    name: 'Christiawan Apriliyanto',
    title: 'Manager',
    department: 'IT Architect',
    role: 'A',
    email: 'christiawan.apriliyanto@example.com',
    image:
      'https://images.unsplash.com/photo-1560241804-02b7b1bc9d55?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'97f2b1ee-3826-4524-a069-a774341c7f13',
    name: 'Alfa Pungki Irawan',
    title: 'System Architect Manager',
    department: 'IT Architect',
    role: 'A',
    email: 'alfa.irawan@example.com',
    image:
      'https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'ef20b245-6286-42cd-9974-2a1740ea1447',
    name: 'Michele Yeohan',
    title: 'UI/UX',
    department: 'IT Architect',
    role: 'A',
    email: 'michele.yeohan@example.com',
    image:
      'https://images.unsplash.com/photo-1599842057874-37393e9342df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'a508be5f-6988-4741-8ae0-f5c48c9c7c83',
    name: 'Eko Sutrisno',
    title: 'Full Stack Developer',
    department: 'IT Architect',
    role: 'T',
    email: 'eko.sutrisno@example.com',
    image:
      'https://images.unsplash.com/photo-1581704906775-891dd5207444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'2d0b5a8c-c6bd-402f-b68f-b7bcc1842721',
    name: 'Meiliana Indriani',
    title: 'QA and Technical Writer',
    department: 'IT Architect',
    role: 'T',
    email: 'meiliana.indriani@example.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  { id:'4c162037-1815-4861-a415-5ab323700cf0',
    name: 'Martin Orlando',
    title: 'Software Engineer',
    department: 'IT Architect',
    role: 'T',
    email: 'martin.orlando@example.com',
    image:
      'https://images.unsplash.com/photo-1592424388874-04d8b432a25e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

/**
 * @author Eko Sutrisno
 */
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