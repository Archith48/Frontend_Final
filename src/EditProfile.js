import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import NavBar from './NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles=makeStyles((theme)=> ({
    grow: {
      flexGrow: 1,
    },
/*     root: {
      "& > *": {
      display:"flex",
      margin: theme.spacing(1),
      width: "100%",
      align: 'center',
      } 
    },
 */   root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }},  
    roots:{
        display:"flex",
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0),
        marginRight: theme.spacing(4),
        margin: 'auto',
        align: 'center',
        spacing: 8,
    },
    root1: {
        '& > *': {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(1),
            align: "right",
            flex: '1'
        },
      },    
      extendedIcon: {
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(5),
      },
      paper1: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1500,
      },
      page: {
        background:"white",
        width:"100%"
      },
      formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      }      
}));

function Profile() {
    const classes=useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //const user_id="106054907602357766738";
    const user_id = JSON.parse(window.localStorage.getItem('profile')).Id;
    console.log(user_id)
    
    //const [id, setid] = useState(2)
    const [data, setData] = useState([])
  
  useEffect(()=>{
  //fetch(`http://localhost:5050/users/${JSON.parse(localStorage.getItem('profile')).user_id}`)
   fetch(`http://localhost:5050/users/${user_id}`)
   .then(res=>res.json())
   .then(res=>{
     setData(res)
     console.log(res)
    })
},[])

var token = JSON.parse(window.localStorage.getItem('profile')).token
    console.log(token)
    var title, body, tags, gender;
    const setTitle = (e)=>{
        title=e.target.value
        console.log(title)
    }
    const setBody = (e)=>{
        body=e.target.value
        console.log(body)
    }
    const setTag = (e)=>{
      tags=e.target.value
      console.log(tags)
  }    
  const setGender = (e)=>{
    gender=e.target.value
    console.log(gender)
}    
const handleSubmit = (e)=>{
        fetch(`http://localhost:5050/users/${user_id}/editprofile`,{
            method:'PATCH',
            headers:{"Content-type":"application/json",
                     "x-access-token":token},
            body:JSON.stringify({"displayName":title,
                                  "username":body,
                                  "SocialLink":tags,
                                  "gender":gender})
            })
            .then(res=>(res.json()))   
            .then(data=>{
                console.log(data)
            })
            .then(()=>
            alert("User Profile Edited Successfully")) 
    }
    const [age, setAge] = React.useState("");
    const handleChanges= (event) => {
      setAge(event.target.value);
    };

    return (
        <>
        <NavBar />
        <div className={classes.roots}><a href='/profile'>
            <img height='120px' width="120px" src={data.image} alt="ProfileImage" align="center" style={{marginTop:'20px'}} ></img></a>
            <Box padding="20px" color="textsecondary">
                <a href='/profile' style={{ textDecoration: 'None' }}>
                    Name: <b>{data.displayName}</b> <br />
                    username: <b>{data.username}</b> <br />
                    Joined: <b>{data.creationDate}</b><br />
                    Gender: <b>{data.gender}</b><br />
                    LastLogin: <b>{data.LastLogin}</b><br />
                    </a>
                <a href={data.SocialLink} style={{ textDecoration: 'None' }}>
                    Social Link: <b>{data.SocialLink}</b>
                </a><br></br>
            </Box>
<div>
<div className={classes.roots}>
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
            Questions<br></br>10
            </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
          Answers<br></br>0
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
          Comments<br></br>24
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
          Score<br></br>{data.grade}
          </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
    </div>   

    <div>
        <br />
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
                      <div>
            <Typography gutterBottom variant="h5" component="h6" color ="#000">
                <b>Edit Profile:</b>
            </Typography>
            <Box>
            <Typography gutterBottom variant="h6" component="h6" color ="#000">
                Public Information:
            </Typography>
            </Box>
            </div>
        
        <form action="" name = "form" className ={classes.roots}>
            <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                Display Name:
              </Typography>
              <TextField id="outlined-search" label="Display Name" type="search" variant="outlined" defaultValue={JSON.parse(window.localStorage.getItem('profile')).displayName} onChange={setTitle}/>
              </div>
              <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                User Name:
              </Typography>
              <TextField id="outlined-search" label="User Name/ Email" type="search" variant="outlined" defaultValue={JSON.parse(window.localStorage.getItem('profile')).username} onChange={setBody}/>
              </div>
              <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                Social Link:
              </Typography>
              <TextField id="outlined-search" label="Social Link" type="search" variant="outlined" defaultValue={JSON.parse(window.localStorage.getItem('profile')).SocialLink} onChange={setTag}/>
              </div>
              <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000" onChange={setGender}>
                Gender:
              </Typography>

        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChanges}
          label="Gender"
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
          <MenuItem value={30}>None</MenuItem>
        </Select>
      </FormControl>
              {/* </div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                About you:
              </Typography>
            <TextareaAutosize id="outlined-basic" aria-label="minimum height" width="95%" minRows={10} placeholder = "Write something about you!"  onChange={setBody} />
            <div> */}
            </div>
        </form><br/>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Paper>
        </Grid>
        </Grid>
        </div>
        </>
      
    )
}
export default Profile;
/* 
<div className={classes.root1}>
<Fab variant="extended" color="textsecondary" aria-label="edit" className={classes.extendedIcon}>
    <EditIcon /> Edit Profile
</Fab>
<Fab variant="extended" color="textsecondary" aria-label="settings" className={classes.extendedIcon}>
    <SettingsIcon />Settings
</Fab>
</div>
 */