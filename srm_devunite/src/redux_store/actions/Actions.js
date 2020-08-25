import * as ActionTypes from './ActionTypes';
import backend from '../../Backend/connection';
import history from '../../history';

const registerUser=(data)=>async(dispatch)=>{
    console.log("entered register user");
    await backend.post("/user/new",data)
    .then((response)=>{
        console.log(response.data);
        if(response.data==="success"){
            dispatch({type:ActionTypes.LOGIN_USER_SUCCESS,payload:data})
            //window.location.reload(true);
        }
    })
}

export const loginUser=(data)=>async(dispatch)=>{
    console.log("entered login user");
    await backend.post("/user/login",data)
    .then((response)=>{
        console.log(response.data);

        if(response.data.length===0){
            dispatch(registerUser(data))
            
        }else{
            //window.location.reload(true);
            dispatch({type:ActionTypes.LOGIN_USER_SUCCESS,payload:response.data})
        }
    })
    .catch((error)=>{
        dispatch({type:ActionTypes.LOGIN_USER_SUCCESS,payload:{}})
    })
}

export const logoutUser=()=>async(dispatch)=>{
    console.log("entered logout user");
    dispatch({type:ActionTypes.LOGOUT_USER})
}