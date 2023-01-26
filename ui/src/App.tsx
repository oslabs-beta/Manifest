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
import { DockerDesktopClient } from '@docker/extension-api-client-types/dist/v1';
import ContainerData from './components/types/containerData';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

const REFRESH_DELAY = 2000; // let user change

function useDockerDesktopClient() {
  return client;
}
// let count = 1;
const updateContainerData = async (
  client: DockerDesktopClient,
  setDataStore: React.Dispatch<React.SetStateAction<ContainerData[]>>,
  setContainersLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const stats = await client.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
  setDataStore(stats);
  setContainersLoaded(true);

  // console.log(stats);
  // count++;
};

export function App() {
  const [dataStore, setDataStore] = React.useState<ContainerData[]>([]);
  const [containersLoaded, setContainersLoaded] = React.useState(false);

  // console.log('this is the data store:', dataStore);
  //will run once when container is loaded

  useEffect(() => {
    updateContainerData(client, setDataStore, setContainersLoaded);
    setInterval(() => {
      updateContainerData(client, setDataStore, setContainersLoaded);
    }, REFRESH_DELAY);
  }, []);

  const routesArray: React.ReactElement[] = [];

  for (const elem of dataStore) {
    routesArray.push(
      <Route
        key={`container-button-${elem.Container}`}
        path={`/container/${elem.ID}`}
        element={<Containers container={elem} />}
      />
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Mainpage
                containersArray={dataStore}
                containersLoaded={containersLoaded}
              />
            }
          />
          {routesArray}
        </Routes>
      </Router>
    </>
  );
}
