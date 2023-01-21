import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerContext from '../../container-context';

const ddClient = createDockerDesktopClient();

export function Mainpage(props: any) {
  const { containersArray, containersLoaded } = props;
  const containerComponents = [];

  if(containersLoaded){
    containersArray.forEach((element) => {
    containerComponents.push( 
            <button
              className="containerButton"
              key={`containerButton-${element.Name}`}
            >
              <Link
                to={`/container/${element.ID}`}
                state={{ element }}
              >
                <h3>{element.Name}</h3>
                <hr />
                <p>Memory Used:</p>
                <p> {element.MemUsage }</p>
                <p>{element.MemPerc }</p>
              </Link>
            </button>
      )
    });
  }

  return (
    <>
      {containersLoaded ? (
        <div className="mainPageWrapper">
          <h1>Running Containers</h1>
          <div className="containers">{containerComponents}</div>
        </div>
      ) : (
        <div className="mainPageWrapper">
          <h1>Containers Loading, please wait...</h1>
          <CircularProgress />
        </div>
      )}
    </>
  );
}
