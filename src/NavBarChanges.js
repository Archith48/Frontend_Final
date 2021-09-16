import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { IconButton, Button } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Notifications from "./Notifications";


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function NavBarChanges(props){
    var history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElProfile, setAnchorElProfile] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickProfile = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    };

    const open = Boolean(anchorEl);
    const openProfile = Boolean(anchorElProfile);
    const id = open ? 'simple-popover' : undefined;
    const idProfile = openProfile ? 'simple-popover-profile' : undefined;

    if (props.status){
      return(
        <div>
          <IconButton aria-label="show 17 new notifications" color="#000" onClick={handleClick}>
            <Badge badgeContent={window.localStorage.getItem('length')} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
                style: { width: '30%' },
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal:'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
          >
        <Notifications />
        </Popover>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="#000"
            onClick={handleClickProfile}
          >
            <AccountCircle />
          </IconButton>
          <Popover
            id={idProfile}
            open={openProfile}
            anchorEl={anchorElProfile}
            onClose={handleCloseProfile}
            PaperProps={{
                style: { width: '20%' },
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal:'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
          >
          <List>
          <ListItemLink href="/profile"><ListItemIcon><AccountCircle /></ListItemIcon><ListItemText primary="Profile" /></ListItemLink>
          <ListItemLink href="/users"><ListItemIcon><EditIcon /></ListItemIcon><ListItemText primary="Edit Profile" /></ListItemLink>
          <ListItemLink onClick={()=>{
            localStorage.clear()
            history.push('/')
            window.location.reload()
          }}><ListItemIcon><PowerSettingsNewIcon /></ListItemIcon><ListItemText primary="Log Out" /></ListItemLink>
        </List>
        </Popover>
        </div>
      )
    }
    else {
      return(
        <div>
          <Button variant="contained" color="primary" href="/login">
              LogIn
          </Button>
        </div>
      )
    }
}

export default NavBarChanges;