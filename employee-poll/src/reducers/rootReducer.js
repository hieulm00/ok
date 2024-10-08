import { SETQUESTIONS, SETQUESTION } from '../actions/questions'
import { LOGIN, SETUSERS } from '../actions/users'

const initialState = {
    user:{},
    users:[],
    questions:[]
  };
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERS:{
            return { user: state.user, users:action.users, questions:state.questions};
        }
        case SETQUESTIONS: {
            return {
              ...state,
              questions: [...action.questions] 
            };
        }
        case SETQUESTION: {
            const updatedQuestions = state.questions.map((question) =>
                action.question.id === question.id ?action.question: question
              );
              const updatedUsers = syncQuestionsToUsers(state.users, state.questions);
              state.users=updatedUsers;
              return {
              ...state,
              questions: updatedQuestions
            };
        }
        case LOGIN:{
            return { user: action.user, users:state.users, questions:state.questions};
        }
          
        default:
          return state;
      }

};

function addQuestionAndAnswerToUser(userObject, answerId, answerOption) {
    return {
      ...userObject,
      answers: {
        ...userObject.answers,
        [answerId]: answerOption
      }
    };
  }

  function addQuestionToUser(userObject, newQuestionId) {
    return {
      ...userObject,
      questions: [...userObject.questions, newQuestionId]
    };
  }
  function syncQuestionsToUsers(users, questions) {
    // Tạo bản sao của người dùng để đảm bảo tính bất biến
    const updatedUsers = { ...users };
  
    questions.forEach(question => {
      const { id: questionId, author, optionOne, optionTwo } = question;
  
      // Cập nhật `questions` cho người dùng đã tạo ra câu hỏi
      if (updatedUsers[author]) {
        updatedUsers[author] = {
          ...updatedUsers[author],
          questions: [...updatedUsers[author].questions, questionId]
        };
      }
  
      // Cập nhật `answers` cho những người đã trả lời câu hỏi này
      const allVotes = [...optionOne.votes, ...optionTwo.votes];
      allVotes.forEach(voter => {
        if (updatedUsers[voter]) {
          updatedUsers[voter] = {
            ...updatedUsers[voter],
            answers: {
              ...updatedUsers[voter].answers,
              [questionId]: optionOne.votes.includes(voter) ? 'optionOne' : 'optionTwo'
            }
          };
        }
      });
    });
  
    return updatedUsers;
  }
  
export default rootReducer;