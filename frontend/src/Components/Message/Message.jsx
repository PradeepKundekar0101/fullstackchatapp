import React, { useState,useEffect} from 'react'
import './message.css'
import {format} from 'timeago.js'
export const Message = ({message,own,user,friend}) => {
  const [userProfile, setUserProfile] = useState("");
  const [friendProfile,setFriendProfile] = useState("");
  const fetchUserProfile = async ()=>{
      const myUser = await fetchUser(user)
      setUserProfile(myUser);
      setFriendProfile(await fetchUser(friend));

  }
  const fetchUser = async(user)=>{
      const res = await fetch("http://localhost:5001/api/user/"+user);
      const json = await res.json();
      return json.data.profile;
  }
  useEffect(() => {
    fetchUserProfile();
  }, [])
  
  // console.log(userProfile)
  return (
    <div className={own?'message own':'message'}>
      <div className={own?'messageTop ownTop':'messageTop'}>
        <img className='messageImg' src={ own?userProfile:friendProfile}/>
        <p className='messageText'>{message.text}</p>
      </div>
      <div className="messageBottom">
          {format(message.createdAt)}
      </div>
    </div>
  )
}
