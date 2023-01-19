import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';

const client = createDockerDesktopClient();
const ddClient = useDockerDesktopClient();
function useDockerDesktopClient() {
  return client;
}



export function Mainpage() {
  const [containersLoaded, changeContainersLoaded] = React.useState(false);
  const [containerArray, setResponse] = React.useState([]);


  useEffect(() => {
    const getContainerData = async () => {
      const stats = await ddClient.docker.cli.exec('stats', [
        '--no-stream',
        '--no-trunc',
        '--format',
        '"{{json .}}"',
      ]).then(res => res.parseJsonLines());
      setResponse(stats);
      changeContainersLoaded(true);
    };
    getContainerData();
  },[]);

 

  let containerComponents = [];
  
    console.log('this is container array: ', containerArray);
    for (let i = 0; i < containerArray.length; i++) {
      containerComponents.push(
        <button className='containerButton'>
        <Link  to={`/container/${containerArray[i].ID || containerArray[i].Id}`}>
          Name: {containerArray[i].Name || containerArray[i].Names[0]}
          <hr />
          <p>Memory Used: {containerArray[i].MemUsage || ''}</p>
          <p>{containerArray[i].MemPerc || ''}</p>
        </Link>
        </button>
      );
    }
  

  // console.log(containerComponents);
  return (
    <>
      {containersLoaded 
        ? <div className="containers">{containerComponents}</div>
        : <h1>Containers Loading, please wait...</h1>
      }
            
    </>
  );
}
