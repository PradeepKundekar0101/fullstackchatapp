import  React from 'react';
import { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange=(e)=>{
          setEmail(e.target.value);
    }
    useEffect(() => {
        if(localStorage.getItem("userId"))
        {
            window.location.href='/chat'
        }
    }, [])
    
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
      
        const data = await fetch("http://localhost:5001/api/user/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const jsonData = await data.json();
        console.log(jsonData)
        if(jsonData.success)
        {
            
            localStorage.setItem("userId",jsonData.data);
            toastSuccess();
            window.location.href="/chat"
        }
        else{
            toastError("Invalid credentials");
        }
    }
    const toastSuccess=()=>{
        toast.success('Login Successful', {
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
    <div className='container'>
        <div className='form'>
            <div className='left'>

            </div>
            <div className='right'>
                <h1 className='heading'>Login</h1>
                <form method='post' onSubmit={handleSubmit}>
                    <div className='inputBox'>
                    <i className="fa-solid fa-user" id="user"></i>
                        <input type="email" name='email' value={email} onChange={handleEmailChange}  placeholder='Email'/>
                    </div>

                    <div className='inputBox'>
                    <i className="fa-solid fa-lock"></i>
                        <input type="password" placeholder='Password' name='password' value={password}onChange={handlePasswordChange}   />
                    </div>
                        <input type="submit" value="Login"/>
                </form>
                <p>Don't have an Account? <button  className='link' onClick={()=>{window.location.href="/register"}}>Create an account</button></p>
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
export default Login