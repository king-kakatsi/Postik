<script setup>
import { ref, watch } from 'vue';

// pinia
import { usePostItStore } from '@/stores/postItStore';
const storePostIt = usePostItStore();


let currentButton = 1;
const buttons = ref([]);

storePostIt.startingIndex = (currentButton - 1) * storePostIt.maxItemsPerList;
storePostIt.endingIndex = storePostIt.startingIndex + storePostIt.maxItemsPerList;

const maxButton = ref(0);

watch(() => storePostIt.postIts.length, () =>{
  maxButton.value = Math.ceil(storePostIt.postIts.length / storePostIt.maxItemsPerList);

  if (maxButton.value > 1){
    updateButtonsBackground();
  } else {
    buttons.value = [];
  }
})



// %%%%%%%%%% UPDATE BUTTONS BACKGROUND %%%%%%%%
function updateButtonsBackground() {

  buttons.value = [];
  for (let i = 1; i <= maxButton.value; i++){

    buttons.value.push({
      id: `page-button-${i}`,
      style: i === currentButton ? 'bg-gray-800 text-white' : 'bg-gray-500 text-white'
    });
  }
}
// %%%%%%%%%% END - UPDATE BUTTONS BACKGROUND %%%%%%%%




// %%%%%%%%%%% PAGINATION LOGIC %%%%%%%%%%%%%%%%
// to add to each button @click
function onPageButtonClicked(id){

  id = id.replace("page-button-", "");
  currentButton = parseInt(id);

  // if (currentButton + 1 <= maxButton.value) {

  // currentButton += 1;
  window.scrollTo(0, 0);
  updateButtonsBackground();

  storePostIt.startingIndex = (currentButton - 1) * storePostIt.maxItemsPerList;
  storePostIt.endingIndex = storePostIt.startingIndex + storePostIt.maxItemsPerList;
  // }
}
// %%%%%%%%%%% END - PAGINATION LOGIC %%%%%%%%%%%%%%%%

/*
*/

</script>






<!-- // %%%%%%%%%%%%%%%%%%%%%% VIEW %%%%%%%%%%%%%%%%%%% -->
<template>

  <div class="pl-4 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-12 gap-5 md:gap-x-10">

    <button
      v-for="button in buttons"
      :class="button.style"
      class="cursor-pointer pagination-button text-center font-bold rounded-lg px-3 py-1 hover:translate-y-[-3px] hover:bg-gray-700 hover:text-white duration-300 "
      :key="button.id"
      @click="onPageButtonClicked(button.id)">

      {{ button.id.replace('page-button-', '') }}
    </button>

  </div>
</template>
  <!-- // %%%%%%%%%%%%%%%%%%%%%% END - VIEW %%%%%%%%%%%%%%%%%%% -->

<style scoped></style>
