import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { List, ListItemText } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: "20px"
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 700,
    }
}))

function Notifications(){
    const classes = useStyles();
    var u_id = 7
    const [notification,setNotification]=useState([]);
    useEffect(()=>{
        fetch (`http://localhost:8083/User/${u_id}/notifs`,{
        method:"GET",
        headers:{"Content-type":"application/json",
                     "x-access-token":"kar"},
        })
        .then(res=>res.json())
        .then(data=>{setNotification(data)})
    },[])
    console.log(notification)
    return(
        <div>
            <List>
                {notification.map(notify=>(
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                <Typography>{notify.Body}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                ))
                }
            </List>
        </div>
    )
}

export default Notifications;