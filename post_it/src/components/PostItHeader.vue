<script setup>



defineProps({

  hasSearchBar: {
    type: Boolean,
    required: true
  },

  containerBgClass: {
    type: String
  },

  bgClass: {
    type: String
  },
});



// Pinia store
import { usePostItStore } from '@/stores/postItStore';
const storePostIt = usePostItStore();
let deg = -360;

// %%%%%%%%%%%% REFRESH BUTTON ANIMATION %%%%%%%%%%
async function refreshButtonAnim() {
  deg = -deg;
  let current_rotation = 0;
  const refreshButton = document.querySelector(".rotate");
  refreshButton.style.rotate = '';

  if (refreshButton) {
    for (let i = 1; i <= 2; i++) {
      current_rotation += deg;
      refreshButton.style.transform = 'rotate(' + current_rotation + 'deg)';
    }
  }
}
// %%%%%%%%%%%% REFRESH BUTTON ANIMATION %%%%%%%%%%



// %%%%%%%%%%%% REFRESH %%%%%%%%%
async function refresh() {
  refreshButtonAnim();
  await storePostIt.refreshFromLocal();
  storePostIt.searchValue = '';
}
// %%%%%%%%%%%%END - REFRESH %%%%%%%%%
</script>





<!-- // %%%%%%%%%%%%%%%%%%%%%% VIEW %%%%%%%%%%%%%%%%%%% -->
<template>
  <header :class="bgClass ?? 'bg-gray-200'"
    class="py-10 flex lg:gap-x-40 md:gap-x-20 gap-x-10 px-3 md:px-10 rounded-br-[30%]">


    <RouterLink class="cursor-pointer flex items-center gap-x-1 md:gap-x-4 " to="/">

      <img alt="logo" class="cursor-pointer  w-[25px] h-[25px] self-center" src="@/assets/logo.svg" />

      <h1 class="text-2xl md:text-4xl font-bold">Postik</h1>
    </RouterLink>



    <div class="flex justify-between gap-x-2 w-full" v-show="hasSearchBar">

      <!-- // SEARCH BAR -->
      <input v-model="storePostIt.searchValue"
        class="w-full border rounded-full bg-gray-200 focus:bg-white border-gray-700 text-gray-700 px-3 py-0 text-sm focus:outline-none focus:border-emerald-300 focus:text-[16px] duration-300"
        type="text" id="title" name="title" placeholder="What are you looking for?" required />
      <!-- // END - SEARCH BAR -->


      <img alt="refresh"
        class="rotate cursor-pointer bg-gray-800 rounded-full w-[35px] h-[35px] p-2 border self-center hover:scale-[105%] duration-300"
        src="@/assets/icons/refresh.svg" @click="refresh" />
    </div>
  </header>

</template>

<!-- // %%%%%%%%%%%%%%%%%%%%%% END - VIEW %%%%%%%%%%%%%%%%%%% -->



<style scoped>
.rotate {
  transition: transform 1s ease-in;
}
</style>
