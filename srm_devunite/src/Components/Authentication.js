import React from 'react';
import {useDispatch}  from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Card,Button,Typography} from '@material-ui/core';
import Image from '../images/btn_google_signin.jpeg';
import {useGoogleLogin} from 'react-google-login';
import { loginUser } from '../redux_store/actions/Actions';



const useStyles = makeStyles((theme) => ({
    card:{
        outline:"none",
        paddingLeft:"10%",
        paddingRight:"10%",
        paddingTop:"8%",
        paddingBottom:"8%"
    },
    icon: {
        marginRight:10,
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(3),
            height: theme.spacing(3),
      },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(4),
                height: theme.spacing(4),
            
        },
      [theme.breakpoints.up('md')]: {
            width: theme.spacing(6),
            height: theme.spacing(6),
      },
    },
}))
const Authentication=({handleClose})=>{
    const dispatch = useDispatch()

    const classes = useStyles();

    const onSuccessAuth=(response)=>{
        console.log("log In Success");
        console.log(response);
        let userData={
            user_id:response.googleId,
            email:response.profileObj.email
        }
        handleClose()
        dispatch(loginUser(userData))
        
      }
  
      const onFailureAuth=(response)=>{
        console.log("log In failed");
        console.log(response);
      }

    const {signIn} =useGoogleLogin({
        clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
        isSignedIn:false,
        onSuccess:onSuccessAuth,
        onFailure:onFailureAuth,
    })
    

    return (
        <div>
            <Card className={classes.card}>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <img src={ require("../images/srm_logo.png") } className={classes.icon}/>
                        <div>
                        <Typography className={classes.title} variant="h6" color="initial" gutterBottom >
                                SRM devunite
                        </Typography>
                        <Typography variant="caption" color="initial" gutterBottom backdrop>
                                Sign in with SRM mail ID
                        </Typography>
                        </div>
                        
                    </div>
                    <div style={{display:'flex',justifyContent:'space-around'}}>
                    <Button 
                      onClick={()=>signIn()}
                      style={{backgroundImage: `url(${Image})`,height:45,width:240,justifyContent:'center',marginTop:15}}  
                    >
                    </Button>
                </div>
                </Card>
        </div>
    )
}

export default Authentication;