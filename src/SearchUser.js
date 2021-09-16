import '@fontsource/roboto';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link'
import React from 'react';
import  {Route as Router} from 'react-router-dom';
import { Route,NavLink,HashRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header1 from './Header1';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "100%",
        }
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1500,
    },
    page: {
        background:"white",
        width:"100%"
    }
}));

function SearchUser()
{
    const classes = useStyles();
    const params = useParams();
    const [notes,setNotes]=useState([])
    const preventDefault = (event) => event.preventDefault();
    var name=params.name
      useEffect(()=>{
        fetch(`http://localhost:3300/searchcusts/${name}`)
        .then(res=>res.json())
        .then(data=>{setNotes(data)
        })
    })
    
    return(
        <div>
            <NavBar/>
            <Header1 heading="Search Results"/>
            {notes.map(e =>(
                <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid item xs={11}>
                <Paper className={classes.paper}>
                <Box>
                    <Typography gutterBottom variant="h6" color ="#000">
                        <Link href = {"/users/"+e.Id}>
                            {e.displayName}
                        </Link>
                    </Typography>
                </Box>
                </Paper>
                </Grid>
                </Grid>
                </Paper>
            ))}
        </div>
    )
}

export default SearchUser