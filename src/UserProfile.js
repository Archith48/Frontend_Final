import React, { useState, useEffect } from 'react';
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
import { Redirect } from "react-router-dom"

import NavBar from './NavBar';

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
    var url = window.location.pathname
    var user_id = url.split('/')[2]
    if (user_id === JSON.parse(window.localStorage.getItem('profile')).Id)
    {
        window.location.href = "http://localhost:3000/profile";
    }  
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



    return (
        <>
        <NavBar />
        <div className={classes.roots}><a href='/profile'>
            <img height='120px' width="120px" src={data.image} alt="ProfileImage" align="center" style={{marginTop:'10px'}, {marginBotton:'10px'}} ></img></a>
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
                  alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
                  console.log(JSON.stringify(GridCellParams.tabIndex));
                  //window.location.href =  `/questions/${GridCellParams.id}`;
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
                  alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
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
                  alert('GridCellParams.tabIndex : ' + JSON.stringify(GridCellParams.tabIndex));
                  console.log(JSON.stringify(GridCellParams.tabIndex));
                  //window.location.href =  `/questions/${GridCellParams.id}`;
                }
              } } />
          </div>
        </TabPanel></>
    </div>    
        </>
      
    )
}
export default Profile;