import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);  
    useEffect(() => {
       if(!user?.id){
        navigate('/login')
       }
      }, []);
    return (
        <div>
             <nav>
                <Link to={'/'}  className='menu-item'>Home</Link>
                <Link to={'/leaderboard'}  className='menu-item'>Leaderboard</Link>
                <Link to={'/new'}  className='menu-item'>New</Link>
                <div className="nav-right-items">
                    <div className="user-info">
                        <img src={user.avatarURL} className="user-avatar" alt="avatar" /> 
                        <span>{user.name} </span>
                    </div>
                <Link to={'/logout'}  className='menu-item'>Logout</Link>
                </div>
            </nav>
            {children} 
        </div>
  );
};
 
export default Navigation;