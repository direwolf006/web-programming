import React,{useEffect,useRef} from 'react';
import {Card,Chip,CardContent,CardActions,Collapse,Avatar,IconButton,Typography,Button,Menu,MenuItem,ListItemIcon } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ErrorIcon from '@material-ui/icons/Error';
import clsx from 'clsx';
import {useSelector,useDispatch} from 'react-redux';
import { fetchPosts } from '../../redux_store/actions/Actions';

const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 1000,
        marginTop:"5%",
        [theme.breakpoints.down('sm')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
          [theme.breakpoints.up('sm')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
          [theme.breakpoints.up('md')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
          [theme.breakpoints.up('lg')]: {
            marginLeft:"5%",
            marginRight:"5%"
          },
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
        marginRight:20
      },

}))

const Posts=()=>{

    const classes= useStyles();
    const dispatch = useDispatch();
    const [posts,setPosts]=React.useState([])
    const [expanded, setExpanded] = React.useState({});
    const [menuOpened,setMenuOpened] =React.useState({});
    const handleExpandClick = (index,anchorEl) => {
        console.log(expanded);
        if(expanded[index]===undefined ||expanded[index]===false){       
            setExpanded({...Object.keys({...expanded,[index]:true}).map((value,ind)=>{
                return (ind===index)? true:false
            })})
        }else{
            setExpanded({
                ...expanded,
                [index]:false
            })
        }
    };
    const handlePostMenu = (index,event) => {
        console.log(menuOpened);
        if(menuOpened[index]===undefined ||menuOpened[index]===null){       
            setMenuOpened({...Object.keys({...menuOpened,[index]:event.currentTarget}).map((value,ind)=>{
                return (ind===index)? event.currentTarget:null
            })})
        }else{
            setMenuOpened({
                ...menuOpened,
                [index]:null
            })
        }
    };

    const fetchUserPosts=async()=>{
        let temp=await fetchPosts();
        setPosts(temp)
    }

    const initialRender = useRef(true);
      useEffect(()=>{
        if(initialRender.current) {
          fetchUserPosts()
          initialRender.current = false;
        }
      },[]);

    return(
        <div>
            {(posts.length==0)?
            <Card className={classes.root}>
                <Typography variant="h5" color="inherit" style={{display:"flex",justifyContent:"space-around",padding:50}} component="p">
                    No Posts Available
                </Typography>
            </Card>
            :
            posts.map((post,index)=>{
                return(
                    <Card className={classes.root}>
                        <div style={{display:"flex",justifyContent:"space-between",paddingLeft:20}}>
                            <div style={{display:"flex",justifyContent:"space-between",paddingTop:10}}>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar> 
                                <div>
                                <Typography variant="body2" color="inherit" component="p">
                                    Rittesh.P.V
                                </Typography>
                                <Typography variant="body2" color="inherit" component="p">
                                    SWE,4th year
                                </Typography>
                                </div>
                            </div>
                            <div>
                                <IconButton aria-label="share">
                                <PersonAddIcon color="primary"/>
                                </IconButton>
                                <IconButton 
                                    aria-label="settings"
                                    aria-haspopup="true"
                                    onClick={(event)=>handlePostMenu(index,event)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    anchorEl={menuOpened[index]}
                                    keepMounted
                                    open={menuOpened[index]}
                                    onClose={()=>handlePostMenu(index)}
                                >
                                    <MenuItem key={0} onClick={()=>handlePostMenu(index)}>
                                    <ListItemIcon>
                                        <ErrorIcon fontSize="small" />
                                    </ListItemIcon>
                                        Report
                                    </MenuItem>
                                
                                </Menu>
                                </div>
                        </div>
                        <CardContent>
                            <Typography variant="body2" color="inherit" component="p">
                                {post.post_title}
                                <br/>
                                {new Buffer( post.description, 'binary' ).toString()} 
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button aria-label="add to favorites" variant="contained" color="primary">
                                Connect
                            </Button>
                            <IconButton aria-label="share">
                            <ShareIcon onClick={()=>{
                                let shareData="SRM Devunite,\
                                Rittesh has shared a post from srmdevunite,\
                                check out at http://localhost:3000/"
                                window.location.href="https://api.whatsapp.com/send?&text="+shareData
                                }}>
                            
                            </ShareIcon>
                            </IconButton>
                            <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded[index],
                            })}
                            onClick={()=>handleExpandClick(index)}
                            aria-expanded={expanded[index]}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                            <CardContent style={{display:"list-item"}}>
                            <Typography paragraph>{post.post_title}</Typography>
                            <Typography paragraph>
                                Description:
                            </Typography>
                            <Typography paragraph>
                                {new Buffer( post.description, 'binary' ).toString()} 
                            </Typography>
                            <Typography paragraph>
                                Expected Start Date : {new Date(parseInt(post.date)).toLocaleDateString()}
                            </Typography>
                            <Typography>
                                Project Type :
                            </Typography>
                                <Chip color="primary" label={post.project_type} variant="outlined" style={{margin:10}}/>
                            <Typography>
                                Max People in the group :
                            </Typography>
                            <Chip color="primary" label={post.team_size} variant="outlined" style={{margin:10}} />
                            <Typography>
                                Preferred Languages : 
                            </Typography>
                            <div style={{padding:10}}>
                            {new Buffer( post.languages, 'binary' ).toString().split(",").map((language)=>{
                                    return <Chip color="primary" label={language} variant="outlined" style={{marginRight:5}}/>
                                })}
                            </div>
                            <Typography>
                                Preferred Languages : 
                            </Typography>
                            <div style={{padding:10}}>
                            {new Buffer( post.frameworks, 'binary' ).toString().split(",").map((framework)=>{
                                    return <Chip color="primary" label={framework} variant="outlined" style={{marginRight:5}}/>
                                })}
                            </div>
                            <Typography>
                                Notes :
                            </Typography>
                            <Typography style={{padding:10}}>
                                {new Buffer( post.notes, 'binary' ).toString()} 
                            </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                )
            })}
        </div>
    )

}
export default Posts;