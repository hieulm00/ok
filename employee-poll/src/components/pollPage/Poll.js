import React from 'react';
import { Provider, connect, useSelector, useDispatch } from 'react-redux';
import "./Poll.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSelectAnswer } from '../../actions/questions';
import { handleGetAllUsers, loginByUser } from '../../actions/users';
import { handleGetAllQuestions } from '../../actions/questions';
const Poll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { questionId } = useParams(); 
  const user = useSelector(state => state.user);  
  const users = useSelector(state => state.users);  
  const questions = useSelector(state => state.questions);  
  const [question,setQuestion]=useState({});
  const [questionAuthor,setQuestionAuthor]=useState({});
  const [answer,setAnswer]=useState('');
  const [optionOneVote,setOptionOneVote]=useState(0);
  const [optionTwoVote,setOptionTwoVote]=useState(0);
  const [totalVote,setTotalVote]=useState(0);
  useEffect(() => {
    const currentQuestion=questions.find(x=>x.id===questionId);
    const currentQuestionAuthor=users.find(x=>x.id===currentQuestion?.author);

    if(!currentQuestion){
      navigate('/not-found'); 
    }
    // console.log(user)
    if(user?.answers&&user.answers[questionId]){
      setAnswer(user.answers[questionId]);
    }
    setQuestionAuthor(currentQuestionAuthor);
    setQuestion(currentQuestion);
    // console.log(currentQuestion.optionOne.votes.length)
    setOptionOneVote(currentQuestion.optionOne.votes.length);
    setOptionTwoVote(currentQuestion.optionTwo.votes.length);
    setTotalVote(currentQuestion.optionOne.votes.length+currentQuestion.optionTwo.votes.length);
  }, []);

  const selectAnswer= (option)=>{
    dispatch(
      handleSelectAnswer(user.id,question.id,option
      )); 
  }

  return (
    <div className="container">
      <div className="profileContainer">
        <img src={questionAuthor.avatarURL} alt="Profile" className="profileImage" />
        <h2 className="pollAuthor">Poll by {questionAuthor.name}</h2>
      </div>
      <h1 className="pollTitle">Would You Rather</h1>
      <div className="buttonContainer">
        <button className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`} 
          disabled={answer==='optionOne'}
          onClick={() => selectAnswer('optionOne')}>
          {question?.optionOne?.text}{answer}
        </button>
        <button className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`} 
          disabled={answer==='optionTwo'}
          onClick={() => selectAnswer('optionTwo')}>
          {question?.optionTwo?.text}
        </button>
      </div>
      {answer&&<div className='voteInfoContainer'>
        <div className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`}>
          {`${optionOneVote}/${totalVote} (${(optionOneVote*100/totalVote).toFixed(2)}%)`}
        </div>
        <div className={`optionButton ${answer !== '' ? 'disable-pointer' : ''}`} >
          {`${optionTwoVote}/${totalVote} (${(optionTwoVote*100/totalVote).toFixed(2)}%)`}
        </div>
      </div>}
    </div>
  );
};
 
export default Poll;