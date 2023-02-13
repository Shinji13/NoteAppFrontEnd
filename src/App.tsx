import { Route, Routes ,Navigate,Router } from "react-router"
import Home from "./Pages/Home/Home"
import NewOrEdit from "./Pages/NewOrEdit/Neworedit"
import ShowNote from "./Pages/ShowNote/ShowNote"



localStorage.setItem("tags",(localStorage.getItem("tags"))||`{
   "ArrTags":[]
}`)
localStorage.setItem("notes",(localStorage.getItem("notes"))||`{
   "ArrNotes":[]
}`)

export type Note={
   noteInfo:RawNote,
   id:string,
 }
export type RawNote={
     title:string,
     noteText?:string,
     relatedTags:string[];
 }


function App() {
  return (
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new" element={<NewOrEdit isEdit={false}/>}/>     
        <Route path="/note/:id" >
           <Route index element={<ShowNote/>}/>
           <Route path="edit" element={<NewOrEdit isEdit={true}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
     </Routes>
  )
}

export default App

