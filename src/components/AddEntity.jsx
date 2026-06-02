import { useEffect, useState, useRef } from "react";
import closeIcon from "../assets/close.svg"

export default function AddEntity(props){
    const [entityTypes,setEntityTypes] = useState([])
    const [selectedType, setSelectedType] = useState("-")

    const dialogRef = useRef(null)
    
    useEffect(()=>{
        if(!dialogRef.current) return
        if(props.open){
            dialogRef.current.showModal();
        } else{
            dialogRef.current.close()
        }
    },[props.open])

    useEffect(()=>{
        async function loadTypes(){
            const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters')
            const data = await response.json()
            data.results = [{index: "custom-player", name: "Custom / Player", url:""}, ...data.results]
            setEntityTypes(data.results)
        }
        loadTypes()
    },[])

    return(
        <dialog ref={dialogRef} className="AddEntity" onCancel={()=>{props.setOpen(false)}}>
            <img className="closeIcon" src={closeIcon} onClick={()=>{props.setOpen(false)}}/>
            <h2>Add Entity</h2>
            <div>
                <label>Entity Type:</label>
                <br/>
                <select value={selectedType} onChange={e=> setSelectedType(e.target.value)}>
                    <option value='-'>-</option>
                    {entityTypes.map(e=><option key={e.index} value={e.name}>{e.name}</option>)}
                </select>
            </div>
            <button disabled={selectedType==="-"} onClick={async ()=>{
                let data;
                if(entityTypes.find(e=>e.name===selectedType).url){
                    const result = await fetch(`https://dnd5eapi.co${entityTypes.find(e=>e.name===selectedType).url}`)
                    data = await result.json()
                }
                props.setNodes((prevnodes)=>[
                    ...prevnodes,
                    {id: prevnodes.length.toString(), 
                    position: {x: 0, y: 0}, 
                    data: {
                        label: selectedType, 
                        url: entityTypes.find(e=>e.name===selectedType).url,
                        img: data?.image || "",
                        size: props.size, 
                        setOpen: props.setEditEntityOpen,
                        setDialogEntityId: props.setDialogEntityId,
                        currHealth: data?.hit_points || "",
                        maxHealth: data?.hit_points || "",
                        armorClass: data?.armor_class?.[0]?.value || "",
                        strength: data?.strength || "",
                        dexterity: data?.dexterity || "",
                        constitution: data?.constitution || "",
                        intelligence: data?.intelligence || "",
                        wisdom: data?.wisdom || "",
                        charisma: data?.charisma || "",
                    }, 
                    type: 'entity', 
                    measured: {
                        width: props.size, 
                        height: props.size
                }}])
                props.setOpen(false)
                }}
                >Add To Battle</button>
        </dialog>
    )
}