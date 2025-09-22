<script setup>

// Pinia store
import { useRoute, useRouter } from 'vue-router';
import { usePostItStore } from '@/stores/postItStore';
import PostItHeader from '../components/PostItHeader.vue';
import PostItFooter from '../components/PostItFooter.vue';
import { getFullDate } from '@/helpers/DateHelper';
import { onMounted, ref } from 'vue';
import { refreshFromLocal } from '@/viewmodels/PostItViewModel';

const storePostIt = usePostItStore();
const route = useRoute();
const router = useRouter();

let id = route.params.id;
let postIt = ref(storePostIt.getPostIt(id));

// Load data on page load/refresh
onMounted(async () => {
  // Always load data if postIt doesn't exist
  if (!postIt.value) {
    refreshFromLocal();
    postIt.value = storePostIt.getPostIt(id);
  }
});

// Call form to edit post it
function editPostIt(id) {
  router.push('/');
  const resultArray = storePostIt.isExists(id);
  storePostIt.postItPipeline = resultArray[0];
  storePostIt.formMode = 'edit';
}

// Delete post it
function deletePostIt(id) {
  const approved = confirm("This isn't reversible. Do you really want to continue?");

  if (approved) {
    const isDeleted = storePostIt.processAndDeletePostIt(id);
    if (isDeleted) router.push('/');
  }
}

</script>

<template>
  <!-- Header -->
  <PostItHeader :hasSearchBar="false" />

  <main class="bg-gray-200">
    <div
      class="bg-gray-100 min-h-screen flex flex-col gap-x-10 px-4 md:px-10 pt-10 md:pt-20 pb-0 md:pb-10 rounded-l-[10%]">

      <!-- Details -->
      <div class="flex flex-col gap-y-5 md:gap-y-10">

        <div class="block">
          <h2 class="text-emerald-800 break-all inline text-2xl md:text-3xl font-bold border-b-4">
            {{ postIt ? postIt.title : '-- No title --' }}
          </h2>
        </div>

        <p class="text-sm break-all md:text-lg">
          {{ postIt && postIt.content && postIt.content.length > 0 ? postIt.content[0] : '-- No content --' }}
        </p>

        <div class="flex md:items-center flex-col md:flex-row">
          <div class="flex items-center">
            <img alt="modified at" class="ml-[-8px] md:ml-0 w-[35px] md:w-[45px] h-[35px] md:h-[45px] p-2 self-center"
              src="@/assets/icons/date.svg" />
            <b class="text-emerald-800 md:mr-3 text-sm md:text-lg">Updated on:</b>
          </div>
          <p class="text-sm md:text-lg">
            {{ postIt ? getFullDate(postIt.updatedAt) : '-- No date --' }}
          </p>
        </div>

        <div class="flex md:items-center flex-col md:flex-row">
          <div class="flex items-center">
            <img alt="modified at" class="ml-[-8px] md:ml-0 w-[35px] md:w-[45px] h-[35px] md:h-[45px] p-2 self-center"
              src="@/assets/icons/date.svg" />
            <b class="text-emerald-800 md:mr-3 text-sm md:text-lg">Created on:</b>
          </div>
          <p class="text-sm md:text-lg">
            {{ postIt ? getFullDate(postIt.createdAt) : '-- No date --' }}
          </p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-start gap-x-3 mt-10" v-if="postIt">
        <button
          class="cursor-pointer px-5 py-2 font-bold w-auto text-white rounded-lg bg-emerald-600 text-xs flex items-center gap-x-2 hover:scale-[105%] duration-300"
          @click="editPostIt(postIt._id)">
          <img alt="edit" class="w-[20px] h-[20px] self-center" src="@/assets/icons/edit_note.svg" />
          <span class="text-white">Edit</span>
        </button>

        <button
          class="cursor-pointer px-5 py-2 font-bold w-auto text-white rounded-lg bg-pink-700 text-xs flex items-center gap-x-2 hover:scale-[105%] duration-300"
          @click="deletePostIt(postIt._id)">
          <img alt="delete" class="w-[20px] h-[20px] self-center" src="@/assets/icons/delete.svg" />
          Delete
        </button>
      </div>


      <!-- Go back -->
       <div class="flex">

         <RouterLink class="cursor-pointer mt-30 px-3 bg-gray-200 py-2 w-auto rounded-lg text-sm flex items-center gap-x-2 text-xs md:text-sm hover:scale-[105%] duration-300" to="/" >

           <img alt="view more" class="w-[20px] h-[20px] self-center rotate-180" src="@/assets/icons/right_arrow.svg" />

           go back
          </RouterLink>
        </div>
    </div>
  </main>

  <!-- Footer -->
  <PostItFooter />
</template>
