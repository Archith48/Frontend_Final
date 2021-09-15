import React, { useState, useEffect } from 'react';
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
import NavBar from './NavBar';

const columns = [
    { field: 'Id', headerName: 'ID', width: 150 },
    {
      field: 'displayName',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 125,
      editable: true,
    },
    {
      field: 'CreationDate',
      headerName: 'Joined On',
      width: 145,
      editable: true,
    },
     {
      field: 'questions',
      headerName: 'Questions',
      width: 152,
      editable: true,
    },
    {
      field: 'answers',
      headerName: 'Answers',
      width: 132,
      editable: true,
    },
    {
      field: 'comments',
      headerName: 'Comments',
      width: 150,
      editable: true,
    },
    {
      field: 'grade',
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
          border:"outlined"
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      image:{
        height:"50px",
        width:"50px",
        alt:"ProfileImage",
        align:"center"
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
      },
    }));
      
function Users()
{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [data, setData] = useState([])
  
    useEffect(()=>{
      fetch("http://localhost:5050/users")
      .then(res=>res.json())
      .then(resp=>{
        //setData(resp)
        console.log(resp)
        for (let i = 0; i < resp.length; i++)
        {
          //console.log(resp[i].Id)
          fetch(`http://localhost:5050/users/${resp[i].Id}/totalquestions`)
          .then(res => res.json())
          .then(response=>{
            //console.log(response)
            resp.[i].questions = JSON.stringify(response);
          })

          //console.log(resp[i].Id)
          fetch(`http://localhost:5050/users/${resp[i].Id}/totalanswers`)
          .then(res => res.json())
          .then(response=>{
            //console.log(response)
            resp.[i].answers = JSON.stringify(response);
          })

          //console.log(resp[i].Id)
          fetch(`http://localhost:5050/users/${resp[i].Id}/totalcomments`)
          .then(res => res.json())
          .then(response=>{
            //console.log(response)
            resp.[i].comments = JSON.stringify(response);
          })

        }
        //console.log(resp)  
        setData(resp)
      })
  },[])
  
    return(
      <div>
        <NavBar />
    <><br />
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Users" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid getRowId={(row) => row.Id}
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        //checkboxSelection
        disableSelectionOnClick
        onCellDoubleClick={(GridCellParams, event) => {
            if (event) {
                //alert('GridCellParams.tabIndex : '+JSON.stringify(GridCellParams.tabIndex))
                console.log(JSON.stringify(GridCellParams.tabIndex))
                window.location.href =  `/users/${GridCellParams.id}`;
            }
          }}
      />
    </div>
      </TabPanel>
      
    </div>
    </> 
    </div>  
    );
}
export default Users;
/* 
for (let i = 0; i < resp.length; i++) {
  if (resp[i].Id){
    console.log(resp[i].Id)
    fetch(`http://localhost:5050/users/${user_id}/questions`)
        .then(res => res.json())
        console.log(res)
}
//setData(resp)
//console.log(resp)
//console.log(data.length)
}
 */