<script setup>


defineProps({

  containerBgClass: {
    type: String
  },

  bgClass: {
    type: String
  },
});
</script>





<!-- // %%%%%%%%%%%%%%%%%%%%%% VIEW %%%%%%%%%%%%%%%%%%% -->
<template>
  <footer :class="containerBgClass ?? 'bg-gray-100'">

    <div :class="bgClass ?? 'bg-gray-200'" class="py-10 flex justify-around gap-x-6 px-3 rounded-tr-[30%]">

      <div class="flex justify-center flex-col items-center gap-y-3">
        <p class="text-gray-500 text-lg md:text-2xl">Postik, keep track of your ideas !</p>

        <p class="text-gray-500 italic text-sm md:text-lg">developed by King Kakatsi</p>
        <!-- <p class="text-gray-500">Contact: <a href="tel:+233535610908">+233 53 561 0908</a></p> -->
        <p class="text-xs font-bold text-gray-700">postik 2025 © All rights reserved.</p>
      </div>
    </div>
  </footer>

</template>

    <!-- // %%%%%%%%%%%%%%%%%%%%%% END - VIEW %%%%%%%%%%%%%%%%%%% -->
