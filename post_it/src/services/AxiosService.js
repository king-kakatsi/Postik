
import axios from "axios";



// %%%%%%%%%%%%%% CREATE %%%%%%%%%%%%%%
const api = axios.create({

  baseURL: "https://post-it.epi-bluelock.bj", // the backend base api
  timeout: 15000, // 15s delay max
  headers: { "Content-Type": "application/json" }
});
export default api;
// %%%%%%%%%%%%%% END - CREATE %%%%%%%%%%%%%%



// %%%%%%%%%%%%% FETCH ALL %%%%%%%%%%%%%%%
export async function fetchAllFromApi(){
    const result = await api.get("/notes");

    if (result.status === 200){
      const data = result.data.notes;
      return data ?? [];
    }
    return false;
  }
// %%%%%%%%%%%%% END - FETCH ALL %%%%%%%%%%%%%%%



// %%%%%%%%%%%%% STORE %%%%%%%%%%%%%%%
export async function storeWithApi(data){

  if (data){
    const result = await api.post("/notes", data);

    if (result.status === 201){
      return result.data; //_id
    }
  }
  return false;
  }
// %%%%%%%%%%%%% END - STORE %%%%%%%%%%%%%%%



// %%%%%%%%%%%%% UPDATE %%%%%%%%%%%%%%%
export async function updateWithApi(id, data){

  if (data && id){
    const result = await api.put("/notes/" + id, data);
    return result.status === 200;
  }
  return false;
  }
// %%%%%%%%%%%%% END - UPDATE %%%%%%%%%%%%%%%



// %%%%%%%%%%%%% UPDATE %%%%%%%%%%%%%%%
export async function deleteWithApi(id){

    if (id){
      console.log(id);
      const result = await api.delete("/notes/" + id);
      return result.status === 200;
    }
    return false;
  }
// %%%%%%%%%%%%% END - UPDATE %%%%%%%%%%%%%%%




// %%%%%%%%%%%% FORMAT DATA FOR API %%%%%%%%%%%
export function dataToApi(data){

  if (data){
    return {
      id: data.id,
      title: data.title,
      content: [JSON.stringify(data)]
      // content: [data.content, JSON.stringify(data)]
    }
  }
  return false;
}
// %%%%%%%%%%%% END - FORMAT DATA FOR API %%%%%%%%%%%




// %%%%%%%%%%%% FORMAT DATA FROM API %%%%%%%%%%%
export function dataFromApi(data){

  try{

    if (data) return JSON.parse(data.content[0]);
    // if (data) return JSON.parse(data.content[1]);
    return false;
  } catch (ex){
    console.log(ex);
    return false;
  }
}
// %%%%%%%%%%%% END - FORMAT DATA FROM API %%%%%%%%%%%



