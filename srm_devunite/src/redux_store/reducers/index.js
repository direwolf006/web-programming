import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';


export default combineReducers(
  {
     auth:AuthReducer,
     post:PostsReducer
  }
)