import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';

import pic from './Telstra.png';
import NavBar from './NavBar';

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
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
    <div className={classes.root}>
      <br />
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
            <img className={classes.img} src={pic} align="center" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3" >
                  <b>Skill Enhancement</b><br/>
                  Portal
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Paper className={classes.paper}>
          <Grid>
              <Typography className={classes.typography}>
                <b>Telsta Skill Enhance Portal</b> is an internal question and answer site for professional and enthusiast telstra coders. It's planned to build to interweave the training outcome as part of the skill network of Q&A sites. A lot of content is present in form of stack overflow questions and answers, various studies point that developers face problems while development life cycles and they ask questions on stack overflow which gets answered by fellow developers across the globe. 
                <br />
                In order for a new developer to understand a concept or solve an issue, it is very difficult to identify the problems. It involves domain experts in form of experienced software developers. The information present is overwhelming and at times can be too much to handle for a budding developer
          </Typography>
          </Grid>
      </Paper>
      <br/>
      <Paper className={classes.paper}>
      <Grid container spacing={2}>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Typography>Do you have any Public Question?</Typography> <br /><br />
                <Button variant="contained" color="primary" href = "/askquestion" style={{margin: '0 auto', display: "flex"}}>
                    Ask Here
                </Button>
            </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
            <Typography>View the Questions Posted by Telstra Employees</Typography> <br />
                <Button variant="contained" color="primary" href = "/questions" style={{margin: '0 auto', display: "flex"}}>
                    Click Here
                </Button>
            </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
            <Typography>See what is Trending among Telstra Coders</Typography> <br /><br />
                <Button variant="contained" color="primary" href = "/trending" style={{margin: '0 auto', display: "flex"}}>
                    Click Here
                </Button>
            </Paper>
            </Grid>
        </Grid>
        </Paper>
    </div>
    </div>
  );
}

export default Home;