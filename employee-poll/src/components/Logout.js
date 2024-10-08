import { useDispatch } from 'react-redux';
import { logout } from '../actions/users';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading  from './common/Loading';

const  Logout= ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(logout());
    navigate('/login'); 
  }, []);
  return (<Loading/>);
}
 
export default Logout;