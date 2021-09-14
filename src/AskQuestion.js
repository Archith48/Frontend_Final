import {makeStyles} from '@material-ui/core/styles';

import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "100%"
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

function AskQuestion(){
    const classes = useStyles();
    var token = JSON.parse(window.localStorage.getItem('profile')).accessToken
    // var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0MjE3YjhkYWRiYjM2NTc4MzU4MGY5ZTkyNDg3ZDcwMWNkMzhmZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDU3NDUzMzc5ODEzLTFlaTBzM3U1NTNvMWVsdWNkZmJtaGo2Yzh2NmNrbnQ3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDU3NDUzMzc5ODEzLTFlaTBzM3U1NTNvMWVsdWNkZmJtaGo2Yzh2NmNrbnQ3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MzkwNDU0MjAzNjMyODE4OTI5IiwiZW1haWwiOiJhcmNoaXRoczA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicEl0T0ZPbzFwaDhRc1pXeXVKa29kZyIsIm5hbWUiOiJBcmNoaXRoIFMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeDEyMEMzU215SDVqT2R6TFZRWDcyS3ZzQTR2VUdBSG5QODV2MHo9czk2LWMiLCJnaXZlbl9uYW1lIjoiQXJjaGl0aCIsImZhbWlseV9uYW1lIjoiUyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjMxNTU2NTg5LCJleHAiOjE2MzE1NjAxODksImp0aSI6ImVmN2Q1Yzk3ZDg1OGFiOTUxYWY1NjdhNGI4NmUwYjQxMGE3NzMwZDcifQ.rwoGYpEnUc9yW8prnE_gEEwVd1ezZn1zVQJ2Bjyfn1QNCgxVYkuyLX-oWupXme_Zza45idU0x9E7saRpKXm3jmzFtfKGTXu85N9KlRhS3aJQ6DO0PSf2w9Xlw-I03p2W9OnH_hX6tU1kpSBUCw7slAAPN2fy5h_4bZROzbQBQkn3g9VfKA7k8cag-JDSfflHBd6q_czfr0Ni5f2l7NL5xkZMohvfi1Xuh2D6PclLvJlInBAOmAlSx5vsf8adlHR3gmFNFbaLroaf3ermY-DBKcPF0ukfPVH06Zzi3CZowkssfGm44nSGwSRJpd9HWj4vhsFdcPmYkjGXuJakhvK-bw"
    console.log(token)
    var title, body, tags;
    const setTitle = (e)=>{
        title=e.target.value
    }
    const setBody = (e)=>{
        body=e.target.value
    }
    const setTag = (e)=>{
        tags=e.target.value
        tags = tags.split(',')
        console.log(tags)
    }
    
    const handleSubmit = (e)=>{
        fetch('http://localhost:8089/questions/add',{
            method:'POST',
            headers:{"Content-type":"application/json",
                     "x-access-token":token},
            body:JSON.stringify({"Title":title,
                                  "Body":body,
                                  "Tags":tags})
            })
            .then(res=>(res.json()))   
            .then(data=>{
                console.log(data)
            })
            .then(()=>
            alert("Question Posted")) 
    }
    return(
        <div>
        <NavBar />
        <br />
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        <form action="" name = "questionForm" className ={classes.root}>
            <Typography gutterBottom variant="h4" component="h5" color ="#000">
                <b>Ask a Public Question</b>
            </Typography>
            <Box>
            <Typography gutterBottom variant="h6" component="h5" color ="#000">
                Title:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" >
                Be specific and imagine you are asking question to another person
            </Typography>
            </Box>
            <TextField id="outlined-basic" label="Title of Question" width="100%" variant="outlined"  onChange={setTitle}/>
            <Box>
                <Typography gutterBottom variant="h6" component="h5" color ="#000">
                    Body:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Include all the information someone would need to answer your question
                </Typography>
            </Box>
            <TextareaAutosize id="outlined-basic" aria-label="minimum height" width="95%" minRows={10} placeholder = "Enter Detail Description of Question here"  onChange={setBody} />

            <Box>
            <Typography gutterBottom variant="h6" component="h5" color ="#000" >
                Tags:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Add up to 5 tags to describe what your question is about
            </Typography>
            </Box>
            <TextField id="outlined-basic" label="Tags" width="100%" variant="outlined" onChange={setTag} />
            <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Post Question
            </Button>
            </div>
        </form>
        </Paper>
        </Grid>
        </Grid>
        </div>
    )
}
export default AskQuestion;