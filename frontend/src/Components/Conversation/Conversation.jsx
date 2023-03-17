import React from 'react'
import { useState,useEffect } from 'react';
import './conversation.css'
const Conversation = ({myUserId,friendId,currentConversation}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
      const fetchUser = async ()=>{
          const data = await fetch("http://localhost:5001/api/user/"+friendId);
          const json =  await data.json();
          setUser(json.data);
      }
      fetchUser();
  }, [])

  return (
    <div  className={ !currentConversation?'conversation':'conversation currentuser'}>
        <img src={user?.profile} className='conversationImg' alt="" />
        <span className='conversationName'> {user?.username} </span>
    </div> 
  )
}

export default Conversation 