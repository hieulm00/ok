import "./Leaderboard.css";
import * as _DATA from '../../_DATA';
import {useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading  from '../common/Loading';
const Leaderboard = () => {
  const navigate = useNavigate();
  const [users,setUsers]=useState([]);

  useEffect(() => {
    GetAllUser().then((result) => {
      setUsers(Object.entries(result).map(([key, value]) => (value))
      .sort((b,a)=>(a.questions.length+Object.keys(a.answers).length)-(b.questions.length+Object.keys(b.answers).length) ));
      setTimeout(() => {
        console.log(users);
    }, 5000); // 3000 milliseconds = 3 seconds
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

const GetAllUser=async()=>{
  return await _DATA._getUsers();
}
  
return (
  <div className="container">
    <h1 className="title">Leaderboard</h1>
    {users.length > 0 ? (
      <>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="header">Users</th>
              <th className="header">Answered</th>
              <th className="header">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="userCell">
                  <img
                    src={user.avatarURL}
                    alt={user.name}
                    className="avatar"
                  />
                  {user.name}
                </td>
                <td className="cell">{Object.keys(user.answers).length}</td>
                <td className="cell">{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <Loading />
    )}
  </div>
);
};
 
export default Leaderboard;
 