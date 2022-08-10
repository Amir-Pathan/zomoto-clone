import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import items from './drawerItem';
import { useNavigate } from 'react-router-dom';

export default function SideDrawer({open,handleOpen}) {

  const navigate=useNavigate()

  const toPath=(path)=>{
      navigate(path)
  }

  const list = () => (
    <Box
      sx={{width:'100%'}}
      role="presentation"
      onClick={()=>handleOpen(false)}
      onKeyDown={()=>handleOpen(false)}
    >
      <List>
        {items.map((i, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton 
            onClick={()=>toPath(i.path)}>
              <ListItemIcon>
                {i.icon}
              </ListItemIcon>
              <ListItemText primary={i.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
          <SwipeableDrawer
            anchor={'bottom'}
            open={open}
            onClose={()=>handleOpen( false)}   
            onOpen={()=>handleOpen(true)}
          >
            {list()}
          </SwipeableDrawer>
    </div>
  );
}
