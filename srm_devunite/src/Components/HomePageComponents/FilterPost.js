import React from 'react';
import { CardContent,Card,CardActions,CardHeader,TextField,FormControl,InputLabel,Select,MenuItem,Button,Typography} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import SortIcon from '@material-ui/icons/Sort';
import {frameWorks,programmingLanguages,projectDomains,projectTypes,departments} from './selectionData';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';


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
    textField:{
        marginBottom:20,
        [theme.breakpoints.down('sm')]: {
            width:theme.spacing(30)
          },
        [theme.breakpoints.up('sm')]: {
            width:theme.spacing(30)
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



const FilterPost =()=>{
    const classes=useStyles();
    const [selectedDate, setSelectedDate] = React.useState({
        from:new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        till:new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
    })
    const [choosenDepartments,setChoosenDepartments]=React.useState([])
    const buttons=["Sort","Cancel"]
    const [eligiblity, setEligiblity] = React.useState('all');
    const handleEligiblity = (event) => {
        setEligiblity(event.target.value);
        if(event.target.value==="all"){
            setChoosenDepartments([])
        }  
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

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    style={{color:"#FFF",
                    backgroundColor:"#3f51b5"}}
                    title="Filter posts by"
                >
                </CardHeader>
                <CardContent >
                  <MuiPickersUtilsProvider utils={MomentUtils} >
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From Date"
                    format="DD/MM/yyyy"
                    inputVariant="outlined"
                    className={classes.textField}
                    minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                    value={selectedDate.from}
                    // error={(error.date===null||error.date==="")?false:true}
                    // helperText={error.date}
                    // onChange={(date,value)=>{handleDateChange(date,value,"date")}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Till Date"
                    format="DD/MM/yyyy"
                    inputVariant="outlined"
                    className={classes.textField}
                    minDate={new Date(new Date().getTime() + 48 * 60 * 60 * 1000)}
                    value={selectedDate.till}
                    // error={(error.date===null||error.date==="")?false:true}
                    // helperText={error.date}
                    // onChange={(date,value)=>{handleDateChange(date,value,"date")}}
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
                          defaultValue="Any"
                        //   onChange={(event)=>updateTournamentData(event)}
                          className={classes.textField}
                          >
                        {(["Any"].concat(projectDomains)).map((domain,index)=>{
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
                        //   onChange={(event)=>updateTournamentData(event)}
                          className={classes.textField}
                          >
                        {(["Any"].concat(projectTypes)).map((type,index)=>{
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
                    groupBy={(option)=>option.language[0]}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select preferred languages"
                        placeholder="Enter language"
                    />
                    )}
                />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={frameWorks}
                    className={classes.description}
                    getOptionLabel={(option) => option.frameWork}
                    defaultValue={[]}
                    filterOptions={filterFrameWork}
                    groupBy={(option)=>option.frameWork[0]}
                    filterSelectedOptions
                    disableCloseOnSelect
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select preferred framework"
                        placeholder="Enter framework"
                        
                    />
                    )}
                />
                
                </CardContent>
                <CardActions style={{justifyContent: "space-around",paddingBottom:20}}>
                    {
                        buttons.map((button)=>(
                        <Button size="medium" 
                            style={{backgroundColor:"#3f51b5",justifyContent:"center"}}
                            startIcon={(button==="Cancel")?<CancelIcon style={{color:"#FFF"}}/>:<SortIcon style={{color:"#FFF"}}/>} 
                            variant="contained" onClick={(e)=>{console.log("Button Clicked")}}>
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
export default FilterPost;