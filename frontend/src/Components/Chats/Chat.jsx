import { useState,useEffect,useRef } from 'react'
import Conversation from '../Conversation/Conversation';
import { Message } from '../Message/Message';
import './chat.css'
import {io} from 'socket.io-client'

const Chat = () => {
  const [user, setUser] = useState();
  const [conversation,setConversation] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const [message,setMessage] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const [show,setShow] = useState(false);
  const [friendId,setFriendId]=useState("");
  const [currentUser, setCurrentUser] = useState(-1);
  const socket = useRef();  
  const scrollRef = useRef();

  const [closing,setClosing] = useState(false);
  useEffect(() => {
    socket.current = io("ws://localhost:8901");
    socket.current.emit("addUser", localStorage.getItem("userId"));
    socket.current.on("getUsers", (users) => {
      // console.log(users)
    });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  // useEffect(() => {
   
  // },[user]);
  useEffect(() => {
    setUserId();
    fetchConversation();
  }, []);

 
  
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);



  useEffect(() => {
    const fetchMessages=async()=>{
            const data = await fetch(`http://localhost:5001/api/message/${currentChat?._id}`);
            const json = await data.json();
            setMessage(json.data);
    }
    fetchMessages();
   },[currentChat])
   
   //Scroll
   useEffect(() => {
    scrollRef.current?.scrollIntoView({
        behavior:"smooth"
    })
   }, [message])
   

   //Whenever We add a new Conversation through search
   useEffect(() => {
      fetchConversation();
   }, [conversation])
   
  const setUserId =  ()=>{
    const userId = localStorage.getItem("userId");
    if(userId)
        setUser(userId);
    else
      window.location.href="/login";
  }
  
  const fetchConversation = async()=>{
      const data = await fetch(`http://localhost:5001/api/conversation/${localStorage.getItem("userId")}`);
      const json = await data.json();
      setConversation(json.data);
     
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
  
    const bodydata = {
        senderId: user,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== localStorage.getItem("userId")
      );
      socket.current.emit("sendMessage",{
        senderId:localStorage.getItem("userId"),
        receiverId,
        text:newMessage,
      })
    const data = await fetch("http://localhost:5001/api/message",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(bodydata)
    });
    const json = await data.json();
    setMessage([...message,json.data])
    setnewMessage("");
  }
  // -------------------------
  //Search Modal Methods
  const [userName,setUserName] = useState("");
  const [searchedUsers,setSearchedUsers] = useState([]);
   
    const getAllUsersWithName=async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/user/allusers/"+userName);
            const json = await res.json();
            setSearchedUsers(json.data);    
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
        const json = await res.json() ;
    
    }
   
    const alreadyInConversation=(user)=>{
        conversation.forEach((e,i)=>{
          if(e.members.includes(user))return true;
        })
        return false;
    }
 
  return (
    <>  
     {
      show && <div className='modal'>
      <div className={!closing?"modal-content scale-in-ver-center":"modal-content scale-out-vertical"}>
          <div className="modal-header">
              <h4>Search for your friends</h4>
              <button className="button" onClick={()=>{ setClosing(true); setTimeout(()=>{setClosing(false);setShow(false)},800)}}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="modal-body">
          <div className="modal-container">
              <div className="inputs">
                  <form onSubmit={getAllUsersWithName}>
                  <input
                      type="text" 
                      value={userName}
                      onChange={(e)=>{setUserName(e.target.value)}}
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
             {searchedUsers.map((e,i)=>{  
                
                  return <div className='foundUsers'>
                          <div className="left">
                          <img src={e.profile}/>
                          <p>{e.username}</p>
                          </div>
                          <div className="right">
                          <button 
                              className="button" 
                              value={e._id}  
                              onClick={addConversation}
                              style={
                                alreadyInConversation(e._id)?{
                                    cursor:"default",
                                    background:"#fff"
                                }:{
                                  
                                }
                              }
                          >
                          <i className="fa-solid fa-plus"></i> Add User</button>
                          </div>
                      </div>
             })}
          </div>
      </div>
    </div>
  
     }
     
          <div className="nav">
              <h3>Talk-Verse</h3>
              <button onClick={()=>{
                localStorage.removeItem("userId"); window.location.reload();
              }}>Log out <i className="fa-solid fa-right-from-bracket"></i></button>
          </div>
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
    
                    <button 
                      onClick={()=>{setShow(true)}} 
                      className='searchBtn'>  
                      Search  <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                 
                    {
                        conversation.map((e,i)=>(
                            <div 
                              key={i} 
                              onClick={()=>{
                              setCurrentChat(e);
                              setFriendId(e.members.find(e=> e!=user))
                              setCurrentUser(i)
                              }
                              }
                              >
                                <Conversation key={i} myUserId={user} friendId={e.members.find(e=> e!=user)} currentConversation={i===currentUser} ></Conversation>
                            </div>
            
                    ))}
                </div>  
            </div>
            <div className="chatBox">
                {currentChat?
                <>
                <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    {
                        message.map((e,i)=>{
                            return <div key={i} ref={scrollRef}>
                                <Message 
                                  key={i} 
                                  message={e} 
                                  own={e.senderId===user} 
                                  user={user} 
                                  friend={friendId}
                                  />
                            </div>
                        })
                    }
                </div>
                <div className="chatBoxBottom">
                    <textarea 
                        className='chatBoxBottomInput' 
                        placeholder='Type a message...'
                        onChange={(e)=>{setnewMessage(e.target.value)}}
                        value={newMessage}
                    />
                    <button 
                        className='chatSubmitButton'
                        onClick={handleSubmit}
                    >Send</button>
                </div>
            </div>
            </>:<span className='openConversation'>Open a conversation</span>
                }
                
            </div>
           
        </div>  
    </>
  )
}

export default Chat