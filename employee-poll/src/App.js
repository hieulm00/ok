import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Home from "./components/homePage/Home";
import Login from "./components/loginPage/Login";
import Logout from "./components/Logout";
import Poll from "./components/pollPage/Poll";
import NotFound from "./components/notFoundPage/NotFound";
import CreatePoll  from "./components/createPollPage/CreatePoll";
import Leaderboard   from "./components/leaderboardPage/Leaderboard";
import Navigation   from "./components/navigation/Navigation";
import { Provider, connect, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import React from 'react';
import SortQuestionsMiddleware from './middleware/SortQuestionsMiddleware';
import UpdateUserMiddleware from './middleware/UpdateUserMiddleware';


const AppRoutes = () => {
    const routes = [
        { path: '/', element: <Navigation children={ <Home/>} /> },
        { path: '/leaderboard', element: <Navigation children={ <Leaderboard/>} /> },
        { path: '/new', element: <Navigation children={ <CreatePoll/>} /> },
        { path: '/poll/:questionId', element: <Navigation children={ <Poll/>} /> },
        { path: '/login', element: <Login /> },
        { path: '/logout', element:  <Logout /> },
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element:  <Logout /> },
    ];
    return useRoutes(routes);
};
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
        .concat(SortQuestionsMiddleware)
        .concat(UpdateUserMiddleware)
});
const App = () => {
    return (
      <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>
    );
};

export default App;
