import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './DocsButton.scss';
import { openExternalLink } from '../../interactingWithDDClient';

//Returns a button that when clicked on- opens up the docs in the user's browser of choice
export function DocsButton(): JSX.Element {
  return (
      <Button onClick={() => openExternalLink('https://github.com/oslabs-beta/Dockery')}>
        <p>Docs</p>
        <GitHubIcon />
      </Button>
  );
}
