<script setup>

import { computed } from 'vue';
import { capitalizeFirstLetter } from '@/helpers/StringHelper';
import loadingJSON from "../assets/json/loading_infinite_symbol.json";
import { useToast } from "vue-toastification";

// Pinia store
import { usePostItStore } from '@/stores/postItStore';
const storePostIt = usePostItStore();


// toast
const toast = useToast();


defineProps({

  postItId: {
    type: Number,
    required: false
  },
})





// %%%%%%%%%%%%%% BINDING REFS %%%%%%%%%%%%%%
// const formTitle = computed(() => {
computed(() => {
  return capitalizeFirstLetter(storePostIt.formMode);
})
// %%%%%%%%%%%%%% END - BINDING REFS %%%%%%%%%%%%%%




// %%%%%%%%%%%%%%%%%%% SHOW FORM %%%%%%%%%%%%%%
function showForm() {
  storePostIt.formMode = 'create';
}
// %%%%%%%%%%%%%%%%%%% END - SHOW FORM %%%%%%%%%%%%%%




// %%%%%%%%%%%%%%%% ON SUBMIT %%%%%%%%%%%%
async function onSubmit() {
  
  let result;
  if (storePostIt.formMode.toLowerCase().includes('create')) {

    result = await storePostIt.processAndCreatePostIt(
      storePostIt.postItPipeline.title,
      storePostIt.postItPipeline.content
    );
  } else {
    result = await storePostIt.processAndUpdatePostIt(
      storePostIt.postItPipeline._id,
      storePostIt.postItPipeline.title,
      storePostIt.postItPipeline.content
    );
  }

  if (result) {
    console.log('Operation succeeded');
    storePostIt.postItPipeline = { title: '', content: '' };

    toast.success(
      storePostIt.formMode === 'create' ?
      "Successfully created" :
      "Successfully modified"
    );

    storePostIt.formMode = 'button';

  } else {
    toast.error('Operation failed. Please check your connection and your title input.');
  }
}

// %%%%%%%%%%%%%%%% END - ON SUBMIT %%%%%%%%%%%%




// %%%%%%%%%%%% MINIMIZE %%%%%%%%%%%%
function minimize() {
  storePostIt.postItPipeline = { title: '', content: '' };
  storePostIt.formMode = 'button';
}
// %%%%%%%%%%%% END - MINIMIZE %%%%%%%%%%%%

</script>






<!-- // %%%%%%%%%%%%%%%% VIEW %%%%%%%%%%%%%%%% -->

<template>

  <div class="relative"
  v-show="!storePostIt.isFormAnimActive">

    <!-- // %%%%%%%%%%%%% MINIMIZE FORM BUTTON %%%%%%%%%%%%%%% -->
    <div v-show="!storePostIt.formMode.toLowerCase().includes('button')"
      class="cursor-pointer absolute right-0 mt-2 mr-2 p-1 rounded-full bg-gray-500 text-6xl self-conter text-center w-[20px] md:w-[25px] h-[20px] md:h-[25px]"
      @click="minimize">
      <img src="@/assets/icons/minimize.svg" alt="close form">
    </div>
    <!-- // %%%%%%%%%%%%% END - MINIMIZE FORM BUTTON %%%%%%%%%%%%%%% -->



    <!-- // %%%%%%%%%%%%%%%%% ADD BUTTON %%%%%%%%%%%%% -->
    <div class="cursor-pointer rounded-2xl h-full p-6 text-6xl flex justify-center items-center bg-emerald-500 hover:scale-[105%] hover:shadow-2xl duration-300"
      v-if="storePostIt.formMode.toLowerCase().includes('button')" @click="showForm">

      <img alt="refresh icon" class="w-6 h-6 md:w-10 md:h-10 self-center" src="@/assets/icons/add.svg" />
    </div>
    <!-- // %%%%%%%%%%%%%%%%% END - ADD BUTTON %%%%%%%%%%%%% -->



    <!-- // %%%%%%%%%%%%%%% FORM %%%%%%%%%%% -->
    <div ref="post_it_form" class="post-it-form h-full bg-white rounded-2xl p-6 self-center"
      v-if="!storePostIt.formMode.toLowerCase().includes('button')">


      <!-- <h2 class="text-pink-800 font-bold text-2xl mb-6 text-center">{{ formTitle }} post-it</h2> -->


      <!-- // TITLE -->
      <div class="flex flex-col mb-6">
        <label for="title" class="text-gray-700 text-sm">Title</label>

        <input v-model="storePostIt.postItPipeline.title"
          class="w-full border rounded-lg border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 focus:text-[16px] duration-300"
          type="text" id="title" name="title" placeholder="What's your post-it about?" required />

          <p class="text-red-500 text-xs italic">Enter between 3 and 50 valid characters</p>
      </div>
      <!-- // END - TITLE -->


      <!-- // CONTENT  -->
      <div class="flex flex-col mt-4 mb-6">

        <label for="content" class="text-gray-700 text-sm">content</label>

        <textarea v-model="storePostIt.postItPipeline.content"
          class="w-full border rounded-lg border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 focus:text-[16px] duration-300"
          name="content" id="content" cols="30" rows="3"
          placeholder="You can give more details about your post-it"></textarea>

      </div>
      <!-- // END - CONTENT  -->


      <!-- // SUBMIT BUTTON -->
      <input class="submit-button bg-emerald-600 font-bold text-white py-1 mt-3 mx-0 w-full rounded-lg" type="submit"
        name="submit" v-model="storePostIt.formMode" @click="onSubmit" />
      <!-- // END - SUBMIT BUTTON -->

    </div>
    <!-- // %%%%%%%%%%%%%%% END - FORM %%%%%%%%%%% -->

  </div>



  <Vue3Lottie
    v-show="storePostIt.isFormAnimActive"
  ref="customControl"
  :animationData="loadingJSON"
  :height="200"
  :width="200"
  :loop="true"
  :speed="2"
  :autoPlay="true"
  :pauseAnimation="true"
  class="rounded-full"
  />
</template>

<!-- // %%%%%%%%%%%%%%%% END - VIEW %%%%%%%%%%%%%%%% -->
