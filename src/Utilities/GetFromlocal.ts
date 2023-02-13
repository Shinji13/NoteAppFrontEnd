import {Note} from '../App';

export const GetDefaultNotes=(Notes:Note[],istext:boolean)=>{
    let currentExistingNotes=Notes;
    let currentExistingTags=JSON.parse(localStorage.getItem("tags")!).ArrTags as {value:string,key:string}[];
    return currentExistingNotes.map((note)=>{
         let tag:string[]=[];
         for(let j=0;j<note.noteInfo.relatedTags.length;j++){
          for(let i=0; i<currentExistingTags.length; i++){
            if(currentExistingTags[i].key===note.noteInfo.relatedTags[j]){
                tag.push(currentExistingTags[i].value)
                break;
            }
           } 
         }
         return (istext)? {id:note.id,noteInfo:{title:note.noteInfo.title,relatedTags:tag,noteText:note.noteInfo.noteText}}:{id:note.id,noteInfo:{title:note.noteInfo.title,relatedTags:tag}} as Note
       
    })
  }