import React from 'react'
import './modal.css'
import { useState } from 'react';
const Modal = (props) => {
    const [userName,setUserName] = useState("");
    const [users,setUsers] = useState([]);
    if(!props.show)
     return;
    const getAllUsersWithName=async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/user/allusers/"+userName);
            const json = await res.json();
            setUsers(json.data);    
        } catch (error) {
            alert(error.message);
        }
    }
    const addConversation=async (e)=>{
        const res = await fetch("http://localhost:5001/api/conversation",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                "senderId":localStorage.getItem("userId"),
                "receiverId":e.target.value
            })
        })
        const json = await res.json();
        console.log(json);
    }
  return (
    <div className='modal'>
        <div className="modal-content">
            <div className="modal-header">
                <h4>Search for your friends</h4>
                {/* <button className="button"><i className="fa-solid fa-xmark"></i></button> */}
            </div>
            <div className="modal-body">
            <div className="container">
                <div className="inputs">
                    <form onSubmit={getAllUsersWithName}>
                    <input
                        type="text" 
                        value={userName}
                        onChange={(e)=>{setSearchUserName(e.target.value)}}
                        required
                    />
                    <label>Username</label>
                    <input
                        type="submit"
                        value="Search"
                    />
                    </form>
                </div>
            </div>
            </div>
            <div className="modal-footer">
               {searchedusers.map((e,i)=>{
                    return <div className='foundUsers'>
                            <div className="left">
                            <img src={e.profile}/>
                            <p>{e.username}</p>
                            </div>
                            <div className="right">
                            <button className="button" value={e._id} onClick={addConversation}><i className="fa-solid fa-plus"></i> Add User</button>
                            </div>
                        </div>
               })}
            </div>
        </div>
    </div>
  )
}

export default Modal