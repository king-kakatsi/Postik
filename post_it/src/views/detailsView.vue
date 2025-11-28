<script setup>

// Pinia store
import { useRoute, useRouter } from 'vue-router';
import { usePostItStore } from '@/stores/postItStore';
import PostItHeader from '../components/PostItHeader.vue';
import PostItFooter from '../components/PostItFooter.vue';
import PostItForm from '../components/PostItForm.vue';
import { getFullDate } from '@/helpers/DateHelper';
import { onMounted, ref, watch } from 'vue';
import { refreshFromLocal } from '@/viewmodels/PostItViewModel';

const storePostIt = usePostItStore();
const route = useRoute();
const router = useRouter();

let id = route.params.id;
let postIt = ref(storePostIt.getPostIt(id));
let isEditMode = ref(false);

// Load data on page load/refresh
onMounted(async () => {
  // Always load data if postIt doesn't exist
  if (!postIt.value) {
    refreshFromLocal();
    postIt.value = storePostIt.getPostIt(id);
  }
});

// Watch for form mode changes to handle exit from edit mode
watch(() => storePostIt.formMode, (newMode) => {
  if (newMode === 'button' && isEditMode.value) {
    isEditMode.value = false;
    // Refresh the post-it data to show updates
    postIt.value = storePostIt.getPostIt(id);
  }
});

// Toggle edit mode
function editPostIt(id) {
  const resultArray = storePostIt.isExists(id);
  if (resultArray && resultArray.length > 0) {
    storePostIt.postItPipeline = { ...resultArray[0] }; // Create a copy to avoid direct mutation issues
    storePostIt.formMode = 'edit';
    isEditMode.value = true;
  }
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

  <main class="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 min-h-screen">
    <div class="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">

      <!-- Back Button - Top -->
      <div class="mb-8">
        <RouterLink to="/"
          class="inline-flex items-center gap-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-gray-700 font-medium group">
          <img alt="go back" class="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300"
            src="@/assets/icons/right_arrow.svg" />
          <span>Back to all notes</span>
        </RouterLink>
      </div>

      <!-- Main Content Card -->
      <div v-if="postIt" class="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <!-- Edit Mode -->
        <div v-if="isEditMode" class="p-4 md:p-8">
          <div class="flex justify-between items-center mb-4 px-4">
            <h2 class="text-2xl font-bold text-gray-800">Edit Note</h2>
          </div>

          <!-- Reusing PostItForm Component -->
          <PostItForm />
        </div>

        <!-- View Mode -->
        <div v-else>
          <!-- Header Section with Gradient -->
          <div class="bg-gray-800 px-8 md:px-12 py-6 md:py-10">
            <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-white break-words leading-tight drop-shadow-lg text-center">
              {{ postIt.title }}
            </h1>
          </div>

          <!-- Content Section -->
          <div class="px-4 md:px-8 py-10 md:py-12 space-y-8">

            <!-- Post-it Content - EMPHASIZED -->
            <div class="prose prose-lg max-w-none">
              <div
                class="bg-gray-100 rounded-2xl px-4 py-8 md:py-10">
                <p class="text-gray-600 text-md md:text-lg leading-relaxed break-words whitespace-pre-wrap font-medium">
                  {{ postIt.content && postIt.content.length > 0 ? postIt.content[0] : 'No content available' }}
                </p>
              </div>
            </div>

            <!-- Metadata Section - REDUCED SIZE -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">

              <!-- Updated Date -->
              <div
                class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div class="flex items-center gap-x-2 mb-1">
                  <div class="bg-blue-500 rounded-full p-1.5">
                    <img alt="updated" class="w-4 h-4 brightness-0 invert" src="@/assets/icons/date.svg" />
                  </div>
                  <h3 class="text-xs font-semibold text-blue-900 uppercase tracking-wide">Last Updated</h3>
                </div>
                <p class="text-gray-700 text-xs font-medium ml-8">
                  {{ getFullDate(postIt.updatedAt) }}
                </p>
              </div>

              <!-- Created Date -->
              <div
                class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow duration-300">
                <div class="flex items-center gap-x-2 mb-1">
                  <div class="bg-purple-500 rounded-full p-1.5">
                    <img alt="created" class="w-4 h-4 brightness-0 invert" src="@/assets/icons/date.svg" />
                  </div>
                  <h3 class="text-xs font-semibold text-purple-900 uppercase tracking-wide">Created On</h3>
                </div>
                <p class="text-gray-700 text-xs font-medium ml-8">
                  {{ getFullDate(postIt.createdAt) }}
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 pt-6 border-t border-gray-200">

              <!-- Edit Button -->
              <button @click="editPostIt(postIt._id)"
                class="flex-1 min-w-[140px] group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-center gap-x-3 relative z-10">
                  <img alt="edit" class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    src="@/assets/icons/edit_note.svg" />
                  <span class="text-sm">Edit Note</span>
                </div>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                </div>
              </button>

              <!-- Delete Button -->
              <button @click="deletePostIt(postIt._id)"
                class="flex-1 min-w-[140px] group relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-center gap-x-3 relative z-10">
                  <img alt="delete" class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    src="@/assets/icons/delete.svg" />
                  <span class="text-sm">Delete Note</span>
                </div>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Post-it Found -->
      <div v-else class="bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div class="max-w-md mx-auto">
          <div class="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <span class="text-4xl">📝</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Note Not Found</h2>
          <p class="text-gray-600 mb-6">The post-it you're looking for doesn't exist or has been deleted.</p>
          <RouterLink to="/"
            class="inline-flex items-center gap-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <img alt="go back" class="w-5 h-5 rotate-180 brightness-0 invert" src="@/assets/icons/right_arrow.svg" />
            <span>Back to Notes</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <PostItFooter />
</template>
