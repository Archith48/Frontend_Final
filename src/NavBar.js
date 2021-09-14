import React from 'react';
import clsx from 'clsx';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/Group';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import { ClickAwayListener, Drawer, Popover } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import pic from './Telstra.png';
import NavBarChanges from './NavBarChanges';
import SideBarChanges from './SideBarChanges';

var isLoggedIn = false
if(localStorage.getItem('profile')){
  isLoggedIn = true
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: '#000',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#000',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function NavBar() {
  document.title = "Skill Enhancment Portal"
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  var search_input;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  
  const handleKeyDown=(e)=>{
    if (e.key==='Enter')
    {
      console.log("Entered")
      console.log(e.target.value)
      if ((e.target.value).indexOf("name:")===0)
      {
        search_input=e.target.value.substring(5,(e.target.value).length)
        history.push("/searchcusts/"+search_input)
        console.log("Name entered")
        console.log("After title")       
      }
      else if ((e.target.value).indexOf('"')===0 && (e.target.value).lastIndexOf('"')===(e.target.value).length-1)
      {
        search_input=(e.target.value).substring(1,(e.target.value).length-1)
        history.push("/searchpost/"+search_input)
        console.log("Post entered")
      }
      else
      {
        search_input=(e.target.value).substring(1,(e.target.value).length-1)
        history.push("/searchTags/"+search_input)
        console.log("Tag entered")
      }
    }
  }

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#FFFAFA' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="#000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <a href='/'><img height='40px' width="40px" src={pic} align="center" ></img></a>
          <Box padding="2px" color="#000">
            <a href='/home' style={{textDecoration:'None'}}><b>Skill Enhancement</b> <br />
            Portal</a>
          </Box>
          <PopupState>
          {(popupState) => (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleKeyDown}
              {...bindTrigger(popupState)}
            />
            <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: { width: '60%' }
            }}
          >
            <Box p={2}>
              <Typography>
                <b>[tag]</b> Search by a tag <br /><br />
                <b>name: username</b> Search by a user <br /><br />
                <b>"word here"</b> Search by a post <br /><br />
                <Divider /><br />
                <Button variant="contained" color="primary" href = "/askquestion">
                    Ask Question
                </Button>
              </Typography>
            </Box>
          </Popover>
          </div>
          )}
          </PopupState>
          <div className={classes.grow} />
          <NavBarChanges status = {isLoggedIn}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink href="/"><ListItemIcon><HomeIcon /></ListItemIcon><ListItemText primary="Home" /></ListItemLink>
          <ListItemLink href="/questions"><ListItemIcon><QuestionAnswerIcon /></ListItemIcon><ListItemText primary="Questions" /></ListItemLink>
          <ListItemLink href="/trending"><ListItemIcon><WhatshotIcon /></ListItemIcon><ListItemText primary="Trending" /></ListItemLink>
          <ListItemLink href="/users"><ListItemIcon><GroupIcon /></ListItemIcon><ListItemText primary="Users" /></ListItemLink>
          <ListItemLink href="/askquestion"><ListItemIcon><PostAddIcon /></ListItemIcon><ListItemText primary="Ask Question" /></ListItemLink>
          <SideBarChanges status={isLoggedIn}/>
        </List>
        <Divider />
        </Drawer>
    </div>
    </ClickAwayListener>
  );
}

export default NavBar;