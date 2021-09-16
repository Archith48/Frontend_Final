import React from 'react';
import { useState, useEffect } from "react";
import { Box, Grid, Typography, ListItemText, Divider } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Votting from './Votting';


function GetComments(props){
    const [comment,setComment]=useState([]);
    if(window.localStorage.getItem('profile')!=null){
        var token = JSON.parse(window.localStorage.getItem('profile')).token
        console.log(token)
        var user_id = JSON.parse(window.localStorage.getItem('profile')).Id
    }
    const [openEditComment, setOpenEditComment] = React.useState(false);
    const handleClickOpenEditComment = () => {setOpenEditComment(true);};
    const handleCloseEditComment = () => {setOpenEditComment(false);};

    var id = props.id
    var p_id, commentToPost, c_id
    
    const postComment = (e)=>{
        p_id = Number(e.target.attributes.name.nodeValue)
        commentToPost=e.target.value
        console.log(commentToPost)
    }

    const handleDeleteComment=(e)=>{
        c_id = Number(e.target.attributes[3].nodeValue)
        fetch(`http://localhost:8075/comments/${c_id}/delete`,{
        method:'DELETE',
        headers:{"Content-type":"application/json","x-access-token":token}})
        .then(()=>alert("Comment Deleted"))
    }

    const EditComment=(e)=>{
        fetch(`http://localhost:8075/comments/${p_id}/edit`,{
        method:'PATCH',
        headers:{"Content-type":"application/json",
                 "x-access-token":token},
        body:JSON.stringify({"body":commentToPost})
        })
        .then(()=>alert("Comment Edited"))
    }

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
                    {user_id==text.UserId && 
                        (
                            <div>
                            <IconButton onClick={handleClickOpenEditComment}>
                                <EditIcon fontSize="small"/>
                            </IconButton>
                                <Dialog
                                    open={openEditComment}
                                    onClose={handleCloseEditComment}
                                    aria-labelledby="form-dialog-title"
                                    fullWidth
                                >
                                    <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                                    <DialogContent>
                                    <TextField id="outlined-basic" required name={text.Id} margin="dense" label="Title" defaultValue={text.Text} type="text" fullWidth onChange={postComment}/>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseEditComment} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={EditComment} color="primary">
                                        Edit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            <IconButton onClick={handleDeleteComment} name={text.Id}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            </div>
                        )}
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