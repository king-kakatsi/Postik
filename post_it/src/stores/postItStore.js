import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePostIt } from '@/viewmodels/PostItViewModel';

const {
  postIts,
  isAnimActive,
  isFormAnimActive,
  refreshFromApi,
  searchPostIt,
  getPostIt,
  getAllPostIts,
  processAndCreatePostIt,
  processAndUpdatePostIt,
  processAndDeletePostIt,
  DeleteAllPostIts,
  isExists
} = usePostIt();




export const usePostItStore = defineStore('counter', ()=>{

  // const postIts = getAllPostIts();
  const postItPipeline = ref({title: '', content: ''});
  const formMode = ref('button');
  const searchValue = ref('');


  const maxItemsPerList = ref(20); // maximum number of items on a page
  const startingIndex = ref(0); // index of the first item of the page
  const endingIndex = ref(0); // index of the latt item of the page




  return {
    // states
    postIts,
    postItPipeline,
    formMode,
    searchValue,
    isAnimActive,
    isFormAnimActive,
    maxItemsPerList,
    startingIndex,
    endingIndex,

    // actions
    refreshFromApi,
    searchPostIt,
    getPostIt,
    getAllPostIts,
    processAndCreatePostIt,
    processAndUpdatePostIt,
    processAndDeletePostIt,
    DeleteAllPostIts,
    isExists
  }
})
