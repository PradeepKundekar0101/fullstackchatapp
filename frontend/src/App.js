import './App.css';
import {Route,Routes} from "react-router-dom";
import Home from './Components/Home';
import Chat from './Components/Chats/Chat';
import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/register' element={<Signup/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
