import * as ActionTypes from "../actions/ActionTypes";

const initialState={
    loggedIn:null,
    data:null
}

export default (state=initialState,action)=>{
    switch (action.type){
        case ActionTypes.LOGIN_USER_SUCCESS:
            return {...state,loggedIn:true,data:action.payload};
        case ActionTypes.LOGIN_USER_FAILED:
            return {...state,loggedIn:null,data:null};
        case ActionTypes.LOGOUT_USER:
            return {...state,loggedIn:null,data:null};
        default:
            return state;
    }
}