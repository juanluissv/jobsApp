import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import userUpdateReducer from './reducers/userUpdateReducer';
import { jobsListReducer } from './reducers/jobsReducer';
import { jobDetailReducer } from './reducers/jobsDetailReducer';
import { countriesListReducer } from './reducers/countriesReducer';
import { tagsReducer } from './reducers/tagsReducer';
import postulationReducer from './reducers/postulationReducer';
import { createJobReducer } from './reducers/createJobReducer';
import { adminReducer } from './reducers/adminReducer';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userUpdateReducer,
  jobsList: jobsListReducer,
  jobDetailReducer,
  countriesListReducer,
  postulationReducer,
  createJobReducer,
  tagsReducer,
  adminReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
