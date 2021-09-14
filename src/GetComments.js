import React from 'react';
import { useState, useEffect } from "react";
import { Box, Grid, Typography, ListItemText, Divider } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Votting(props) {
    return (
        <div>
            <Box>
            <Grid item xs={12}>
            <ExpandLessIcon fontSize="small"/>
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom varriant="h6" color="#000" align="center"> {props.score} </Typography>
            </Grid>
            <Grid item xs={12}>
            <ExpandMoreIcon fontSize="small"/>
            </Grid>
            </Box>
        </div>
    )
}

function GetComments(props){
    const [comment,setComment]=useState([]);
    var id = props.id
    useEffect(()=>{
        fetch(`http://localhost:8075/questions/${id}/comments`,{method:'GET'})
        .then(res=>res.json())
        .then(data=>{setComment(data)})
    },[])

    return (
        <div>
        {comment.map((text) => (
            <Box>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <Votting score={text.Score}/>
                </Grid>
                <Grid item xs={11}>
                <Typography variant="body2" gutterBottom style={{fontSize:"1.5rem"}}>
                    <ListItemText primary={text.Text}/>
                </Typography>
                </Grid>
                <Divider/>
            </Grid>
            <Divider />
            </Box>
        ))}
        </div>
  );
}

export default GetComments;