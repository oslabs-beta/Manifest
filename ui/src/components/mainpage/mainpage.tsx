import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerContext from '../../container-context';

const ddClient = createDockerDesktopClient();

export function Mainpage() {
  const [containersLoaded, changeContainersLoaded] = useState(false);
  const [containerArray, setContainerArray] = useState();

  useEffect(() => {
    const getContainerData = async () => {
      const stats: any = await ddClient.docker.cli
        .exec('stats', [
          '--no-stream',
          '--no-trunc',
          '--format',
          '"{{json .}}"',
        ])
        .then((res) => res.parseJsonLines());
      setContainerArray(stats);
      changeContainersLoaded(true);
    };
    getContainerData();
  }, []);

  const containerStore: any = useContext(ContainerContext);

  // const containerComponents = [];
  // for (let i = 0; i < containerArray.length; i++) {
  //   containerComponents.push(
  //     <button className="containerButton" key={i}>
  //       <Link
  //         to={`/container/${containerArray[i].ID}`}
  //         state={{ containerArray[i]: containerArray[i] }}
  //       >
  //         <h3>{containerArray[i].Name || containerArray[i].Names[0]}</h3>
  //         <hr />
  //         <p>Memory Used:</p>
  //         <p> {containerArray[i].MemUsage || ''}</p>
  //         <p>{containerArray[i].MemPerc || ''}</p>
  //       </Link>
  //     </button>
  //   );
  // }

  console.log('store: ', containerStore);
  const containerComponents = [];
  for (let i = 0; i < containerStore.length; i++) {
    const container = containerStore[i];
    containerComponents.push(
      <ContainerContext.Consumer>
        {(dataStore) => (
          <button
            className="containerButton"
            key={`containerButton-${container.Name}`}
          >
            <Link
              to={`/container/${container.ID}`}
              // state={{ containerArray[i]: container }}
            >
              <h3>{container.Name}</h3>
              <hr />
              <p>Memory Used:</p>
              <p> {container.MemUsage || ''}</p>
              <p>{container.MemPerc || ''}</p>
            </Link>
          </button>
        )}
      </ContainerContext.Consumer>
    );
  }

  // console.log(containerComponents);
  return (
    <>
      {containersLoaded ? (
        <div className="mainPageWrapper">
          <h1>Running Containers</h1>
          {/* <hr /> */}
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
