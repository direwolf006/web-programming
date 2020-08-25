import React from 'react';
import {Card,CardHeader,CardContent,CardActions,Collapse,Avatar,IconButton,Typography,Button} from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import clsx from 'clsx';

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
      },

}))

const Posts=()=>{

    const classes= useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return(
        <div>
            {[...new Array(10).keys()].map((post)=>{
                return(
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                            }
                            action={
                                <div>
                                    <IconButton aria-label="share">
                                    <PersonAddIcon color="primary"/>
                                </IconButton>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                </div>
                                
                            }
                            title="Rittesh.P.V"
                            subheader="EEE,3rd Year"
                        />
                        <CardContent>
                            <Typography variant="body2" color="inherit" component="p">
                                Project Name : "Smart Home"
                                <br/>
                                I am currently having an idea to create a smart home system , I have made the design aspect of the system 
                                and I am good at handling IoT devices.
                                <br/>
                                But I also need some software to be implemented in the system. So, I am looking for some software developers 
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button aria-label="add to favorites" variant="contained" color="primary">
                                Connect
                            </Button>
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                            <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>Smart Home System</Typography>
                            <Typography paragraph>
                                Description:
                            </Typography>
                            <Typography paragraph>
                                The system I am developing is designed with common residents as targeted audience.
                                Since we have so many advance technologies are coming into use and Iot is of them ,
                                thus I have decided to leverage the IoT technology to make life easier along with 
                                smart home controls at finger tips  
                                    
                            </Typography>
                            <Typography paragraph>
                                Rough working Period : 1 month
                                <br/>
                                Project Type : Own Project
                                <br/>
                                Expected Start Date : 25th Aug
                                <br/>
                                Max People in the group : 3
                            </Typography>
                            <Typography>
                                Looking for Software developers , to create IOS/Android Apps
                                <br/>
                                Preferred skills : basic knowledge required
                            </Typography>
                            <br/>
                            <Typography>
                                Notes :
                                    We follow the client server approach.
                                    <br/>
                                    I am open to changes
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