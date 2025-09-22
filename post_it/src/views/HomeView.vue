<script setup>
// import { onMounted} from 'vue';

import { computed, onMounted } from 'vue';
import PostItCard from '../components/PostItCard.vue';
import PostItForm from '../components/PostItForm.vue';
import PostItHeader from '../components/PostItHeader.vue';
import PostItPaginator from '../components/PostItPaginator.vue';
import PostItFooter from '../components/PostItFooter.vue';
import loadingJSON from "../assets/json/loading_infinite_symbol.json";


// Pinia store
import { usePostItStore } from '@/stores/postItStore';
import { useToast } from "vue-toastification";

const storePostIt = usePostItStore();
const toast = useToast();


// import { serialCreation } from '../viewmodels/PostItViewModel';
// serialCreation(15);


// %%%%%%%%%%%%%%% GET LIST %%%%%%%%%%%%
onMounted(async () => {
	const allPostIts = await storePostIt.getAllPostIts();

	if (allPostIts === false) {

		storePostIt.postIts = [];
		toast.error("Sorry, we couldn't load your data. Check your internet connection and retry.");
	} else {

		storePostIt.postIts = allPostIts;
	}
})
// %%%%%%%%%%%%%%% END - GET LIST %%%%%%%%%%%%




// %%%%%%%%%%%% WATCH SEARCH %%%%%%%%%
const displayedPostIts = computed(() => {

  let listToRender = storePostIt.postIts;
	if (storePostIt.searchValue) {

		const result = storePostIt.searchPostIt(storePostIt.searchValue);

		listToRender = (result && result.length > 0) ?
			result : (storePostIt.searchValue === '' ? storePostIt.postIts : result);

	}

  // storePostIt.hidePagination = listToRender.length > storePostIt.maxItemsPerList;

  if (storePostIt.endingIndex > 0){

    listToRender = listToRender.slice(
			storePostIt.startingIndex,
			storePostIt.endingIndex
		)
  }
  return listToRender;
})
// %%%%%%%%%%%%END - WATCH SEARCH %%%%%%%%%




// %%%%%%%%%%%%%% DELETE ALL %%%%%%%%%%
function deleteAllPostIts() {
	const approved = confirm("This isn't reversible. Do you really want to continue?");

	if (approved) {
		storePostIt.DeleteAllPostIts();
	}
}
// %%%%%%%%%%%%%% END - DELETE ALL %%%%%%%%%%

</script>





<template>
	<PostItHeader :hasSearchBar="true" />


	<main class="bg-gray-200">
		<div class="py-10 px-4 md:px-10 bg-gray-100 rounded-tl-[7%] rounded-bl-[10%] min-h-screen">

			<div class="flex justify-start gap-x-3 align-center mb-10 mt-4">

				<h1 class="text-lg md:text-2xl font-bold text-gray-600 ml-2">All your post-its</h1>

				<div class="flex justify-end gap-x-3">



					<!-- // DELETE ALL BUTTON -->
					<button
						class="cursor-pointer px-3 py-0 font-bold w-auto text-white rounded-lg bg-pink-700 text-xs flex items-center gap-x-2 hover:scale-[105%] duration-300"
						@click="deleteAllPostIts">

						<img alt="delete all" class="w-[16px] md:w-[20px] h-[16px] md:h-[20px] self-center"
							src="@/assets/icons/delete.svg" />

						Delete all
					</button>
					<!-- // END - DELETE ALL BUTTON -->
				</div>

			</div>


			<!-- // %%%%%%%%%% LIST VIEW %%%%%%%%%%%%%%%% -->
			<section v-show="!storePostIt.isAnimActive"
				class="listview my-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 xl:gap-x-8 ">
				<PostItForm />

				<!-- <div class="m-0 p-0 h-100" v-show="displayedPostIts.length > 0"> -->
				<PostItCard v-show="displayedPostIts.length > 0" v-for="postIt in displayedPostIts" :key="postIt._id"
					:postIt="postIt" />
				<!-- </div> -->

				<p v-show="!displayedPostIts || displayedPostIts.length <= 0" class="text-center text-lg self-center">--
					No
					post-it --</p>

			</section>
			<!-- // %%%%%%%%%% END - LIST VIEW %%%%%%%%%%%%%%%% -->



			<!-- // %%%%%%%%%%%%%% ANIM %%%%%%%% -->
			<Vue3Lottie v-show="storePostIt.isAnimActive" ref="customControl" :animationData="loadingJSON" :height="200"
				:width="200" :loop="true" :speed="2" :autoPlay="true" :pauseAnimation="true" class="rounded-full" />
			<!-- // %%%%%%%%%%%%%% END - ANIM %%%%%%%% -->



			<!-- // %%%%%%%% PAGINATOR %%%%%%%%% -->
			<PostItPaginator class="mt-20"/>
			<!-- // %%%%%%%% END - PAGINATOR %%%%%%%%% -->
		</div>
	</main>



	<!-- // %%%%%%%%%%%%% FOOTER %%%%%%%%%%%%%% -->
	<PostItFooter />
	<!-- // %%%%%%%%%%%%% END - FOOTER %%%%%%%%%%%%%% -->
</template>
