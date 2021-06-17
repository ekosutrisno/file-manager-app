<template>
   <div class="h-full max-w-6xl mx-auto px-6 py-10">
      <!-- Introduction -->
      <section>
         <h1 class="font-semibold text-xl mb-2">Getting Started</h1>
         <p>
         LiBox is an implementation bucket storage using <span class="mark">min.io</span> as server, <span class="mark">SpringBoot</span> Java as API, <span class="mark">VueJS v3.0.5</span> as Frontend Javascript Framework, and <span class="mark">TailwindCss v2.1.2</span> as Css Utility Framework. With LiBox you can Manage, Store, Organize your personal files easily.
         </p>
      </section>

      <!-- Bucket Sections -->
      <div class="mt-6">
         <h1 class="mark-lg w-36">Bucket Actions</h1>
         <!-- Create Bucket-->
         <section class="mt-2">
            <h1 class="font-semibold mb-1">Create Bucket</h1>
            <p>
               You can easily create a bouquet just by going to the dashboard and then clicking the create bucket button in the upper right. Bucket naming is not recommended there are spaces, you can use hyphens <span class="mark">-</span> or <span class="mark">_</span>.
            </p>
         </section>

         <!-- Delete Bucket-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Delete Bucket</h1>
            <p>
               You can easily if you want to delete a bucket, on the drive page, just click the trash button on the top right. The thing that must be considered is when you delete a bucket, make sure your bucket is <span class="mark">empty</span>, if the bucket is not empty then the bucket cannot be deleted.
            </p>
         </section>
         <!-- Rename Bucket-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Rename Bucket</h1>
            <p>
               Buckte cannot be edited or renamed.
            </p>
         </section>
         <!-- Search Bucket-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Search Bucket</h1>
            <p>
               You can easily if you want to directly search for bucket specifically by bucket name.
            </p>
         </section>
      </div>

      <!-- Object Sections -->
      <div class="mt-6">
         <h1 class="mark-lg w-44">Obejct/File Actions</h1>
         <!-- Upload File-->
         <section class="mt-2">
            <h1 class="font-semibold mb-1">Upload File</h1>
            <p>
               Upload files can be done in two ways, first by clicking the upload button on the top right or you can drag and drop in the upload area below the file list area. In uploading files, you can upload more than one file, which means multiple files can be uploaded at once. But you can't upload Folder.
            </p>
         </section>

         <!-- Upload File and Create Folder-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Upload File and Create Folder</h1>
            <p>
               Basically the same way to upload files in the above point, only you have to add a folder name in the input text beside the upload button and a folder will automatically be created and you can see the files in it.
            </p>
         </section>
         <!-- Preview File-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Preview File</h1>
            <p>
               You can only preview files with image formats such as <span class="mark">.jpg</span>, <span class="mark">.jpeg</span>,<span class="mark">.png</span>,<span class="mark">.webp</span>, and <span class="mark">.svg</span>.
            </p>
         </section>
         <!-- Search File-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Search File</h1>
            <p>
               You can easily if you want to directly search for files specifically by file name.
            </p>
         </section>
         <!-- Delete File-->
         <section class="mt-4">
            <h1 class="font-semibold mb-1">Delete File</h1>
            <p>
               There are two ways to delete files, namely by clicking delete on each file or folder, besides that you can also mark several files at once and then delete them. To mark a file, you can click the toggle mark on the right of the file list, a checkbox will appear for you to choose.
            </p>
         </section>
      </div>
      <!-- Display Sections -->
      <div class="mt-6 pb-10">
         <h1 class="mark-lg w-44">Display Mode</h1>
         <!-- List Mode-->
         <section class="mt-2">
            <h1 class="font-semibold mb-1">List Mode</h1>
            <p>
               Displays files in a List.
            </p>
         </section>
         <!-- Block Mode-->
         <section class="mt-2">
            <h1 class="font-semibold mb-1">Block Mode</h1>
            <p>
               Displays files in a Block.
            </p>
         </section>
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
<style scoped>
   .mark{
      @apply px-2 py-0.5 bg-indigo-100 rounded font-semibold text-sm
   }
   .mark-lg{
      @apply px-2 py-0.5 bg-indigo-400 rounded-r-full font-semibold text-white
   }
</style>