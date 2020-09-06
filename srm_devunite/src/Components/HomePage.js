import React from 'react';
import {Button,Tooltip,Fab, Modal} from "@material-ui/core";
import { makeStyles,withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Posts from './HomePageComponents/Posts';
import CreatePost from './HomePageComponents/CreatePost';
import FilterPost from './HomePageComponents/FilterPost';
import SortIcon from '@material-ui/icons/Sort';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 1000,
        marginLeft:"20%",
        marginRight:"20%",
        marginTop:"5%"
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: "#3f51b5",
      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
      },
      iconButton:{
        display:"flex",
        justifyContent:"flex-end",
        marginTop:10,
        marginRight:"5%"
      },
    posts:{
        marginTop:"5%",
        marginBottom:"5%",
        [theme.breakpoints.down('sm')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
          [theme.breakpoints.up('sm')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
          [theme.breakpoints.up('md')]: {
            marginLeft:"10%",
            marginRight:"10%"
          },
          [theme.breakpoints.up('lg')]: {
            marginLeft:"20%",
            marginRight:"20%"
          },
    },

}))

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#3f51b5",
      color: '#FFF',
      boxShadow: theme.shadows[1],
      fontSize: 15,
      padding:10
    },
  }))(Tooltip);

const HomePage=()=>{
    
    const classes= useStyles();
    const authState= useSelector((state)=>state.auth)
    const [open,setOpen]=React.useState({
        createPost:false,
        filterPost:false
    });

    const OpenFilterPost = (event) => {
        setOpen({
            ...open,
            filterPost:true
        })
    };

    const OpenCreatePost = (event) => {
        setOpen({
            ...open,
            createPost:true
        })
    };

    const closePost = (event) => {
        setOpen({
            createPost:false,
            filterPost:false
        })
    };


    return (
        <div>
            <div className={classes.posts}>
                <div className={classes.iconButton}>
                    <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>OpenFilterPost()}
                >
                    {"Sort  "}<SortIcon/>
                </Button>   
                </div>
                <Posts></Posts>
            </div>
            <Modal 
                open={open.createPost}
                onClose={()=>closePost()}
                style={ {overflow:'scroll' }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <CreatePost></CreatePost>
            </Modal>
            <Modal 
                open={open.filterPost}
                onClose={()=>closePost()}
                style={ {overflow:'scroll' }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <FilterPost></FilterPost>
            </Modal>
                {authState.loggedIn!==null?<LightTooltip arrow title="Create a post" placement="top-start">
                    <Fab aria-label="add" style={{position:"fixed",backgroundColor:"#3f51b5",color:"#FFF"}}
                        className={classes.fab} onClick={()=>OpenCreatePost()}>
                        <AddIcon />
                    </Fab>
                </LightTooltip>:null}
        </div>
    )
}
export default HomePage;