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
    const callContainers = async () => {
      const stats = await ddClient.docker.cli.exec('stats', [
        '--no-stream',
        '--format',
        '"{{json .}}"',
      ]);
      setResponse(JSON.stringify(stats.parseJsonLines()));
      console.log('this is response: ', response);
    };
    callContainers().catch(console.error);
  });

  let containerComponents = [];
  if (response) {
    const containerArray = JSON.parse(response);
    console.log('this is container array: ', containerArray);
    for (let i = 0; i < containerArray.length; i++) {
      containerComponents.push(
        <button
          className="containerButton"
          // onClick={navigate(`/containers/${containers[i].id}`)}
        >
          Name: {containerArray[i].Name}
          <hr />
          <p>Memory Used: {containerArray[i].MemUsage}</p>
          <p>{containerArray[i].MemPerc}</p>
        </button>
      );
    }
  }

  console.log(containerComponents);
  return (
    <>
      <div className="containers">{containerComponents}</div>
    </>
  );
}
