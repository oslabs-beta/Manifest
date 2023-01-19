import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Containers } from '../containers/containers';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function Mainpage(props) {
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();
  const navigate = useNavigate();

  useEffect(() => {
    const loadContainers = async () => {
      const names = await ddClient.docker.listContainers();
      // console.log(names);
      setResponse(JSON.stringify(names));
    };
    loadContainers();
  }, []);

  useEffect(() => {
    const callContainers = async () => {
      const stats = await ddClient.docker.cli.exec('stats', [
        '--no-stream',
        '--no-trunc',
        '--format',
        '"{{json .}}"',
      ]);
      setResponse(JSON.stringify(stats.parseJsonLines()));
      // console.log('this is response: ', response);
    };
    callContainers().catch(console.error);
  });

  let containerComponents = [];
  if (response) {
    const containerArray = JSON.parse(response);
    // console.log('this is container array: ', containerArray);
    for (let i = 0; i < containerArray.length; i++) {
      containerComponents.push(
        <button
          className="containerButton"
          onClick={() =>
            navigate(
              `/container/${containerArray[i].ID || containerArray[i].Id}`
            )
          }
        >
          Name: {containerArray[i].Name || containerArray[i].Names[0]}
          <hr />
          <p>Memory Used: {containerArray[i].MemUsage || ''}</p>
          <p>{containerArray[i].MemPerc || ''}</p>
        </button>
      );
    }
  }

  // console.log(containerComponents);
  return (
    <>
      <div className="containers">{containerComponents}</div>
    </>
  );
}
