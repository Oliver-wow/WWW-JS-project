import logo from "../assets/page_logo.png"
import { useState } from 'react'
import AddEntity from "./AddEntity"

export default function Header(props){
  const [addEntityOpen, setAddEntityOpen] = useState(false)

  function cleanNodes(){
    props.setNodes(prevNodes=>{
      return prevNodes.map(node=>{
        return {
          ...node,
          data:{
            ...node.data,
            selected: false
          }
        }
      })
    })
  }

  return(
    <header>
      <div className="logoDiv">
        <img id="logo_img" src={logo} width="48px"/>
        <h1>D&D Battle Viewer</h1>
      </div>
      {!props.disabled && <button onClick={()=>setAddEntityOpen(prevOpen=>!prevOpen)}>Add Entity</button>}
      {props.disabled && <button onClick={()=>{props.setPlayingIndex(0);props.setEntityOrder([]);cleanNodes()}}>End Battle</button>}
      {addEntityOpen && <AddEntity setOpen={setAddEntityOpen} setEditEntityOpen={props.setOpen} nodes={props.nodes} setNodes={props.setNodes} size={props.size} open={addEntityOpen} setDialogEntityId={props.setDialogEntityId}/>}
    </header>
  )
}
