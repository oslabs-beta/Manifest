import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { Menu } from '../menu/menu';
import './navbar.scss';

function HomeIcon(props: SvgIconProps) {
  console.log()
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export function Navbar() {
  // const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              style={{ position: 'absolute', left: '25px' }}
              // onClick={() => navigate('/')}
            >
              <HomeIcon fontSize="large" sx={{ flexGrow: 1 }} />
            </IconButton>
            <Popup
              trigger={
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ position: 'absolute', right: '10px' }}
                  // onClick={() => navigate('/menu')}
                >
                  <MenuIcon className="menuButton" />
                </IconButton>
              }
              modal
              nested
            >
              {
                // @ts-ignore: Unreachable code error
                (close) => <Menu />
              }
            </Popup>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
