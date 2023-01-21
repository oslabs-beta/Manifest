import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';
// import CircularProgress from '@material-ui/core/CircularProgress';
const ddClient = createDockerDesktopClient();

export function Mainpage() {
  const [containersLoaded, changeContainersLoaded] = useState(false);
  const [containerArray, setResponse] = useState([]);

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

 

  const containerComponents = [];
  for (let i = 0; i < containerArray.length; i++) {
    containerComponents.push(
      <button className='containerButton' key={i}>
        <Link  to={`/container/${containerArray[i].ID}`} state = {{containerData: containerArray[i]}}>
          <h3>{containerArray[i].Name || containerArray[i].Names[0]}</h3>
          <hr />
          <p>Memory Used:</p>
          <p> {containerArray[i].MemUsage || ''}</p>
          <p>{containerArray[i].MemPerc || ''}</p>
        </Link>
      </button>
    );
  }
  
  return (
    <>
      {containersLoaded 
        ? <div className='mainPageWrapper'>
            <h1>Running Containers</h1>
            
            <div className="containers">
              {containerComponents}
            </div>
          </div>
        : <div className = 'mainPageWrapper'>
            <h1>Containers Loading, please wait...</h1>
            {/* <CircularProgress /> */}
          </div>
      }
            
    </>
  );
}
