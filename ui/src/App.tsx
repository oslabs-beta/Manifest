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
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}
// let count = 1;
const updateContainerData = async (ddClient, setDataStore, setContainersLoaded) => {
  const stats = await ddClient.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
  // stats[0] = Object.assign(stats[0], { MemPerc: count });
  setDataStore(stats);
  setContainersLoaded(true);
  console.log(stats);
  // count++;
};

export function App() {

  const [dataStore, setDataStore] = React.useState({});
  const [containersLoaded, setContainersLoaded] = React.useState(false);
  const ddClient = createDockerDesktopClient();



  //will run once when container is loaded
  useEffect(() => {
    updateContainerData(ddClient, setDataStore, setContainersLoaded)
    setInterval(() => { updateContainerData(ddClient, setDataStore, setContainersLoaded) }, 2000);
  }, [])

  const routesArray = [];
  for (const elem in dataStore) {
    routesArray.push(<Route path={`/container/${dataStore[elem].ID}`} element={<Containers container={dataStore[elem]} />}/>);
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage containersArray = {dataStore} containersLoaded = {containersLoaded}/>}/>
          {/* <Route path="/container/:id" element={<Containers containersArray = {dataStore} />}/> */}
          { routesArray }
        </Routes>
      </Router>
    </>
  );
}
