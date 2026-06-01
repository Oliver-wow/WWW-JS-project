import { useEffect, useRef } from "react"
import closeIcon from "../assets/close.svg"

export default function EditEntity(props){
    const { data } = props.nodes[props.entityId]

    console.log(data)

    const dialogRef = useRef(null)

    useEffect(()=>{
        if(!dialogRef.current) return
        if(props.open){
            dialogRef.current.showModal();
        } else{
            dialogRef.current.close()
        }
    },[props.open])

    return(
        <dialog ref={dialogRef} className="EditEntity">
            <img className="closeIcon" src={closeIcon} onClick={()=>{props.setOpen(prevOpen=>!prevOpen)}}/>
            <h2>Edit Entity</h2>
            <img></img>
        </dialog>
    )
}