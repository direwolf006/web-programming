import * as ActionTypes from "../actions/ActionTypes";

const initialState={
    postData:null
}

export default (state=initialState,action)=>{
    switch (action.type){
        case ActionTypes.POSTS_FETCH:
            return {...state,postData:action.payload};
        default:
            return state;
    }
}