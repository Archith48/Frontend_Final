import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';

function Header1(props){
  return (
    <div>
      <Toolbar style={{padding : "10px 200px"}}>
        <Typography gutterBottom variant="h5" color ="#textprimary" type="title" style={{ flex: 1}}>
          {props.heading}
        </Typography>
        <div>
          <Button variant="contained" color="primary" href = "/askquestion">
            Ask Question
          </Button>
        </div>
      </Toolbar>
      <Divider />
    </div>
  );
}

export default Header1;