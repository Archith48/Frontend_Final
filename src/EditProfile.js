import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import NavBar from './NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const axios = require('axios');

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

const [totalquestions, setTotalquestions] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5050/users/${user_id}/totalquestions`)
  .then(res=>res.json())
  .then(totalquestions=>{setTotalquestions(totalquestions)
      console.log(totalquestions)
  })
},[])

const [totalanswers, setTotalanswers] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5050/users/${user_id}/totalquestions`)
  .then(res=>res.json())
  .then(totalanswers=>{setTotalanswers(totalanswers)
      console.log(totalanswers)
  })
},[])

const [totalcomments, setTotalcomments] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5050/users/${user_id}/totalquestions`)
  .then(res=>res.json())
  .then(totalcomments=>{setTotalcomments(totalcomments)
      console.log(totalcomments)
  })
},[])

var token = JSON.parse(window.localStorage.getItem('profile')).token
    //console.log(token)
    ///var title, body, tags, gender;
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [gender, setGender] = React.useState('');

    const handleChange1= (event) => {
  setTitle(event.target.value);
};
const handleChange2= (event) => {
  setBody(event.target.value);
};
const handleChange3= (event) => {
  setTag(event.target.value);
};
const handleChange4= (event) => {
  setGender(event.target.value);
};

const handleSubmit = (e)=>{
  axios({
    method: 'patch',
    url: `http://localhost:5050/users/${user_id}/editprofile`,
    headers: {'x-access-token': String(token)},
    data: {
      "displayName":(title==='')?data.displayName:title,
      "username":(body==='')?data.username:body,
      "SocialLink":(tag==='')?data.SocialLink:tag,
      "gender":(gender==='')?data.gender:gender
    }  
  })
  .then(function (response) {
    console.log(response)
  });
  setTimeout(function(){window.location.reload()}, 1000);
  //window.location.reload()
}

    return (
        <>
        <NavBar />
        <div className={classes.roots}><a href='/profile'>
            <img height='120px' width="120px" src={data.image} alt="ProfileImage" align="center" style={{marginTop:'20px'}} ></img></a>
            <Box padding="20px" color="textsecondary">
                <a href='/profile' style={{ textDecoration: 'None' }}>
                    Name: <b>{data.displayName}</b> <br />
                    username: <b>{data.username}</b> <br />
                    Joined: <b>{data.CreationDate}</b><br />
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
          Questions<br></br>{totalquestions}
            </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
          Answers<br></br>{totalanswers}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
          Comments<br></br>{totalcomments}
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
              <TextField id="outlined-search" label="Display Name" type="search" variant="outlined" defaultValue='Display Name' onChange={handleChange1}/>
              </div>
              <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                User Name:
              </Typography>
              <TextField id="outlined-search" label="User Name/ Email" type="search" variant="outlined" defaultValue='User Name' onChange={handleChange2}/>
              </div>
              <div>
              <Typography gutterBottom variant="h6" component="h5" color ="#000">
                Social Link:
              </Typography>
              <TextField id="outlined-search" label="Social Link" type="search" variant="outlined" defaultValue='Social Link' onChange={handleChange3}/>
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
          value={gender}
          onChange={handleChange4}
          label="Gender"
        >
          <MenuItem>
          </MenuItem>
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
          <MenuItem value='None'>None</MenuItem>
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