import { useState, useEffect } from "react"
import missingLogo from '../assets/image-missing.svg'
import EditEntity from './EditEntity'

export default function Entity({id, data}){
    const [img,setImg] = useState(null)

    async function loadData(){
        if(!data.url){return}
        const result = await fetch(`https://dnd5eapi.co${data.url}`)
        const data_entity = await result.json()
        setImg(`https://dnd5eapi.co${data_entity.image}`)
    }

    useEffect(()=>{loadData()},[])

    return (
        <div className={`entity ${!data.imgSrc && "missingImage"}`} style={{height: data.size, width: data.size}} onDoubleClick={()=>{data.setOpen(prevopen=>!prevopen);data.setDialogEntityId(id)}}>
            <img src={img===null ? missingLogo : img}/>
        </div>
    )
}