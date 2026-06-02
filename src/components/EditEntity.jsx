import { useState, useEffect, useRef } from "react"
import closeIcon from "../assets/close.svg"
import missingLogo from '../assets/image-missing.svg'

export default function EditEntity(props){
    const { data } = props.nodes[props.entityId]
    const [entity, setEntity] = useState({})
    const [currHealth, setCurrHealth] = useState(1)
    const [maxHealth, setMaxHealth] = useState(1)
    const [armorClass, setArmorClass] = useState(1)
    const [strength, setStrength] = useState(1)
    const [dexterity, setDexterity] = useState(1)
    const [constitution, setConstitution] = useState(1)
    const [intelligence, setIntelligence] = useState(1)
    const [wisdom, setWisdom] = useState(1)
    const [charisma, setCharisma] = useState(1)

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
        async function GetData(){
            if(!data.url){return}
            const result = await fetch(`https://dnd5eapi.co${data.url}`)
            const data_entity = await result.json()
            setEntity(data_entity)
            console.log(data_entity)
        }
        GetData()
    },[props.open])

    useEffect(()=>{
        console.log(currHealth,maxHealth, armorClass, strength, dexterity, constitution, intelligence, wisdom, charisma)
    //     props.setNodes(prevNodes=>{
    //         return prevNodes.map(node=>{
    //             return {
    //                 ...node,
    //                 data: {
    //                     ...node.data,
    //                     currHealth: currHealth,
    //                     maxHealth: maxHealth,
    //                     armorClass: armorClass,
    //                     strength: strength,
    //                     dexterity: dexterity,
    //                     constitution: constitution,
    //                     intelligence: intelligence,
    //                     wisdom: wisdom,
    //                     charisma: charisma
    //                 }
    //             }
    //         })
    //     })
    },[currHealth,maxHealth, armorClass, strength, dexterity, constitution, intelligence, wisdom, charisma])

    return(
        <dialog ref={dialogRef} className="EditEntity" onCancel={()=>{props.setOpen(prevOpen=>!prevOpen)}}>
            <img className="closeIcon" src={closeIcon} onClick={()=>{props.setOpen(prevOpen=>!prevOpen)}}/>
            <h2>Edit Entity</h2>
            <div className="EditEntityData">
                <div className="EntityTitle">
                    <img height="40px" width="40px" src={entity.image ? `https://dnd5eapi.co${entity.image}` : missingLogo}/>
                    <h2>{entity.name}</h2>
                </div>
                <p>Hit Points: <input type="number" value={currHealth} onChange={(e)=>setCurrHealth(Number(e.target.value))}/>/{entity.hit_points ? entity.hit_points : <input type="number" min={1} value={maxHealth} onChange={(e)=>setMaxHealth(Number(e.target.value))}/>}</p>
                <p>Armor Class: {entity?.armor_class?.[0]?.value ? entity?.armor_class?.[0]?.value : <input type="number" value={armorClass} onChange={(e)=>{setArmorClass(Number(e.target.value))}}/>}</p>
                <div className="EditStats">
                    <div>
                        <p>{entity?.strength || <input type="number" value={strength} onChange={(e)=>setStrength(Number(e.target.value))}/>}</p>
                        <p>Strength</p>
                    </div>
                    <div>
                        <p>{entity?.dexterity || <input type="number" value={dexterity} onChange={(e)=>setDexterity(Number(e.target.value))}/>}</p>
                        <p>Dexterity</p>
                    </div>
                    <div>
                        <p>{entity?.constitution || <input type="number" value={constitution} onChange={(e)=>setConstitution(Number(e.target.value))}/>}</p>
                        <p>Constitution</p>
                    </div>
                    <div>
                        <p>{entity?.intelligence || <input type="number" value={intelligence} onChange={(e)=>setIntelligence(Number(e.target.value))}/>}</p>
                        <p>Intelligence</p>
                    </div>
                    <div>
                        <p>{entity?.wisdom || <input type="number" value={wisdom} onChange={(e)=>setWisdom(Number(e.target.value))}/>}</p>
                        <p>Wisdom</p>
                    </div>
                    <div>
                        <p>{entity?.charisma || <input type="number" value={charisma} onChange={(e)=>setCharisma(Number(e.target.value))}/>}</p>
                        <p>Charisma</p>
                    </div>
                </div>
                {entity.name && <a target="_blank" href={`https://5e.tools/bestiary.html#${entity.name + '_mm'}`}>Source to Wiki</a>}
            </div>
        </dialog>
    )
}