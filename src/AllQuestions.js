import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Header1 from './Header1';
import NavBar from './NavBar';

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

function AllQuestions(props)
{
    const classes = useStyles();
    const[notes,setNotes]=useState([])
    const preventDefault = (event) => event.preventDefault();
        useEffect(()=>{
            fetch("http://localhost:3300/mainpage2")
            .then(res=>res.json())
            .then(data=>{setNotes(data["questions"])
                console.log(data)
            })
        },[])
       
    return(
        <div>
            <NavBar />
            <Header1 heading="All Questions"/>
            {notes.map(e =>(
                <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid alignItems="center" justifyContent="center" item xs={1}>
                    <Typography gutterBottom variant='body1' color="#000" align='justify'>
                        Score = {e.Score}<br/>
                        {e.ViewCount} views
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                <Paper className={classes.paper}>
                <Box>
                    <Typography gutterBottom variant="h6" color ="#000">
                        <Link href = {"/question/"+e.Id}>
                            {e.Title}
                        </Link>
                    </Typography>
                    <Typography gutterBottom variant="body1" color ="#000">
                        {e.Body}
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
export default AllQuestions