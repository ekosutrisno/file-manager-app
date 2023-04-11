<template>
  <div class="h-full flex-1 pt-16 bg-gray-800 bg-custom">
    <div class="flex h-full flex-col items-center justify-between p-4 text-center">
      <div class="flex flex-col items-center justify-between">
        <h1 class="md:text-6xl font-semibold text-indigo-50 text-3xl">
        Manage and Store
        </h1>
        
        <p class="md:text-lg text-base mt-2 mb-10 p-2 text-gray-400">
          Organize and store your personal files easily using 
            <span class="text-indigo-300 font-semibold">Magic</span><span class="text-indigo-50 font-semibold">Box</span>
        </p>

        <router-link to="/u/dashboard" class="py-2 px-8 rounded-md bg-indigo-400 text-white hover:bg-indigo-500">Dashboard</router-link>

      </div>

        <div class="hidden md:grid grid-cols-6 gap-4 my-4">
          <Jpg class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Png class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Svg class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Pdf class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Csv class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Doc class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Xls class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Ppt class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Txt class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Json class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Zip class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
          <Gen class="md:w-12 md:h-12 h-8 w-8 shadow-xl" />
        </div>

      <p class="text-center text-xs text-gray-300 my-5 lg:mt-8">&copy; Eko Sutrisno {{new Date().getFullYear()}} under MIT License </p>
    </div>
  </div>
</template>

<script>
import Csv from '../components/svg/file/Csv.vue';
import Doc from '../components/svg/file/Doc.vue';
import Gen from '../components/svg/file/Gen.vue';
import Jpg from '../components/svg/file/Jpg.vue';
import Json from '../components/svg/file/Json.vue';
import Pdf from '../components/svg/file/Pdf.vue';
import Png from '../components/svg/file/Png.vue';
import Ppt from '../components/svg/file/Ppt.vue';
import Svg from '../components/svg/file/Svg.vue';
import Txt from '../components/svg/file/Txt.vue';
import Xls from '../components/svg/file/Xls.vue';
import Zip from '../components/svg/file/Zip.vue';
/**
 * @author Eko Sutrisno
 */
export default {
  components: { Jpg, Png, Svg, Pdf, Csv, Doc, Xls, Ppt, Txt, Zip, Gen, Json },};
</script>