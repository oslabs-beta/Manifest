import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import { Containers } from './components/containers/containers';
import { Menu } from './components/menu/menu';

import ContainerContext from './container-context';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

export function App() {

  const [dataStore, setDataStore] = React.useState({});
  const [containersLoaded, setContainersLoaded] = React.useState(false);
  const ddClient = createDockerDesktopClient();

  const updateContainerData = async () => {
    const stats = await ddClient.docker.cli
      .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
      .then((res) => res.parseJsonLines());
    setDataStore(stats);
    
    setContainersLoaded(true);
  };

  //will run once when container is loaded
  useEffect(() => { 
    updateContainerData(); 
  }, [])

  //this will run whenever the dataStore Changes
  useEffect(() => {
    setTimeout(async () => {
      console.log('dataStore changed Deteceted, checking the store');
      const stats = await ddClient.docker.cli
      .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
      .then((res) => res.parseJsonLines());
      console.log('we got data back')
    }, 1000);
  }, [dataStore])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage containersArray = {dataStore} containersLoaded = {containersLoaded}/>}/>
          <Route path="/container/:id" element={<Containers />}/>
        </Routes>
      </Router>
    </>
  );
}
