import React from "react";
import { ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory, useLocation } from "react-router-dom";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SideBarChanges(props){
  var history = useHistory()
    if (props.status){
      return(
        <div>
        <ListItemLink href="/profile"><ListItemIcon><AccountCircle /></ListItemIcon><ListItemText primary="Profile" /></ListItemLink>
        <ListItemLink onClick={()=>{
            localStorage.clear()
            history.push('/')
            window.location.reload()
          }}><ListItemIcon><PowerSettingsNewIcon /></ListItemIcon><ListItemText primary="Log Out" /></ListItemLink>
        </div>
      )
    }
    else{
      return(
        <div>
        <ListItemLink href="/login"><ListItemIcon><PowerSettingsNewIcon /></ListItemIcon><ListItemText primary="Log In" /></ListItemLink>
        </div>
      )
    }
}

export default SideBarChanges;