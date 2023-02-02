import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import Containers from './components/tables/tablerow';
import ContainerData from './components/types/containerData';
import {
  getContianerIds,
  getMemLimits,
  getContainerMetrics,
  getTotalMemoryAllocatedToDocker,
} from './interactingWithDDClient';
// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

//REFRESH_DELAY controls how often (in milliseconds) we will querry the Docker desktop client to recieve updates about our running containers.
const REFRESH_DELAY = 2000;

export function App() {
  /* 
  dataStore is an array that holds objects. Each object holds data about a specific container 
  */
  const [dataStore, setDataStore] = React.useState<ContainerData[]>([]);
  //containersLoaded is bool indicating weather or not we've recieved data from the docker desktop client.
  const [containersLoaded, setContainersLoaded] = React.useState(false);
  //softMemObj holds key:values where key is container ID and value is the soft limit. If not soft limit, null is assigned.
  const [memObj, setMemObj] = React.useState({});
  const [totalDockerMem, setTotalDockerMem] = React.useState<number>(0);
  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  /*
  memOBJECT
  {
    containerID: {softLimit: some num OR NULL
                  hardLimit: some num oR NULL
                  }
  }
  */

  /*******************
   updateContainerData
   *******************
  Gets the updated data on container metrics then sets the dataStore accordingly.
  Also sets containersLoaded to true
  and calls itself again after the REFRESH_DELAY
  */
  const updateContainerData = () => {
    getContainerMetrics().then((containerMetricsObject) => {
      setDataStore(containerMetricsObject);
      setContainersLoaded(true);
      setTimeout(updateContainerData, REFRESH_DELAY);
    });
  };

  /*******************
   useEffect
   *******************
  Runs when container first loads ONLY. Does 3 things:
    1. gets a list of all container id's
    2. creates the soft memory object --> softMemObj piece of state. 
        softMemObj is object where keys are container id and values are soft memory limit in bytes. if no limit is set - value is null. 
    3. calles updateContainerData to start the refreshing behind the scenes. 
  */
  useEffect(() => {
    //Gets a list the ID's of all running containers
    getContianerIds().then((containerIdArray) => {
      //Creates a memory limit object which holds key:value pairs where the key is the container id and the value is the soft limit for that container (null if not set)
      getMemLimits(containerIdArray).then((memoryLimitObject) => {
        //Setting the softMemObj (piece of state) so that we can access those softMem properties later
        setMemObj(memoryLimitObject);
        //now we want to querry the DDCLient to figure out total memory allocated to docker
        getTotalMemoryAllocatedToDocker().then((totalMem) => {
          setTotalDockerMem(totalMem);
          //Now, we want to querry the DD Client once again to get the object of all the other metrics we are tracking
          updateContainerData();
        });
      });
    });
  }, []);

  /***************** 
   This section of code creates an array: routesArray
   routesArray holds JSX elements
   Each element is a route to a specific containers page 
  *****************/

  return (
    <>
      <Navbar
        containersArray={dataStore}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Mainpage
        containersArray={dataStore}
        containersLoaded={containersLoaded}
        memObj={memObj}
        totalDockerMem={totalDockerMem}
        darkMode={darkMode}
      />
    </>
  );
}
