import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  useEffect(() => {
    const callContainers = async () => {
      const containers = await ddClient.docker.listContainers();
      setResponse(JSON.stringify(containers));
    };
    callContainers().catch(console.error);
  });
  const fetchAndDisplayResponse = async () => {
    console.log('Hello! You pressed the button :)');
    const result = await ddClient.extension.vm?.service?.get('/hello');

    //This line gets the containers from the ddClient
    const containers = await ddClient.docker.listContainers();
    console.log('Running containers are:', containers);

    setResponse(JSON.stringify(containers));
    // console.log(typeof response);
  };

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage containers={response} />} />
          {/* <Route path='/container/:id'  /> */}
        </Routes>
      </Router>
      {/* <Button variant="contained" onClick={fetchAndDisplayResponse}>
        Call backend
      </Button> */}
    </>
  );
}
