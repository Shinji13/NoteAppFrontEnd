import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import style from "./select.module.css"
import { useSelectedTag } from '../../Utilities/zustandStore';

type Tag={value:string,key:string};

const GetDefaultTags=(PreSelected)=>{
    let currentExistingTags=JSON.parse(localStorage.getItem("tags")!).ArrTags as Tag[];
    return currentExistingTags.filter((el)=>{
        let accepted=true;
        for(let i=0;i<PreSelected.length;i++){
           if(PreSelected[i].key===el.key){
            accepted=false;
            break;
           }
        }
        return accepted;
    }); 
  }

export default function SelectComponent({isPersisted,PreSelected}:{isPersisted:boolean,PreSelected:Tag[]}) {
  const [options,SetOptions]=useState<Tag[]>(()=>GetDefaultTags(PreSelected));
  const [SelectedTags,SetTags]=useState<Tag[]>([...PreSelected])
  const [ShowOptions,ToggleOptions]=useState<boolean>(false)
  const addtagRef=useRef<HTMLInputElement>(null);
  const [push,pop,reset]=useSelectedTag((state)=>[state.push,state.pop,state.reset])
   useEffect(()=>{
     return ()=>{
      reset()
      }
   },[])
  
  const ShowHandle=(e:React.MouseEvent<HTMLDivElement>)=>{
    if(e.currentTarget.id!=="anchor"){
        ToggleOptions((prev)=>{
            return (prev)? false:true;
         })
    }
   
  }
  const addNewTag=(e:React.MouseEvent<HTMLElement>)=>{
     let value=addtagRef.current!.value;
     addtagRef.current!.value="";
     let currentTags=JSON.parse(localStorage.getItem("tags")!) 
     let exits =currentTags.ArrTags.reduce((acc,element)=>{
         return (element.value===value)||acc
     },false)
     if(value!==""&&!exits){      
        let key=uuidv4()
        currentTags.ArrTags.push({value:value,key:key})
        localStorage.setItem("tags",JSON.stringify(currentTags))
        SetOptions([...options,{value:value,key:key}])
     }
     }
     
  const selectTag=(e:React.MouseEvent<HTMLSpanElement>)=>{
      let index =e.currentTarget.dataset.optindex as string;
      SetTags([...SelectedTags,options[index]])  
      SetOptions((prev)=>{
        let arr=prev;
        arr.splice(+index,1)
        return arr
      })
        
      push(options[index].key)
  }
  
  const removeTags=(e:React.FormEvent<HTMLElement>)=>{
     let index=e.currentTarget.parentElement?.dataset.tagindex as string;
     SetOptions([...options,SelectedTags[+index]])
     SetTags((prev)=>{
        prev.splice(+index,1);
        return prev
     })
     pop(+index)
  }

  const OptionsComp=<div id='opt' className={style.options}>{ (isPersisted)? <div className={style.add}><input type="text" ref={addtagRef} placeholder="Add new tag"/><span onClick={addNewTag}><i className="fa-solid fa-plus" ></i></span></div> : null}{(options.length===0)?null:<div className={style.tags}  >{options.map((element,index)=>{  return <span key={element.key} data-optindex={index} onClick={selectTag}><span>{element.value}</span></span> })}</div>}</div>
  const SelectedComp=<div id='slc' className={style.select} style={{cursor:"pointer"}} onClick={ShowHandle}>{SelectedTags.map((element,index)=>{  return <div  key={element.value+Math.random()} data-tagindex={index}><span>{element.value}</span><i className="fa fa-window-close " id='anchor' aria-hidden="true" onClick={removeTags}></i></div>})}</div>
   

  return (
    <div id="cp" className={style.comp}>
        {
        SelectedComp
       }
         {(ShowOptions)? OptionsComp:null}   
    </div>
  )
}
