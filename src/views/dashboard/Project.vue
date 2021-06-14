<template>
  <header class="bg-white shadow sm:px-6 lg:px-8 sticky z-10 -top-2">
    <div class="max-w-7xl flex items-center justify-between mx-auto pb-2 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl font-bold text-gray-900">
        <router-link to="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg> 
        </router-link> <span class="font-medium">P</span><span class="text-indigo-500 font-bold">roject</span>
      </h1>
      <div class="text-gray-900">
        <button @click="openModal = !openModal" class="py-2 px-4 font-semibold text-sm bg-white border inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span>Add project</span>
        </button>
      </div>
    </div>
  </header>
  <div class="max-w-screen-xl mx-auto p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <ProjectCard v-for="project in projects" :key="project.projectId" :project="project"/>
  </div>
  <ModalAddProject 
    :open="openModal" 
    @close-modal="openModal= false" 
    @on-success-created="onSuccess"
  />
</template>

<script>
import { ref } from 'vue'
import ModalAddProject from '../../components/ModalAddProject.vue'
import ProjectCard from '../../components/ProjectCard.vue'

const projects = [
  {
    projectId: 'e8caf83b-34bf-4336-ba87-0f3a2294c2d8',
    projectName: 'Minio Client Implementation',
    description: 'Poject lore Descriptions Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eum?',
    dueDate: new Date('2021-05-05'),
    tags: ['minio','ui', 'erajaya'],
    teams:[
      {
        id: '537b964a-7ebf-4ecd-a7c6-8d4bd3bb6bd8',
        name: 'Eko Sutrisno',
        role: 'Developer',
        image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id: 'b4297d71-b0e4-4ba7-b2ca-be974e64493d',
        name: 'Miaw Kolongkonyi',
        role: 'UI/UX',
        image:
          'https://images.unsplash.com/photo-1581704906775-891dd5207444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      }
    ]
 },
  {
    projectId: 'c66ee3e6-bd74-494f-b54f-58bb3d1ec703',
    projectName: 'User Service',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum et asperiores mollitia ipsam obcaecati, accusantium necessitatibus quae, quia maiores, ab non. Nam aspernatur pariatur quod! Quae quidem impedit sint nesciunt.',
    dueDate: new Date('2021-01-11'),
    tags: ['backend','java'],
    teams:[
      {
        id: '5dd89f76-c047-4d6d-85c3-9b2de5a7130a',
        name: 'Eko Sutrisno',
        role: 'Developer',
        image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id: 'e3aab9af-7ef9-480d-8a89-dc8b733a777c',
        name: 'Miaw Kolongkonyi',
        role: 'UI/UX',
        image:
          'https://images.unsplash.com/photo-1581704906775-891dd5207444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJveXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      }
    ]
 }
]

/**
 * @author Eko Sutrisno
 */
export default {
  components:{ProjectCard, ModalAddProject},
  setup() {
    const openModal = ref(false);
    const onSuccess =  ()=>{
      console.log("Success Action");
    }

    return {
      projects,
      openModal,
      onSuccess
    }
  },
}
</script>