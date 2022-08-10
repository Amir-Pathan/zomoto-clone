import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from '../drawer';

export default function Header() {

  const [drawerOpen,setOpen] = useState(false)

  const handleOpen=(open)=>setOpen(open)


  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{
        backgroundColor:'#CB202D'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zomoto
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>handleOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    <SideDrawer
    open={drawerOpen}
    handleOpen={(open)=>handleOpen(open)}
    />
    </>
  );
}
