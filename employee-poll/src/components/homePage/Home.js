import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Home.css";
import {handleGetAllQuestions} from '../../actions/questions'
import Loading  from '../common/Loading';
import QuestionCard  from './QuestionCard';

const Home = () => {
  const dispatch = useDispatch(); 
  const user = useSelector(state => state.user);  
  const questions = useSelector(state => state.questions);  

  useEffect(() => {
    dispatch(handleGetAllQuestions());
  }, []);
  
  return (
    <div className="App">
      <div className="section">
        <h2>New Questions{questions?.length}</h2>
        <div className="card-container">
        {questions && questions.length>0?(questions
          .filter(x=>!x.optionOne.votes.includes(user.id) && !x.optionTwo.votes.includes(user.id))
          .map(x=>
            <QuestionCard 
              username={x.author} 
              timestamp={x.timestamp} 
              questionId={x.id}
              key={x.id} />
          )):(<Loading/>)}
        </div>
      </div>
      <div className="section">
        <h2>Done</h2>
        <div className="card-container">
        {questions && questions.length>0?(questions
          .filter(x=>x.optionOne.votes.includes(user.id) || x.optionTwo.votes.includes(user.id))
          .map(x=>
            <QuestionCard 
            username={x.author} 
            timestamp={x.timestamp} 
            questionId={x.id}
            isSelected={true} 
            key={x.id} />
          )):(<Loading/>)}
        
        </div>
      </div>
    </div>
  );
};

export default Home;