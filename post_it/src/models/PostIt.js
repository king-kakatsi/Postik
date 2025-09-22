// import { getFullDate } from "@/helpers/DateHelper"



// %%%%%%%%%%%% CREATE POST IT %%%%%%%%%%%%%
export function createPostIt(title, content = ''){
    const date = new Date();

    return {
      _id: '',
      // title,
      title,
      content: [content],
      createdAt: date,
      updatedAt: date
    }
}
// %%%%%%%%%%%% END - CREATE POST IT %%%%%%%%%%%%%




// %%%%%%%%%%%% UPDATE POST IT %%%%%%%%%%%%%
export function updatePostIt(title, content, thisPostIt){

    const date = new Date();

    thisPostIt.title = title ?? thisPostIt.title;
    thisPostIt.content = Array.isArray(content) ? content : [content];
    thisPostIt.updatedAt = date;

    return thisPostIt;
}
// %%%%%%%%%%%% END - UPDATE POST IT %%%%%%%%%%%%%




// %%%%%%%%%%%%%%% AVAILABLE COLORS %%%%%%%%%%%%%%%
// const colors = [
//   'bg-green-50',
//   'bg-emerald-50',
//   'bg-red-50',
//   'bg-amber-50',
//   'bg-blue-50',
// ]
// %%%%%%%%%%%%%%% END - AVAILABLE COLORS %%%%%%%%%%%%%%%



