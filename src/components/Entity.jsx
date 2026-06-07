import { useState, useEffect } from "react"
import missingLogo from '../assets/image-missing.svg'
import EditEntity from './EditEntity'
import { LivesIcon } from "../assets/icon"

export default function Entity({id, data}){
    return (
        <div className={`${data.selected && 'EntitySelected'}`}>
            {data.label && <p className="entityText">{data.label}</p>}
            <div className={`entity ${!data.imgSrc && "missingImage"}`} style={{height: data.size, width: data.size}} onDoubleClick={()=>{data.setOpen(prevopen=>!prevopen);data.setDialogEntityId(id)}}>
                <img src={data.img ? (data.img.startsWith("/api/images/monsters/") ? `https://dnd5eapi.co${data.img}` : data.img) : missingLogo}/>
            </div>
            {data.currHealth && <p className="entityText">{data.currHealth}<LivesIcon/></p>}
        </div>
    )
}