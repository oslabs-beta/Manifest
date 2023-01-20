import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import { Containers } from './components/containers/containers';

import ContainerContext from './container-context';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();
// const readableStream = new Stream.Readable();

function useDockerDesktopClient() {
  return client;
}

export function App() {

  const [dataStore, setDataStore] = React.useState({});



  const ddClient = createDockerDesktopClient();
  const updateContainerData = async () => {
    const stats = await ddClient.docker.cli.exec('stats', [
      '--no-stream',
      '--no-trunc',
      '--format',
      '"{{json .}}"',
    ]).then(res => res.parseJsonLines());
    setDataStore(stats);  
  };

  setInterval(updateContainerData, 2000);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>

            <Route
              path="/"
              element={
                <ContainerContext.Provider value={dataStore}>
                  <Mainpage />
                </ContainerContext.Provider>
              }
            />

          {/* <ContainerContext.Provider value={dataStore[id]}> */}
            <Route path="/container/:id" element={<Containers />} />
          {/* </ContainerContext.Provider> */}
        </Routes>
      </Router>
      {/* <Button variant="contained" onClick={fetchAndDisplayResponse}>
        Call backend
      </Button> */}
    </>
  );
}
