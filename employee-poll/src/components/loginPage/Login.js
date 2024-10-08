import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllUsers, loginByUser } from '../../actions/users';
import { handleGetAllQuestions } from '../../actions/questions';
import {useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading  from '../common/Loading';
import "./Login.css";
const  Login= ()=> {

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const users = useSelector(state => state.users);  
  const [userId,setUserId]=useState('');
  const [password,setPassword]=useState('');
  useEffect(() => {
    dispatch(handleGetAllUsers());
    dispatch(handleGetAllQuestions());
  }, []);

const selectUser=(event)=>{
  const user=users.find(x=>x.id===event.target.value);

  if(user){
    setUserId(user.id);
    setPassword(user.password);
  }
}
const Login = ()=>{
  if(userId&&password){
    const currentUser=users.find(x=>x.id===userId);
    if(currentUser&&currentUser.password===password){
      dispatch(loginByUser(currentUser))
      navigate('/'); 
    }else{
      alert('username or password incorrect please try again !!!');
    }
  }else{
    alert('please enter username and password and try again !!!');
  }
    
}
  return (
    <div className="container">
     {users.length>0?(<><h1>Employee Polls </h1>
      <div className="image-container">
        <img
          src='/img/login.webp '
          alt="Employee Polls"
          className="login-image"
        />
      </div>
      
      <h2>Log In</h2>
      <select className="custom-dropdown" onChange={selectUser} defaultValue="none">
        <option value="none" disabled className="center-option">
          -- Select an option --
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id} >
            {user.id}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
      <p className="notice">The login functionality will be implemented soon. Please use dropdown to login now</p>
        <div className="input-group">
          <input 
          type="text" 
          placeholder="User" 
          className="input-field"  
          value={userId}
          onChange={(e)=>setUserId(e.target.value)}/>
        </div>
        <div className="input-group">
          <input 
          type="password" 
          placeholder="Password" 
          className="input-field" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn" onClick={Login}>
          Submit
        </button>
       
        </>) :(<Loading/>)}
    </div>
  );
}
 
export default Login;