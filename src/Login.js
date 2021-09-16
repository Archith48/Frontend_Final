import React, {useState} from "react"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    justifyContent:"center",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Login() {
  const history = useHistory()
  //const location = useLocation()
  //console.log(location.pathname)
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    history.push('/')
    //setOpen(true);
  };

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [url,setUrl] = useState("");  

  const responseSuccessGoogle = (response) =>{
    console.log(response);
    axios({
      method: "POST",
      url: 'http://localhost:5050/api/googlelogin',
      data: {tokenId: response.tokenId, accessToken: response.accessToken}
    }).then(response => {
      console.log(response);
      console.log("Google login Success", response);
      localStorage.setItem("profile", JSON.stringify(response.data))
      history.push('/')
      console.log(JSON.parse(window.localStorage.getItem('profile')).Id);
      console.log(JSON.parse(window.localStorage.getItem('profile')));
      window.location.reload()
      //console.log(response.data)
      //history.push(JSON.parse(localStorage.getItem("path").path))
    })
  }

  const responseFailureGoogle = (response) =>{
    console.log(response);
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}> 
          <b>Join Telstra Skill Enhancement Portal</b>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Join Telstra Skill Enhancement Portal to post a Question, Answer, Vote and Comment comment
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary" fullWidth >
          <GoogleLogin 
          clientId="457453379813-1ei0s3u553o1elucdfbmhj6c8v6cknt7.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={'single_host_origin'}
          /> 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login

/* setName(response.profileObj.name);
setEmail(response.profileObj.email);
setUrl(response.profileObj.imageurl);
 */