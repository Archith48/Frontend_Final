import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Server() {

    const user_id="106054907602357766738";
 
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5050/users/${user_id}`)
        .then(res=>res.json())
        .then(data=>{
          setData(data)
          console.log(data)
          //console.log(data.length)
        })
     },[])
     
  return(
    <>
    <div>
      <ul>          
{/*         {data.map(post => (
          <ul key={post.Id}>{post.displayName}</ul>
        ))} */}
        {JSON.stringify(data.length)}<br></br>
        {JSON.stringify(data.Id)}<br></br>
      </ul>
    </div>
    </>
  )
}
export default Server;