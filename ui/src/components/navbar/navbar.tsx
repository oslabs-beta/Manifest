import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { DocsButton } from '../menu/DocsButton';
import Refresh from '@mui/icons-material/Refresh';
import ContainerData from '../types/containerData';
import './navbar.scss';
import {
  formatBytes,
  formatMemUsage,
} from '../../formattingBytes/formattingBytes';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

interface props {
  containersArray: ContainerData[];

}

export function Navbar(props: props) {
  const { containersArray } = props;
  const [totalMemUsage, setTotalMemUsage] = React.useState<string>();

  /**************
  Whenever containers array updates, this will calculate the total amount of memory being used
  If it is undefined, it will just display 'Loading'
  ***************/
  useEffect(() => {
    if (containersArray !== undefined) {
      const totalMem: number = containersArray.reduce((acc, curr) => {
        acc += formatMemUsage(curr.MemUsage);
        return acc;
      }, 0);
      setTotalMemUsage(formatBytes(totalMem, 'Loading'));
    }
  }, [containersArray]);
  
  return (

      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          style={{ position: 'absolute', left: '25px' }}
          onClick={() => location.reload()}
        >
          <Refresh/>
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{
                  margin: 'auto',
                  width: '50%',
                  textAlign: 'center',
                }}
        >
          Total Memory Usage: {totalMemUsage}
        </Typography>
        <DocsButton />
      </Toolbar>

  );
}
