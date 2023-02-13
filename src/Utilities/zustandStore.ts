import create from 'zustand'

type Tag={value:string,key:string};
interface SelectedTags{
    Current:string[],
    push:(newvalue:string)=>void,
    pop:(index :number)=>void,
    reset:()=>void,
    intial:(Arr:string[])=>void
}
export const useSelectedTag = create<SelectedTags>((set,get) => ({
   Current :[],
   push:(newvalue:string)=>{
       let arr:string[]=get().Current ;
       arr.push(newvalue)
       set({Current:[...arr]})
   },
   pop:(index:number)=>{
       let arr:string[]=get().Current ;
       arr.splice(index,1)
       set({Current:[...arr]})
   },
   reset:()=>{
    set({Current:[]})
   },
   intial:(Arr:string[])=>{
        set({Current:[...Arr]})
   }
}))