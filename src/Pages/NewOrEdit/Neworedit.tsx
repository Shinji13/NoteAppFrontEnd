import React, {  useRef, useState } from 'react'
import SelectComponent from '../Select/SelectComponent';
import { v4 as uuidv4 } from 'uuid';
import { Note  } from '../../App';
import { useNavigate, useParams } from 'react-router';
import { useSelectedTag } from '../../Utilities/zustandStore';
import style from "./New.module.css"


export default function NewOrEdit({isEdit}:{isEdit:boolean}) {
  let {id}=useParams();
  const [current,intial]=useSelectedTag((state)=>[state.Current,state.intial])
  const titleRef=useRef<HTMLInputElement>(null);
  const noteTextRef=useRef<HTMLTextAreaElement>(null);
  const [selected,]=useState<any>(()=>{
    if(isEdit){     
      let Notes=JSON.parse(localStorage.getItem("notes")!).ArrNotes as Note[];
      let myNote:any;
      for(let i=0;i<Notes.length;i++){
         if(Notes[i].id===id){
             myNote=Notes[i];
         }
      }
      let tags:{value:string,key:string}[]=[]
      let currentExistingTags=JSON.parse(localStorage.getItem("tags")!).ArrTags as {value:string,key:string}[];
      for(let j=0;j<myNote!.noteInfo.relatedTags.length;j++){
        for(let i=0; i<currentExistingTags.length; i++){
          if(currentExistingTags[i].key===myNote!.noteInfo.relatedTags[j]){
              tags.push(currentExistingTags[i])
              break;
          }
         } 
       }
       intial(myNote.noteInfo.relatedTags);
       myNote!.noteInfo.relatedTags=tags;
       return myNote;
    }
    else{
      return null;
    }
  })
  const navToHome=useNavigate()

  const onAdd=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      let currentTags=JSON.parse(localStorage.getItem("notes")!)
      if(isEdit){
           for(let i=0;i<currentTags.ArrNotes.length;i++){
               if(id===currentTags.ArrNotes[i].id){
                currentTags.ArrNotes[i]={id:id,noteInfo:{title:titleRef.current?.value,noteText:noteTextRef.current?.value,relatedTags:current}}
               }
           }
      }
      else{
        let noteId=uuidv4();
        currentTags.ArrNotes.push({id:noteId,noteInfo:{title:titleRef.current?.value,noteText:noteTextRef.current?.value,relatedTags:current}} as Note)    
      }
      localStorage.setItem("notes",JSON.stringify(currentTags))
      return navToHome("/")
  }
  return (
    <form onSubmit={onAdd} className={style.Form}>
        <span className={style.header}>New Note</span>
        <div className={style.fields}>
        <div className={style.title}>
          <span>Note Title</span>
          <input required type="text" ref={titleRef} defaultValue={(selected)?selected.noteInfo.title:""}/>
        </div>
        <div className={style.tags}>
          <span>Select Reference Tags </span>
          <SelectComponent  isPersisted={true} PreSelected={(selected)? selected.noteInfo.relatedTags:[]} />
        </div>
        </div>
        <textarea required placeholder='Write your note' ref={noteTextRef} defaultValue={(selected)?selected.noteInfo.noteText:""} />
        <div className={style.ActionBtns}>
           <input type='submit' value={(isEdit)? "SAVE":"ADD"}/>
           <button onClick={()=>{return navToHome("/")}}>CANCEL</button>
        </div>    
    </form>
  )
}
