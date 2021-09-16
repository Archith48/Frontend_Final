import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState, useEffect} from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { TextareaAutosize } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NavBar from "./NavBar";
import Header1 from "./Header1";
import GetComments from "./GetComments";
import Votting from "./Votting";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: "20px"
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 700,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    typography: {
      flexGrow: 1,
      textAlign: "justify"
    },
    page: {
        background:"white",
        width:"100%"
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function Question(){

    var answerToPost, commentToPost, p_id;
    if(window.localStorage.getItem('profile')!=null){
        var token = JSON.parse(window.localStorage.getItem('profile')).token
        console.log(token)
        var user_id = JSON.parse(window.localStorage.getItem('profile')).Id
    }

    const classes=useStyles()

    const [openEditQuestion, setOpenEditQuestion] = React.useState(false);
    const [openEditAnswer, setOpenEditAnswer] = React.useState(false);

    var title, body, tags;
    const setTitle = (e)=>{title=e.target.value}
    const setBody = (e)=>{body=e.target.value}
    const setTag = (e)=>{
        tags=e.target.value
        tags = tags.split(',')
    }
    const postAnswer = (e)=>{
        answerToPost=e.target.value
        console.log(answerToPost)
    }

    const editAnswer = (e)=>{
        p_id = Number(e.target.attributes.name.nodeValue)
        answerToPost=e.target.value
    }

    const handleClickOpenEditQuestion = () => {setOpenEditQuestion(true);};
    const handleCloseEditQuestion = () => {setOpenEditQuestion(false);};
    const handleClickOpenEditAnswer = () => {setOpenEditAnswer(true);};
    const handleCloseEditAnswer = () => {setOpenEditAnswer(false);};

    const handleAnswer=(e)=>{
            fetch(`http://localhost:8089/questions/${q_id}/answers/add`,{
                method:'POST',
                headers:{"Content-type":"application/json",
                        "x-access-token":token},
                body:JSON.stringify({"Body":answerToPost,})
            })
            .then(res=>(res.json()))
            .then(()=>alert("Answer Posted"))
    }

    const handleKeyDown=(e)=>{
        if(e.key==="Enter"){
            p_id = Number(e.target.attributes.name.nodeValue)
            commentToPost=e.target.value
            console.log(commentToPost)
            if(commentToPost != null){
                fetch(`http://localhost:8075/questions/${p_id}/comments/add`,{
                method:'POST',
                headers:{"Content-type":"application/json",
                    "x-access-token":token},
                body: JSON.stringify({"body":commentToPost})
                })
                .then(res=>(res.json()))
                .then(()=>alert("Comment Posted"))
            }
        }
    }

    const EditQuestion = (e) => {
        fetch(`http://localhost:8089/questions/${q_id}/edit`,{
        method:'POST',
        headers:{"Content-type":"application/json",
                 "x-access-token":token},
        body:JSON.stringify({"Title":title,"Body":body,"Tags":tags})
        })
        .then(res=>(res.json()))
        .then(()=>alert("Question Edited"))
        setTimeout(function(){window.location.reload()}, 1000);
    };

    const EditAnswer=(e)=>{
        fetch(`http://localhost:8088/answers/${p_id}/edit`,{
        method:'POST',
        headers:{"Content-type":"application/json",
                 "x-access-token":token},
        body:JSON.stringify({"Body":answerToPost})
        })
        .then(res=>(res.json()))
        .then(()=>alert("Answer Edited"))
        setTimeout(function(){window.location.reload()}, 1000);
    }

    const handleDeleteQuestion=(e)=>{
        fetch(`http://localhost:8089/questions/${q_id}/delete`,{
            method:'POST',
            headers:{"Content-type":"application/json","x-access-token":token}
        })
        setTimeout(function(){window.location.reload()}, 1000);
    }

    const handleCloseQuestion=(e)=>{
        fetch(`http://localhost:8089/questions/${q_id}/close`,{
            method:'POST',
            headers:{"Content-type":"application/json","x-access-token":token}
        })
        setTimeout(function(){window.location.reload()}, 1000);
    }

    const handleReopenQuestion=(e)=>{
        fetch(`http://localhost:8089/questions/${q_id}/reopen`,{
            method:'POST',
            headers:{"Content-type":"application/json","x-access-token":token}
        })
        setTimeout(function(){window.location.reload()}, 1000);
    }

    const handleDeleteAnswer=(e)=>{
        console.log(e)
        p_id = Number(e.target.attributes.name.nodeValue)
        fetch(`http://localhost:8088/answers/${p_id}/delete`,{
        method:'DELETE',
        headers:{"Content-type":"application/json","x-access-token":token}})
        .then(()=>alert("Answer Deleted"))
    }

    var questions
    const [similarQ,setSimilarQ]=useState([]);
    const [question,setQuestion]=useState([]);
    const [answers,setAnswer]=useState([]);
    const preventDefault = (event) => event.preventDefault();

    var url = window.location.pathname
    var q_id = url.split('/')[2]

    useEffect(()=>{
        fetch(`http://localhost:8089/questions/${q_id}`,{
            method:'GET'})
            .then(res=>(res.json()))
            .then(data=>{setQuestion(data)
                questions=data
            })
            .then(()=>{
                fetch('http://localhost:3300/suggested',{
                method:'POST',
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({"Title":questions.Title,
                    "Body":questions.Body})
                })
                .then(res=>(res.json()))
                .then(data=>{setSimilarQ(data)})
                .then(()=>{
                    fetch(`http://localhost:8089/questions/${q_id}/answers`,{
                    method:'POST',
                    headers:{"Content-type":"application/json"}})
                    .then(res=>(res.json()))
                    .then(data=>{setAnswer(data)})
                })
            })
    },[])

    return(
     <div>
        <NavBar />
        <Header1 heading = {question.Title}/>
        <Grid container spacing={1}>
            <Grid item xs={9}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <Votting score = {question.Score}/>
                    </Grid>
                    <Grid item xs={11}>
                    <Paper className={classes.paper}>
                        <Typography variant="body1" gutterBottom>{question.Body}</Typography>
                        {user_id==question.OwnerUserId &&
                        (
                            <div>
                            <IconButton onClick={handleClickOpenEditQuestion}>
                                <EditIcon fontSize="small"/>
                            </IconButton>
                                <Dialog
                                    open={openEditQuestion}
                                    onClose={handleCloseEditQuestion}
                                    aria-labelledby="form-dialog-title"
                                    fullWidth
                                >
                                    <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                                    <DialogContent>
                                    <TextField id="outlined-basic" required margin="dense" label="Title" defaultValue={question.Title} type="text" fullWidth onChange={setTitle}/>
                                    <TextField id="outlined-basic" required margin="dense" label="Body" defaultValue={question.Body} type="text" fullWidth onChange={setBody}/>
                                    <TextField id="outlined-basic" required margin="dense" label="Tags" defaultValue={question.Tags} type="text" fullWidth onChange={setTag}/>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseEditQuestion} name={q_id} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={EditQuestion} color="primary">
                                        Edit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            <IconButton onClick={handleDeleteQuestion}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            {question.ClosedDate==null ? (
                                <IconButton onClick={handleCloseQuestion}> 
                                    <LockOpenIcon fontSize="small"/>
                                </IconButton>
                            ):(
                                <IconButton onClick={handleReopenQuestion}>
                                    <LockIcon fontSize="small"/>
                                </IconButton>
                            )}
                            </div>
                        )}
                    </Paper>
                    </Grid>

                    <Grid item xs={2} /> {/*Space*/}
                    <Grid item xs={10}>
                        <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <GetComments id = {q_id} />
                        <TextField id="standard" name={q_id} label="Add Comment" fullWidth onKeyPress={handleKeyDown}/>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <Typography gutterBottom variant="h6">Answers</Typography>
                <List>
                    {answers.map((answerText) => (
                        <Grid container spacing={1}>
                        <Grid item xs={1}>
                            <Votting score = {answerText.Score}/>
                        </Grid>
                        <Grid item xs={11}>
                        <Paper className={classes.paper}>
                            <Typography variant="body1" gutterBottom align="justify">{answerText.Body}</Typography>
                            {user_id==answerText.OwnerUserId && (
                                <div>
                                <IconButton onClick={handleClickOpenEditAnswer}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                                    <Dialog
                                        open={openEditAnswer}
                                        onClose={handleCloseEditAnswer}
                                        aria-labelledby="form-dialog-title"
                                        fullWidth
                                    >
                                        <DialogTitle id="form-dialog-title">Edit Answer</DialogTitle>
                                        <DialogContent>
                                        <TextField id="outlined-basic" name={answerText.Id} required margin="dense" label="Answer" defaultValue={answerText.Body} type="text" fullWidth onChange={editAnswer}/>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleCloseEditAnswer} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={EditAnswer} color="primary">
                                            Edit
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                <IconButton onClick={handleDeleteAnswer} name={answerText.Id}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                                </div>
                            )}
                        </Paper>
                        </Grid>
    
                        <Grid item xs={2} /> {/*Space*/}
                        <Grid item xs={10}>
                            <Grid container spacing={1}>
                            <Grid item xs={12}>
                            <GetComments id = {answerText.Id} />
                            <TextField id="standard" name={answerText.Id} label="Add Comment" fullWidth onKeyPress={handleKeyDown}/>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    ))}
                </List>
                <Typography gutterBottom variant="h6" component="h5" color ="#000">
                    Your Answer:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Include all the information someone would need to understand your solution
                </Typography>
                <TextareaAutosize id="outlined-basic" style={{width:"100%"}} minRows={10} aria-label="minimum height" placeholder = "Enter Detail Description of your Answer here" onChange={postAnswer}/>
            <br />
            <Button variant="contained" color="primary" onClick={handleAnswer}>
                Post Answer
            </Button>
            </Paper>
            </Grid>

            <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Box>
                <List>
                    <h2 style={{textAlign:"center"}}>Suggested questions</h2>
                    <Divider/>
                    {similarQ.map((text) => (
                    <Box>
                    <Typography gutterBottom variant="h6" component="h4" color ="#000">
                          <ListItemLink href={"/question/"+text.Id}>
                            <ListItemText primary={text.Title}/>
                          </ListItemLink>
                    </Typography>
                    <Divider/>
                    </Box>
                    ))}
                </List>  
                </Box>
            </Paper>
            </Grid>
        </Grid>
     </div>
 )
}

export default Question;