import { useState, useEffect, useRef } from "react"
import closeIcon from "../assets/close.svg"
import missingLogo from '../assets/image-missing.svg'
import TrashIcon from '../assets/icon'

export default function EditEntity(props){
    console.log(props.nodes, props.entityId)
    const { data } = props.nodes.find(node=>node.id===props.entityId)
    const [entity, setEntity] = useState({})
    const [img, setImg] = useState(data.img)
    const [label, setLabel] = useState(data.label)
    const [currHealth, setCurrHealth] = useState(data.currHealth)
    const [maxHealth, setMaxHealth] = useState(data.maxHealth)
    const [armorClass, setArmorClass] = useState(data.armorClass)
    const [strength, setStrength] = useState(data.strength)
    const [dexterity, setDexterity] = useState(data.dexterity)
    const [constitution, setConstitution] = useState(data.constitution)
    const [intelligence, setIntelligence] = useState(data.intelligence)
    const [wisdom, setWisdom] = useState(data.wisdom)
    const [charisma, setCharisma] = useState(data.charisma)

    const dialogRef = useRef(null)

    useEffect(()=>{ //dialog showing logic
        if(!dialogRef.current) return
        if(props.open){
            dialogRef.current.showModal();
        } else{
            dialogRef.current.close()
        }
    },[props.open])


    useEffect(()=>{
        props.setNodes(prevNodes=>{
            return prevNodes.map(node=>{
                if(node.id === props.entityId){
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            img: img,
                            label: label,
                            currHealth: currHealth,
                            maxHealth: maxHealth,
                            armorClass: armorClass,
                            strength: strength,
                            dexterity: dexterity,
                            constitution: constitution,
                            intelligence: intelligence,
                            wisdom: wisdom,
                            charisma: charisma
                        }
                    }
                }
                else{
                    return node
                }
            })
        })
    },[label, img, currHealth,maxHealth, armorClass, strength, dexterity, constitution, intelligence, wisdom, charisma])

    function deleteNode(){
        props.setNodes(prevNodes=>{
            return prevNodes.filter((node,index)=>index!=prevNodes.indexOf(prevNodes.find(node=>node.id === props.entityId))) // should delete the node that is currently being edited
        })
        props.setOpen(false)
    }

    const [editImg, setEditImg] = useState(false)

    return(
        <dialog ref={dialogRef} className="EditEntity" onCancel={()=>{props.setOpen(false)}}>
            <img className="closeIcon" src={closeIcon} onClick={()=>{props.setOpen(false)}}/>
            <h2>Edit Entity</h2>
            <div className="EditEntityData">
                <div className="EntityTitle">
                    <img height="40px" width="40px" onClick={()=>{if(!data?.url) setEditImg(prevEdit=>!prevEdit)}} src={data.img ? (data.img.startsWith("/api/images/monsters/") ? `https://dnd5eapi.co${data.img}` : data.img) : missingLogo}/>
                    <h2>{data?.url ? data.label : <input value={label} onChange={(e)=>setLabel(e.target.value)}/>}</h2>
                </div>
                {editImg && <input placeholder="link to your custom image" id="EditImg" value={img} onChange={(e)=>setImg(e.target.value)}/>}
                <p>Hit Points: <input value={currHealth} onChange={(e)=>setCurrHealth(e.target.value)}/>/{data?.url ? data.maxHealth : <input min={1} value={maxHealth} onChange={(e)=>setMaxHealth(e.target.value)}/>}</p>
                <p>Armor Class: {data?.url ? data.armorClass : <input value={armorClass} onChange={(e)=>{setArmorClass(e.target.value)}}/>}</p>
                <div className="EditStats">
                    <div>
                        <p>{data?.url ? data.strength : <input value={strength} onChange={(e)=>setStrength(e.target.value)}/>}</p>
                        <p>Strength</p>
                    </div>
                    <div>
                        <p>{data?.url ? data.dexterity : <input value={dexterity} onChange={(e)=>setDexterity(e.target.value)}/>}</p>
                        <p>Dexterity</p>
                    </div>
                    <div>
                        <p>{data?.url ? data.constitution : <input value={constitution} onChange={(e)=>setConstitution(e.target.value)}/>}</p>
                        <p>Constitution</p>
                    </div>
                    <div>
                        <p>{data?.url ? data.intelligence : <input value={intelligence} onChange={(e)=>setIntelligence(e.target.value)}/>}</p>
                        <p>Intelligence</p>
                    </div>
                    <div>
                        <p>{data?.url ? data.wisdom : <input value={wisdom} onChange={(e)=>setWisdom(e.target.value)}/>}</p>
                        <p>Wisdom</p>
                    </div>
                    <div>
                        <p>{data?.url ? data.charisma : <input value={charisma} onChange={(e)=>setCharisma(e.target.value)}/>}</p>
                        <p>Charisma</p>
                    </div>
                </div>
                <div className="EditEntityFooter">
                    {data?.url && <a target="_blank" href={`https://5e.tools/bestiary.html#${data.label + '_mm'}`}>Source to Wiki</a>}
                    <TrashIcon onClick={()=>{deleteNode();console.log(props.nodes)}}/>
                </div>
            </div>
        </dialog>
    )
}