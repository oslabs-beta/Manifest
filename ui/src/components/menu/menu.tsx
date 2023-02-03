import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import './menu.scss';
import { openExternalLink } from '../../interactingWithDDClient';



export function Menu() {
  

  return (
    <div className="menu">
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem onClick = {() => openExternalLink('https://github.com/oslabs-beta/Dockery')}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText>View Docs</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
