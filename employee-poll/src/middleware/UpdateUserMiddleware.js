import { SETQUESTIONS, SETQUESTION } from '../actions/questions'

const UpdateUserMiddleware = store => next => action => {
    if (action.type === SETQUESTIONS||action.type === SETQUESTION) {
    }
    return next(action);
  };
  
  export default UpdateUserMiddleware;
  