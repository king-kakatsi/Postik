

// import { validateText } from '@/helpers/validationHelper';
import { getFullDate } from '@/helpers/DateHelper';
import { validateText } from '@/helpers/validationHelper';
import { createPostIt, updatePostIt } from '@/models/PostIt';
import { fetchAllFromApi, storeWithApi, updateWithApi, deleteWithApi } from '@/services/AxiosService';
import { fetchFromLocalStorage, saveInLocalStorage } from '@/services/LocalStorageService';
import { ref } from 'vue'


let hasFirstFetch = false;




// %%%%%%%%%%%%%%% SEARCH POST-ITS %%%%%%%%%%%%%%%
export function searchPostIt(value){

  try{

    if (value && value.trim() !== '') {
      return postIts.value.filter((postIt) =>{
        const searchHelper = postIt.title + postIt.content[0] + postIt.updatedAt + getFullDate(postIt.updatedAt) + postIt.createdAt + getFullDate(postIt.createdAt);
        return searchHelper.toLowerCase().includes(value.toLowerCase())
      });

    } else {
      return null;
    }
  } catch (ex){

    console.log(ex);
    return null;
  }
}
// %%%%%%%%%%%%%%% END - SEARCH POST-ITS %%%%%%%%%%%%%%%



// %%%%%%%%%%%%%% REFRESH %%%%%%%%%%%%%%%%
export async function refreshFromApi(){

  isAnimActive.value = true;

  try{

    const result = await fetchAllFromApi();
    if (result !== false && result.length > 0){

      console.log(result);
      postIts.value = result;
      saveInLocalStorage('post_its', postIts.value);
    }

    isAnimActive.value = false;
    return result;

  } catch (ex){

    console.log(ex);
    isAnimActive.value = false;
    return false;
  }
}
// %%%%%%%%%%%%%% END - REFRESH %%%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%% REFRSH FROM LOCAL STORAGE %%%%%%%%%%%%%%%
export async function refreshFromLocal(){


  let result;
  try{

    result = fetchFromLocalStorage('post_its');
    if (result !== false && result.length > 0){
      postIts.value = result;
    }
    return result;

  } catch (ex){

    console.log(ex);
    return false;
  }
}
// %%%%%%%%%%%%%%% END - REFRSH FROM LOCAL STORAGE %%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%% GET ALL POST-ITS %%%%%%%%%%%%%%%
export async function getAllPostIts(){


  let result;
  if (hasFirstFetch) {

    result = fetchFromLocalStorage('post_its');
    if (result !== false) postIts.value = result
  } else {

    result = await refreshFromApi();
    if (result === false) return result;
    hasFirstFetch = true;
  }

  sortPostItsByDate();
  return postIts;
}
// %%%%%%%%%%%%%%% END - GET ALL POST-ITS %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%% GET A POST-IT %%%%%%%%%%%%%%%
export function getPostIt(id){

  const resultArray = isExists(id);
  if (resultArray !== false) return resultArray[0];
  return false;
}
// %%%%%%%%%%%%%%% END - GET A POST-IT %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%% CHECK AND CREATE POST-IT %%%%%%%%%%%%%%%
export async function processAndCreatePostIt(title, content){
  isFormAnimActive.value = true;

  try{

    if (validateText(title)){

      const newPostIt = createPostIt(title, content);

      const result = await storeWithApi(newPostIt);

      if (result !== false){

        newPostIt._id = result.note_id;
        console.log(newPostIt);

        postIts.value.push(newPostIt);
        sortPostItsByDate();
        saveInLocalStorage('post_its', postIts.value);

        isFormAnimActive.value = false;
        return true;
      }

      isFormAnimActive.value = false;
      return false;
    }

    isFormAnimActive.value = false;
    return false;
  } catch (ex){

    console.log(ex);
    isFormAnimActive.value = false;
    return false;
  }
}
// %%%%%%%%%%%%%%% END - CHECK AND CREATE POST-IT %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%% PROCCESS AND UPDATE POST-IT %%%%%%%%%%%%%%%
export async function processAndUpdatePostIt(id, title, content = null){
  isFormAnimActive.value = true;

  try{

    if (validateText(title)){
      const resultArray = isExists(id);

      if (resultArray !== false){
        let thisPostIt = resultArray[0];
        let foundAt = resultArray[1];

        thisPostIt = updatePostIt(title, content, thisPostIt);

        const result = await updateWithApi(thisPostIt._id, thisPostIt);
        if (result !== false){

          postIts.value[foundAt] = thisPostIt;
          sortPostItsByDate();
          saveInLocalStorage('post_its', postIts.value);

          isFormAnimActive.value = false;
          return true;
        }

      } else {
        console.log("This item doesn't exists");
      }

      isFormAnimActive.value = false;
      return false;
    } else {

      isFormAnimActive.value = false;
      return false;
    }
  } catch (ex){

    console.log(ex);
    isFormAnimActive.value = false;
      return false;
  }
}
// %%%%%%%%%%%%%%% END - PROCCESS AND UPDATE POST-IT %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%%%%% PROCESS AND DELETE POST-IT %%%%%%%%%%%%%%%
export async function processAndDeletePostIt(id){
  isAnimActive.value = true;

  try{

    const resultArray = isExists(id);
    if (resultArray !== false){

    let foundAt = resultArray[1];
    console.log(postIts.value);
    const result = await deleteWithApi(id);

    if(result !== false){
      postIts.value.splice(foundAt, 1);

      saveInLocalStorage('post_its', postIts.value);

      isAnimActive.value = false;
      return true;
    }

  } else {

    isAnimActive.value = false;
    console.log("This item doesn't exists");
  }

  isAnimActive.value = false;
  return false;

  } catch(ex){

    console.log(ex);
    isAnimActive.value = false;
    return false;
  }
}
// %%%%%%%%%%%%%%%%%% END - PROCESS AND DELETE POST-IT %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%%%%% DELETE ALL POST-ITS %%%%%%%%%%%%%%%
export async function DeleteAllPostIts(){

  isAnimActive.value = true;

  try{


    for(let postIt of postIts.value){
      // await processAndDeletePostIt(postIt._id);
      processAndDeletePostIt(postIt._id);
    }
    postIts.value = [];
    saveInLocalStorage('post_its', postIts.value);

    isAnimActive.value = false;
    return true;

  } catch (ex){

    console.log(ex);
    return false;
  }
}
// %%%%%%%%%%%%%%%%%% END - DELETE ALL POST-ITS %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%% CHECK IF POST-IT EXISTS %%%%%%%%%%%%%%%
export function isExists(id){

  if (id != null && postIts.value != null && postIts.value.length > 0){
    let foundAt = -1;
    for(let postIt of postIts.value){

      foundAt++;

      if (postIt._id === id) {
        return [postIt, foundAt];
      }
    }
    return false;

  } else {
    return false;
  }
}
// %%%%%%%%%%%%%% END - CHECK IF POST-IT EXISTS %%%%%%%%%%%%%%%




