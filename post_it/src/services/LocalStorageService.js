
// %%%%%%%%%%%%%%% SAVE IN LOCAL STORAGE %%%%%%%%%%%%%%%
export function saveInLocalStorage(key, value){

  if (key && key.trim() !== ''){
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } else {

    return false;
  }
}
// %%%%%%%%%%%%%%% SAVE IN LOCAL STORAGE %%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%% END - FETCH FROM LOCAL STORAGE %%%%%%%%%%%%%%%
export function fetchFromLocalStorage(key){

  try{

    if (key && key.trim() !== ''){

      const result = JSON.parse(localStorage.getItem(key));
      return result ?? false;

    } else {
      return false;
    }
  } catch (ex){
    console.log(ex);
    return false;
  }
}
// %%%%%%%%%%%%%%% END - FETCH FROM LOCAL STORAGE %%%%%%%%%%%%%%%
