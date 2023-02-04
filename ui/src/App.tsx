import React, { useEffect } from 'react';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import ContainerData from './components/types/containerData';
import {
  getContainerIds,
  getMemLimits,
  getContainerMetrics,
  getTotalMemoryAllocatedToDocker,
} from './interactingWithDDClient';

//REFRESH_DELAY controls how often (in milliseconds) we will query the Docker desktop client to recieve updates about our running containers.
const REFRESH_DELAY = 2000;

export function App() {
  
  //dataStore is an array that holds objects. Each object holds data about a specific container 
  const [dataStore, setDataStore] = React.useState<ContainerData[]>([]);

  //containersLoaded is bool indicating weather or not we've recieved data from the docker desktop client.
  const [containersLoaded, setContainersLoaded] = React.useState(false);

  //totalDockerMem is a number that is the total Bytes of memory allocated to docker desktop. Can be changed from DockerDesktop settings. 
  const [totalDockerMem, setTotalDockerMem] = React.useState<number>(0);

  //noContainers is boolean to indecate there are running containers or not
  const [noContainers, setNoContainers] = React.useState<boolean>(false);
  
  //mem object is a nested object containing the soft/hard memory limit for each container. See example memory object below
  const [memObj, setMemObj] = React.useState({});
  /* Example memObj
  memObj = {
      containerID: {
          softLimit: some num OR NULL
          hardLimit: some num oR NULL
      }
  }
  */

  /************
  updateMemoryObject --> This function gets all container ID's, then if there are no running containers, throws an error. 
  If there are runnin containers, then it gets the memory limits and sets the memObj to be equal to the memory limits of the objects
   *************/
  const updateMemoryObject = async (): Promise<void> => {
    await getContainerIds().then((containerIdArray) => {
      if(containerIdArray.length === 0){
        setNoContainers(true);
        throw new Error;
      } 
      else getMemLimits(containerIdArray).then((memoryLimitObject) => {
        setMemObj(memoryLimitObject);
      });
    });
  }

  /*******************
  updateContainerData --> Gets the updated data on container metrics then sets the dataStore accordingly.
  Also sets containersLoaded to true and calls itself again after the REFRESH_DELAY
  ********************/
  const updateContainerData = (): void => {
    getContainerMetrics().then((containerMetricsObject) => {
      setDataStore(containerMetricsObject);
      setContainersLoaded(true);
      setTimeout(updateContainerData, REFRESH_DELAY);
    });
  };

  /*******************
   useEffect
   *******************
  Runs when container first loads ONLY. Does 4 things: in this order:
    1. gets a list of all container id's
    2. creates the memory  object --> memObj is a piece of state
        memObj is object where keys are container id and values are soft memory limit in bytes. if no limit is set - value is null. 
    3. Gets the totalMemory allocated to docker and sets totalDockerMem piece of state
    4. calls updateContainerData to get metrics associated with each docker container
  */
  useEffect(() => {
    updateMemoryObject().then(res => {
      getTotalMemoryAllocatedToDocker().then((totalMem) => {
        setTotalDockerMem(totalMem);
        updateContainerData();
      });
    });
  }, []);

//return our navbar at the top and mainpage underneath it. Unless there are no containers running, then we alert the ueser. 
  return (
    <>
      <Navbar
      containersArray={dataStore}
    />
    {noContainers ? 
      (<h1 style = {{textAlign:'center'}}>Looks like there are no containers running please start one and refresh the app</h1>)
      : 
      (<Mainpage
      containersArray={dataStore}
      containersLoaded={containersLoaded}
      memObj={memObj}
      totalDockerMem={totalDockerMem}
      updateMemoryObject = {updateMemoryObject}
      />
      )
    }
   </>
  );
}
