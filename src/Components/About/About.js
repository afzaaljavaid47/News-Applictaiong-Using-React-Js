import React, { useEffect } from 'react'

export default function About() {
  const [value,setValue]=React.useState();

  useEffect(()=>{
    console.log("Hello world");
  },[value])
  
  return (
    <div>
   <h3>About us page</h3>   
    </div>
  )
}
