import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
//import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import NavBar from './NavBar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
const axios = require('axios');

const useStyles=makeStyles((theme)=> ({
    grow: {
      flexGrow: 1,
    },
    roots:{
        display:"flex",
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(4),
        align: 'center',
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
    
    position:{
        display:"flex",
        padding: theme.spacing(1, 2),
        justifyContent: 'center',
        flexDirection: "column",
        //height: 200,
        align: "right"
    },
     root2: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
      root3: {
        padding: theme.spacing(8, 2),
        justifyContent: 'right',
        //flexDirection: "column",
        display: "flex",
        width: "100%",
        maxWidth: 50,
        backgroundColor: theme.palette.background.paper
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    
  
}));
const columns = [
    { field: 'Id', headerName: 'ID', width: 100 },
    {
      field: 'CreationDate',
      headerName: 'Posted On',
      width: 150,
      editable: true,
    },
    {
        field: 'Body',
        headerName: 'Question',
        width: 690,
        editable: true,
      },
/*       {
        field: 'answers',
        headerName: 'Answers',
        width: 132,
        editable: true,
      },
 */      {
        field: 'Score',
        headerName: 'Score',
        width: 120,
        editable: true,
      },
      ];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function Profile() {
    const classes=useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //const user_id="106054907602357766738";
    const user_id = JSON.parse(window.localStorage.getItem('profile')).Id;
    var token = JSON.parse(window.localStorage.getItem('profile')).token
    
    //const [id, setid] = useState(2)
    const [data, setData] = useState([])
  
  useEffect(()=>{
  //fetch(`http://localhost:5050/users/${JSON.parse(localStorage.getItem('profile')).user._id}`)
   fetch(`http://localhost:5050/users/${user_id}`)
   .then(res=>res.json())
   .then(res=>{
     setData(res)
     //localStorage.setItem("user", JSON.stringify(res))     //console.log(data.length)
   })
},[])

  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:5050/users/${user_id}/questions`)
    .then(res=>res.json())
    .then(questions=>{setQuestions(questions)
        console.log(questions)
    })
},[])

const [answers, setAnswers] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5050/users/${user_id}/answers`)
  .then(res=>res.json())
  .then(answers=>{setAnswers(answers)
      console.log(answers)
  })
},[])

const [comments, setComments] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5050/users/${user_id}/comments`)
  .then(res=>res.json())
  .then(comments=>{setComments(comments)
      console.log(comments)
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

const [opens, setOpens] = React.useState(false);

const handleClickOpen = () => {
  setOpens(true);
};

const handleClosed = () => {
  setOpens(false);
};

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const handleDeleteProfile = () => {
  axios({
    method: "DELETE",
    url: `http://localhost:5050/users/${user_id}/delete`,
    //headers: {'x-access-token': String(token)},
  })
  .then(response => {
    console.log(response);
    localStorage.clear()
    //history.push('/')
    window.location.reload()
  })
  .catch(function (error) {
    console.log(error);
  });

};

    return (
        <>
        <NavBar />
        <div className={classes.roots}><a href='/profile'>
            <img height='120px' width="120px" src={data.image} alt="ProfileImage" align="center" style={{marginTop:'25px'}}></img></a>
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
          <Paper className={classes.paper}>
            Questions<br></br>{totalquestions}
            </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
          Answers<br></br>{totalanswers}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
          Comments<br></br>{totalcomments}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
          Score<br></br>{data.grade}
          </Paper>
        </Grid>
      </Grid>
    </div>
    </div>

        <div className={classes.root1}>
            <Fab variant="extended" color="textsecondary" aria-label="edit" className={classes.extendedIcon} href='/profile/edit'>
                <EditIcon /> Edit Profile
            </Fab>
            <Fab variant="extended" color="textsecondary" aria-label="settings" className={classes.extendedIcon} onClick={handleClickOpen}>
                <SettingsIcon />Profile Settings
            </Fab>
      <Dialog
        open={opens}
        onClose={handleClosed}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Delete Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Hello {JSON.parse(window.localStorage.getItem('profile')).displayName}! Do you really want to delete your profile?. 
          You wont have access to your posts anymore. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClosed} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProfile} color="primary">
            Delete
          </Button>
{/*           <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert>
 */}
        </DialogActions>
      </Dialog>

        </div>

            <Divider />
        </div>
    <div className={classes.root}>
      <><AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Questions" {...a11yProps(0)} />
          <Tab label="Answers" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </AppBar><TabPanel value={value} index={0}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row) => row.Id}
              rows={questions}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[4]}
              //checkboxSelection
              disableSelectionOnClick
              onCellDoubleClick={(GridCellParams, event) => {
                if (event) {
                  //alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
                  console.log(JSON.stringify(GridCellParams.tabIndex));
                  window.location.href =  `/question/${GridCellParams.id}`;
                }
              } } />
          </div>
        </TabPanel><TabPanel value={value} index={1}>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row) => row.Id}
              rows={answers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[4]}
              //checkboxSelection
              disableSelectionOnClick
              onCellDoubleClick={(GridCellParams, event) => {
                if (event) {
                  //alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
                  console.log(JSON.stringify(GridCellParams.tabIndex));
                  //window.location.href =  `/questions/${GridCellParams.id}`;
                }
              } } />
          </div>
        </TabPanel><TabPanel value={value} index={2}>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row) => row.Id}
              rows={comments}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[4]}
              //checkboxSelection
              disableSelectionOnClick
              onCellDoubleClick={(GridCellParams, event) => {
                if (event) {
                  //alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
                  console.log(JSON.stringify(GridCellParams.tabIndex));
                  //window.location.href = `/question/${GridCellParams.id}`;
                }
              } } />
          </div>
        </TabPanel></>
    </div>    
        </>
      
    )
}
export default Profile;