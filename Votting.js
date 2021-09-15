import React from "react"
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Votting(props) {
    const UpVote=(e)=>{
        console.log(e)
    }
    const DownVote=(e)=>{
        console.log(e)
    }

    return (
        <div>
            <Box>
            <Grid item xs={12}>
            <IconButton name={props.id} onClick={UpVote}>
            <ExpandLessIcon fontSize="small"/>
            </IconButton>
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom varriant="h6" color="#000" align="center"> {props.score} </Typography>
            </Grid>
            <Grid item xs={12}>
            <IconButton name={props.Id} onClick={DownVote}>
            <ExpandMoreIcon fontSize="small"/>
            </IconButton>
            </Grid>
            </Box>
        </div>
    )
}

export default Votting