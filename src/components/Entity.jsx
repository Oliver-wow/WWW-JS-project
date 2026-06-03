import { useState, useEffect } from "react"
import missingLogo from '../assets/image-missing.svg'
import EditEntity from './EditEntity'

export default function Entity({id, data}){
    return (
        <div className={`entity ${!data.imgSrc && "missingImage"}`} style={{height: data.size, width: data.size}} onDoubleClick={()=>{data.setOpen(prevopen=>!prevopen);data.setDialogEntityId(id)}}>
            <img src={data.img ? (data.img.startsWith("/api/images/monsters/") ? `https://dnd5eapi.co${data.img}` : data.img) : missingLogo}/>
        </div>
    )
}