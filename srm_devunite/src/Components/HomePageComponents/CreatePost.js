import React from 'react';
import { CardContent,Card,CardActions,CardHeader,TextField,FormControl,InputLabel,Select,MenuItem,FormLabel,
    Radio,RadioGroup,FormControlLabel,Button,Typography,Chip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import {useSelector,useDispatch} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {frameWorks,programmingLanguages,projectDomains,projectTypes,departments} from './selectionData';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { createPost } from '../../redux_store/actions/Actions';


const useStyles = makeStyles((theme) => ({

    card:{
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
    radio:{
        marginBottom:20,
        [theme.breakpoints.down('sm')]: {
            marginLeft:10
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft:13
        },
        [theme.breakpoints.up('md')]: {
            marginLeft:15
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft:20
        },
    },
    textField:{
        marginBottom:20,
        [theme.breakpoints.down('sm')]: {
            width:theme.spacing(30)
          },
        [theme.breakpoints.up('sm')]: {
            width:theme.spacing(35)
          },
          [theme.breakpoints.up('md')]: {
            width:theme.spacing(35),
            marginLeft:15,
          },
          [theme.breakpoints.up('lg')]: {
            width:theme.spacing(40),
            marginLeft:15,
          },
    },
    description: { 
        [theme.breakpoints.down('sm')]: {
          marginBottom:13,
          marginTop:5,
          marginRight:35,
          width:theme.spacing(40),  
          justifyContent: "space-around",
        },
        [theme.breakpoints.up('md')]: {
          marginTop:5,
          marginRight:25,
          marginLeft:15,
          marginBottom:15,
          width:theme.spacing(40),
          justifyContent: "space-around",            
        },
        [theme.breakpoints.up('lg')]: {
          marginRight:35,
          marginBottom:15,
          marginLeft:15,
          width:theme.spacing(85), 
          justifyContent: "space-around",          
        },
    },


}))

const CreatePost =()=>{
    const classes=useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = React.useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
    const user_id = useSelector((state)=>state.auth.data.user_id)
    let mode="create";
    const [selectedData,setSelectedData]=React.useState({
        year_eligibility:[],
        user_eligibility:[]
    })
    const [postData,setPostData] = React.useState({
        post_id:"pid_"+uuidv4(),user_id:user_id,post_title:"",description:"",date:selectedDate.getTime().toString(),project_domain:"",project_type:"",
        team_size:"",languages:"",frameworks:"",eligibility:"",eligible_departments:"",
        year_eligibility:"",notes:"",user_eligibility:""
    })
    const [error,setError] = React.useState({
        post_id:"",user_id:"",post_title:"",description:"",date:"",project_domain:"",project_type:"",
        team_size:"",languages:"",frameworks:"",eligibility:"",eligible_departments:"",
        year_eligibility:"",notes:"",user_eligibility:""
    })
    const handleChangeEligibility=(event)=>{
        setSelectedData({
            ...selectedData,
            [event.target.name]:event.target.value
        })
        setPostData({
            ...postData,
            [event.target.name]:event.target.value.toString()
        })
      }
    const buttons=(mode==="edit")?['Update',"Delete","Cancel"]:["Create","Cancel"];
    const [choosenDepartments,setChoosenDepartments]=React.useState([])
    const [eligiblity, setEligiblity] = React.useState('all');
    const handleEligiblity = (event) => {
        setEligiblity(event.target.value);
        if(event.target.value==="all"){
            setChoosenDepartments([])
        }  
        setPostData({
            ...postData,
            eligibility:event.target.value
        })
    };

    const filterDepartment = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.department,
    });
    const filterFrameWork = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.frameWork,
    });
    const filterLanguage = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.language,
    });

    const updateDate=(date)=>{
        setSelectedDate(date)
        setPostData({
            ...postData,
            date:new Date(date).getTime().toString()
        })
    }
    const updatePostData=(event)=>{
        console.log(event.target.value);
        if(event.target.name==="year_eligibility"){
            setPostData({
                ...postData,
                year_eligibility:event.target.value
            })
        }
        else{
            setPostData({
                ...postData,
                [event.target.name]:event.target.value
            })
        }
    }

    const createNewPost=(event,button)=>{
        dispatch(createPost(postData))
    }

    
    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    style={{color:"#FFF",
                    backgroundColor:"#3f51b5"}}
                    title="Create a post"
                >
                </CardHeader>
                <CardContent >
                <TextField
                  label="Post Title"
                  name="post_title"
                  placeholder="Enter Post Title"
                  variant="outlined"
                  value={postData.post_title}
                //   defaultValue={(mode==="edit")?tournament.tournament_name:""}
                //   helperText={error.tournament_name}
                //   error={(error.tournament_name===null||error.tournament_name==="")?false:true}
                  onChange={(event)=>updatePostData(event)}
                  className={classes.textField}
                  />
                  <br/>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    placeholder="Enter the description"
                    variant="outlined"
                    multiline
                    name="description"
                    rows={10}
                    value={postData.description}
                    // helperText={error.description}
                    // defaultValue={(mode==="edit")?new Buffer( tournament.description, 'binary' ).toString():""}
                    // error={(error.description===null||error.description==="")?false:true}
                    onChange={(event)=>updatePostData(event)}
                    className={classes.description}
                    />
                  <br/>
                  <MuiPickersUtilsProvider utils={MomentUtils} >
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Expected Start Date"
                    format="DD/MM/yyyy"
                    inputVariant="outlined"
                    className={classes.textField}
                    minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                    value={selectedDate}
                    // error={(error.date===null||error.date==="")?false:true}
                    // helperText={error.date}
                    onChange={(date)=>{updateDate(date)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
                  </MuiPickersUtilsProvider>
                  <br/>
                  <div style={{display:"inline",justifyContent:"space-around"}}>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel 
                          className={classes.textField}>
                              Project Domain
                            </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Project Domain"
                          name="project_domain"
                        //   defaultValue={(mode==="edit")?tournament.currency:currency}
                            onChange={(event)=>updatePostData(event)}
                          className={classes.textField}
                          >
                        {projectDomains.map((domain,index)=>{
                            return(
                                <MenuItem value={domain} 
                                    // onClick={(event) => handleCurrencyClick(event,index)}
                                    >
                                    {domain}
                                </MenuItem>
                            )
                        })}                      
                      </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel 
                          className={classes.textField}>
                              Project Type
                            </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Project Type"
                          name="project_type"
                        //   defaultValue={(mode==="edit")?tournament.currency:currency}
                        onChange={(event)=>updatePostData(event)}
                          className={classes.textField}
                          >
                        {projectTypes.map((type,index)=>{
                            return(
                                <MenuItem value={type} 
                                    // onClick={(event) => handleCurrencyClick(event,index)}
                                    >
                                    {type}
                                </MenuItem>
                            )
                        })}                      
                      </Select>
                  </FormControl>
                  <br/>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel 
                          className={classes.textField}>
                              Max Team Size
                            </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Team Size"
                          name="team_size"
                        //   defaultValue={(mode==="edit")?tournament.currency:currency}
                            onChange={(event)=>updatePostData(event)}
                          className={classes.textField}
                          >
                        {[...new Array(10).keys()].map((value)=>{
                            return(
                                <MenuItem value={value+1} 
                                    // onClick={(event) => handleCurrencyClick(event,index)}
                                    >
                                    {value+1}
                                </MenuItem>
                            )
                        })}                      
                      </Select>
                  </FormControl>
                  </div>
                  
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={programmingLanguages}
                    className={classes.description}
                    getOptionLabel={(option) => option.language}
                    defaultValue={[]}
                    filterSelectedOptions
                    disableCloseOnSelect
                    filterOptions={filterLanguage}
                    onChange={(event, newValue) => {
                        const chosenLanguages=[];
                        newValue.forEach((v,ind)=>{
                            chosenLanguages.push(v.language)
                        })
                        setPostData({
                            ...postData,
                            languages:chosenLanguages.toString()
                        })
                    }}
                    groupBy={(option)=>option.language[0]}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        name="languages"
                        label="Select preferred languages"
                        placeholder="Enter language"
                    />
                    )}
                />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    name="frameworks"
                    options={frameWorks}
                    className={classes.description}
                    getOptionLabel={(option) => option.frameWork}
                    defaultValue={[]}
                    filterOptions={filterFrameWork}
                    groupBy={(option)=>option.frameWork[0]}
                    filterSelectedOptions
                    disableCloseOnSelect
                    onChange={(event, newValue) => {
                        const chosenFrameWorks=[];
                        newValue.forEach((v,ind)=>{
                            chosenFrameWorks.push(v.frameWork)
                        })
                        setPostData({
                            ...postData,
                            frameworks:chosenFrameWorks.toString()
                        })
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        name="frameworks"
                        label="Select preferred framework"
                        placeholder="Enter framework"
                        
                    />
                    )}
                />
                <FormControl component="fieldset" className={classes.radio} style={{marginTop:15,marginBottom:10}}>
                    <FormLabel component="legend">Choose Eligible Departments</FormLabel>
                        <RadioGroup aria-label="Choose Eligible Departments" name="eligibility" value={eligiblity} onChange={handleEligiblity} 
                            className={classes.radio} style={{marginTop:10}}>
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="department" control={<Radio />} label="Specific Department"  />
                        </RadioGroup>
                </FormControl>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={departments}
                    className={classes.description}
                    disabled={(eligiblity==="department")?false:true}
                    getOptionLabel={(option) => option.department}
                    filterOptions={filterDepartment}
                    defaultValue={[]}
                    disableCloseOnSelect
                    groupBy={(option)=>option.department[0]}
                    getOptionLabel={(option) => option.department}
                    filterSelectedOptions
                    onChange={(event, newValue) => {
                        const chosendepartments=[];
                        newValue.forEach((v,ind)=>{
                            chosendepartments.push(v.department)
                        })
                        setPostData({
                            ...postData,
                            eligible_departments:chosendepartments.toString()
                        })
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        name="eligible_departments"
                        label="Select eligible departments"
                        placeholder="Enter department name"
                        disabled={(eligiblity==="department")?false:true}
                    />
                    )}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel 
                          className={classes.textField}>
                              Eligible Year Of Study
                            </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Eligible Year"
                          name="year_eligibility"
                          multiple
                          value={selectedData.year_eligibility}
                        //   defaultValue={(mode==="edit")?tournament.currency:currency}
                        onChange={(event)=>handleChangeEligibility(event)}
                          className={classes.textField}
                          renderValue={(selected) => (
                            <div >
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                          >
                    <MenuItem value={"1"}>{"1st Year"}</MenuItem>   
                    <MenuItem value={"2"}>{"2nd Year"}</MenuItem>
                    <MenuItem value={"3"}>{"3rd year"}</MenuItem>
                    <MenuItem value={"4"}>{"4th Year"}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel 
                          className={classes.textField}>
                              Eligible Year Of Study
                            </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Eligible Users"
                          name="user_eligibility"
                          multiple
                          value={selectedData.user_eligibility}
                        //   defaultValue={(mode==="edit")?tournament.currency:currency}
                        onChange={(event)=>handleChangeEligibility(event)}
                        renderValue={(selected) => (
                            <div >
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                          className={classes.textField}
                          >
                    <MenuItem value={"Student"}>{"Student"}</MenuItem>   
                    <MenuItem value={"Teacher"}>{"Teacher"}</MenuItem>
                    </Select>
                  </FormControl>
                <br/>
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    placeholder="Enter the some notes"
                    variant="outlined"
                    multiline
                    name="notes"
                    rows={4}
                    value={postData.notes}
                    // helperText={error.description}
                    // defaultValue={(mode==="edit")?new Buffer( tournament.description, 'binary' ).toString():""}
                    // error={(error.description===null||error.description==="")?false:true}
                    onChange={(event)=>updatePostData(event)}
                    className={classes.description}
                    />
                </CardContent>
                <CardActions style={{justifyContent: "space-around",paddingBottom:20}}>
                    {
                        buttons.map((button)=>(
                        <Button size="medium" 
                            style={{backgroundColor:(button==="Delete")?"#f44336":"#3f51b5",justifyContent:"center"}}
                            startIcon={(button==="Cancel")?<CancelIcon style={{color:"#FFF"}}/>:((button==="Delete")?
                            <DeleteIcon style={{color:"#FFF"}}/>:((button==="Update")?<CreateIcon style={{color:"#FFF"}}/>:
                            <AddCircleIcon style={{color:"#FFF"}}/>))} 
                            variant="contained" onClick={(e)=>{createNewPost(e,button)}}>
                        <Typography gutterBottom variant="body2" component="h2" style={{paddingTop:5,color:"#ffffff"}}>
                            {button}
                        </Typography>
                        </Button>
                        ))}
                    </CardActions>
            </Card>
        </div>
    )
}
export default CreatePost;