import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './DocsButton.scss';
import { openExternalLink } from '../../interactingWithDDClient';



export function DocsButton() {
  return (
      <Button onClick={() => openExternalLink('https://github.com/oslabs-beta/Dockery')}>
        <p>Docs</p>
        <GitHubIcon />
      </Button>
  );
}
