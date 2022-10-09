import { useState,useEffect } from "react";

import React from 'react'

const useWindowssize = () => {
    const [windowssize,setWindowsSize] = useState({width:undefined,height:undefined})
    

    useEffect(()=>{
        
      const handleResize = ()=>{
        setWindowsSize({
            width:window.innerWidth,
            height:window.innerHeight
        })
      }
       
      handleResize()

      window.addEventListener("resize",handleResize)


      return ()=>window.removeEventListener("resize",handleResize)


    },[])

    return windowssize
}

export default useWindowssize
