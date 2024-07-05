import React,{useEffect,useState} from "react";



export default function ContentModal({children,open,id,onClose}){
    if(!open)return null
    return(
        <>
        <div >
        <div>{children}</div>
        <button onClick={onClose}>close</button>
        </div>
        </>
    )
}