// %%%%%%%%%%%%% SORT BY DATE %%%%%%%%%%%%
export function sortPostItsByDate(){

  if (postIts.value && postIts.value.length > 0){
    postIts.value = postIts.value.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    return postIts.value;
  }
  return false;
}
// %%%%%%%%%%%%% END - SORT BY DATE %%%%%%%%%%%%



// %%%%%%%%%% SERIAL CREATION %%%%%%%%%%%%
export async function serialCreation(number){

  const titles = [
    'Oops',
    "This is a title",
    "Test",
    "Coding Academy",
    "Epitech"
  ]

  const contents = [
    "I don't know what I'm writing.",
    "And this is just a content.",
    "What are you exactly testing?",
    "A great and nice place to learn and grow. I really like it.",
    "Marvelous school. I'll make them proud of me."
  ]


  try{

    if (number && Number.isInteger(number)){
      for (let i = 0; i < number; i++){
        const randIndex = Math.round((Math.random() * titles.length));
        await processAndCreatePostIt(
          titles[randIndex] + i,
          contents[randIndex]
        )
      }

    } else {
      return false;
    }
  } catch (ex) {

    console.log(ex);
    return false;
  }
}
// %%%%%%%%%% END - SERIAL CREATION %%%%%%%%%%%%





export function usePostIt() {
  return {
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
  }
}




// %%%%%%%%%%%%%%%%% POST IT LIST %%%%%%%%%%%%%%%%
const postIts = ref([]);
const isAnimActive = ref(false);
const isFormAnimActive = ref(false);
// %%%%%%%%%%%%%%%%% END - POST IT LIST %%%%%%%%%%%%%%%%

