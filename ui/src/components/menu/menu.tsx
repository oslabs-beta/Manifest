import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Settings from '@mui/icons-material/Settings';
import DarkMode from '@mui/icons-material/DarkMode';
import './menu.scss';

interface props {
  darkMode: boolean;
  setDarkMode: (a: boolean) => void;
}

export function Menu(props: props) {
  const { setDarkMode, darkMode } = props;

  return (
    <div className="menu">
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
            {/* <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography> */}
          </MenuItem>
          <MenuItem onClick={() => setDarkMode(!darkMode)}>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText>Dark Mode</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
