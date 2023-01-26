import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import { Containers } from './components/containers/containers';
import { Menu } from './components/menu/menu';
import  getSoftMemoryLimit  from './getSoftMemLimits'
import ContainerContext from './container-context';
import { DockerDesktopClient } from '@docker/extension-api-client-types/dist/v1';
import ContainerData from './components/types/containerData';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

const REFRESH_DELAY = 2000; // let user change

// function useDockerDesktopClient() {
//   return client;
// }
// let count = 1;
const updateContainerData = async (
  client: DockerDesktopClient,
  setDataStore: React.Dispatch<React.SetStateAction<ContainerData[]>>,
  setContainersLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setIdArr: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    
  const stats = await client.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
  setDataStore(stats);
  setContainersLoaded(true);
  const idArr = stats.map(containerObj => containerObj.ID);
  setIdArr(idArr);

  // console.log(stats);
  // count++;
};

export function App() {
  const [dataStore, setDataStore] = React.useState<ContainerData[]>([]);
  const [containersLoaded, setContainersLoaded] = React.useState(false);
  const [idArr, setIdArr] = React.useState<string[]>([]);
  const [softMemObj, setSoftMemObj] = React.useState({});
  /*{
    containerID : Soft mem limit
  }*/
  
  
  //will run every time idArr is updated
  useEffect(()=>{
    getSoftMemoryLimit(idArr).then(newSoftMemObj => {
      // console.log('new mem obj:', newSoftMemObj)
      setSoftMemObj(newSoftMemObj);
    });
    
  },[idArr]);

  //will run when the componenet first mounts --> never again
  useEffect(() => {
    //first we will get the container data
    updateContainerData(client, setDataStore, setContainersLoaded, setIdArr);
    //then setup an interval to re-fresh the data every 2 seconds
    setInterval(() => {
      updateContainerData(client, setDataStore, setContainersLoaded, setIdArr);
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
