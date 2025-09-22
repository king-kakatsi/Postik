<script setup>
defineProps({

  postIt: {
    type: Object,
    required: true
  },

})


// import { computed } from 'vue';
import { RouterLink } from 'vue-router';

// pinia
import { usePostItStore } from '@/stores/postItStore';
const storePostIt = usePostItStore();




// %%%%%%%%%%%%%% CALL FORM TO EDIT POST IT %%%%%%%%%%%%%
function editPostIt(id) {
  window.scrollTo(0, 0);
  const resultArray = storePostIt.isExists(id);
  storePostIt.postItPipeline = resultArray[0];

  storePostIt.formMode = 'edit';
}
// %%%%%%%%%%%%%% END - CALL FORM TO EDIT POST IT %%%%%%%%%%%%%




// %%%%%%%%%%%%%% DELETE %%%%%%%%%%%%%
function deletePostIt(id) {
  const approved = confirm("This isn't reversible. Do you really want to continue?");

  if (approved){
    const isDeleted = storePostIt.processAndDeletePostIt(id);
    if (isDeleted) console.log('Deletion succeeded');
  }
}
// %%%%%%%%%%%%%% END - DELETE %%%%%%%%%%%%%




// %%%%%%%%%%%%%% GET RANDOM COLOR %%%%%%%%%%%%%
function randomColor(){
  const randIndex = Math.round((Math.random() * colors.length))
  return colors[randIndex];
}
// %%%%%%%%%%%%%% END - GET RANDOM COLOR %%%%%%%%%%%%%




// %%%%%%%%%%%%%%% AVAILABLE COLORS %%%%%%%%%%%%%%%
const colors = [
  'bg-green-50',
  'bg-emerald-50',
  'bg-red-50',
  'bg-amber-50',
  'bg-blue-50',
]
// %%%%%%%%%%%%%%% END - AVAILABLE COLORS %%%%%%%%%%%%%%%

</script>






<!-- // %%%%%%%%%%%%%%%%%%%%%% VIEW %%%%%%%%%%%%%%%%%%% -->
<template>
  <div :class="randomColor()"
    class="postit-card h-full self-center flex flex-col justify-around gap-y-5 rounded-2xl shadow-2xl p-10 hover:scale-[105%] duration-300">

    <h3 class="font-bold text-xl break-all md:text-2xl text-gray-700">{{ postIt.title.slice(0, 50) + (( postIt.title.length > 50) ? '...' : '') }}</h3>

    <p class="text-gray-600 text-sm break-all">{{ postIt !== false && postIt.content && postIt.content.length > 0 ? (postIt.content[0].slice(0, 100) + ((postIt.content[0] && postIt.content[0].length > 100) ? '...' : '')) : ''}}</p>

    <div class="flex justify-start gap-x-3">


      <img alt="edit" class=" cursor-pointer bg-emerald-600 rounded-full w-[30px] md:w-[35px] h-[30px] md:h-[35px] p-2 shadow-2xl self-center hover:scale-[105%] duration-300" src="@/assets/icons/edit_note.svg" @click="editPostIt(postIt._id)" />


      <img alt="delete" class="cursor-pointer bg-pink-700 rounded-full w-[27px] md:w-[30px] h-[27px] md:h-[30px] p-[7px] shadow-2xl self-center hover:scale-[105%] duration-300" src="@/assets/icons/delete.svg" @click="deletePostIt(postIt._id)"/>


      <RouterLink class=" cursor-pointer px-3 bg-gray-200 py-0 w-auto rounded-lg text-sm flex items-center gap-x-2 text-xs md:text-sm hover:scale-[105%] duration-300" :to="{name: 'details', params: {id: postIt._id}}" >view more

        <img alt="view more" class="w-[20px] h-[20px] self-center" src="@/assets/icons/right_arrow.svg" />
      </RouterLink>
    </div>
  </div>

</template>

<style scoped></style>
