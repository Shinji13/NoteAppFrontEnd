import React, { useState } from 'react'
import style from "./edittags.module.css"

export default function EditTags({SetAppearence}:{SetAppearence : (value: boolean | ((prevVar: boolean) => boolean)) => void}) {
    const [Alltags,EditTags]=useState(()=>{
        let currentExistingTags=JSON.parse(localStorage.getItem("tags")!).ArrTags as {value:string,key:string}[];
        return currentExistingTags;
    })

    const deleteHandler=(e:React.MouseEvent<HTMLSpanElement>)=>{
         let index=e.currentTarget.parentElement!.dataset.index as string;
         Alltags.splice(+index,1);
         EditTags([...Alltags]);
    }

    const updateHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
           let newvalue=e.currentTarget.value;
           let index=e.currentTarget.parentElement!.dataset.index as string;
           Alltags[+index]={value:newvalue,key:Alltags[+index].key};
           EditTags([...Alltags])
    }
    const Submithandler=(e:React.MouseEvent<HTMLButtonElement>)=>{
      let newtags={
        ArrTags:Alltags,
      }
      localStorage.setItem("tags",JSON.stringify(newtags));
      SetAppearence(false)
      window.location.reload() ;
    }
    
  return (
    <div className={style.editback}>
    <div className={style.edit}>
        <div>
           <span>Edit Tags</span>
          <i className="fa-solid fa-xmark" onClick={()=>{SetAppearence(false)}}></i>
        </div>
        <div className={style.Tags} >
         {Alltags.map((el,idx)=><div className={style.tag} data-index={idx} key={el.key}><input type="text" value={el.value}   onChange={updateHandler}/><span onClick={deleteHandler}><i className="fa-solid fa-trash-can"  ></i></span></div>)  }
        </div>
        <button onClick={Submithandler}>Save</button>
    </div>
    </div>
  )
}
