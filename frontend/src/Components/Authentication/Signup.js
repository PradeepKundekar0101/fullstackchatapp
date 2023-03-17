import React from 'react'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const[loading,setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [profile, setProfile] = useState("");
  const handleUserNameChange=(e)=>{
    setUserName(e.target.value);
  }
  const handleEmailChange=(e)=>{
      setEmail(e.target.value);
  }
  const handlePasswordChange=(e)=>{
      setPassword(e.target.value);
  }
  const handleCPasswordChange=(e)=>{
    
    setCPassword(e.target.value);
  }
  const postDetails=async (pic)=>{
    setLoading(true);
    if(pic===undefined)
    {
      toastError("Please Select a profile picture");
      return;
    }
    if(pic.type==="image/jpeg" || pic.type==="image/png")
    {
        const data = new FormData();
        data.append("file",pic);
        data.append("upload_preset","chat-app");
        data.append("cloud_name","dmw8b1n3r");
        const res = await fetch("https://api.cloudinary.com/v1_1/dmw8b1n3r/image/upload",{
          method:"POST",
          body:data
        });
        const json = await res.json();
        console.log(json);
        setProfile(json.url.toString());
        setLoading(false);  
    }
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
      if(loading){
        toastError("Profile upload in process");
        return;
      }
      if(username==="")
      {
        toastError("User name cannot be blank");
        return;
      }
      if(email==="")
      {
        toastError("Email cannot be blank");
        return;
      }
      if(password!=cpassword)
      {
        toastError("Password and confirm password are not mathching");
        return;
      }
      console.log(username,email,password);
      const data = await fetch("http://localhost:5001/api/user/register",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify({username,email,password,profile}),
      });
      const jsonData = await data.json();
      console.log(jsonData);
      if(jsonData.success)
      {
          toastSuccess();
      }
      else{
        toastError(jsonData.data);
      }
  }
  const toastSuccess=()=>{
    toast.success('Account created succesfully!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  const toastError=(message)=>{
    toast.error(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  return (
    <div className='container registercontainer'>
    <div className='form'>
        <div className='left leftregister'>
        </div>
        <div className='right'>
            <h1 className='heading'>Create an Account</h1>
            <form onSubmit={handleSubmit}>
            <div className='inputBox'>
                <i className="fa-solid fa-user" id="user"></i>
                    <input type="text" placeholder='User Name' value={username} onChange={handleUserNameChange} />
                </div>
                <div className='inputBox'>
                <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder='Email' value={email} onChange={handleEmailChange}/>
                </div>

                <div className='inputBox'>
                <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
                </div>
                <div className='inputBox'>
                <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Confirm Password' value={cpassword} onChange={handleCPasswordChange}/>
                </div>
                <div className='inputBox'>
                <i className="fa-solid fa-image"></i>

                  <input type="file" onChange={(e)=>{postDetails(e.target.files[0])}} name="photo" id="upload-photo" />
                  <img
                    width="25"
                    height="25"
                    style={ loading? {display:"inline"}:{display:"none"} }
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  />
                </div>
                    <input type="submit" value="Register"/>
        
            </form>
            <p>Already have an Account? <button  className='link' onClick={()=>{window.location.href="/login"}}>Sign in</button></p>
        </div>
    </div>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
</div>
  )
}

export default Signup