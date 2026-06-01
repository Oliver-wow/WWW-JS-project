import logo from "../assets/page_logo.png"

import { useState } from 'react'

import AddEntity from "./AddEntity"

export default function Header(props){
  const [addEntityOpen, setAddEntityOpen] = useState(false)

  return(
    <header>
      <div className="logoDiv">
        <img id="logo_img" src={logo} width="48px"/>
        <h1>D&D Battle Viewer</h1>
      </div>
      <button onClick={()=>setAddEntityOpen(prevOpen=>!prevOpen)}>Add Entity</button>
      {addEntityOpen && <AddEntity setOpen={setAddEntityOpen} setEditEntityOpen={props.setOpen} nodes={props.nodes} setNodes={props.setNodes} size={props.size} open={addEntityOpen} setDialogEntityId={props.setDialogEntityId}/>}
    </header>
  )
}
