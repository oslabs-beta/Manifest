import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import './mainpage.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerContext from '../../container-context';
import DoughnutChart from '../charts/doughnut';
import ContainerData from '../types/containerData';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';
import Containers from '../containers/containers';

// const ddClient = createDockerDesktopClient();

interface Props {
  containersArray: ContainerData[];
  containersLoaded: boolean;
  softMemObj: any;
}

interface containerInfo {
  containerNames: string[];
  containerMemPerc: number[];
}

export function Mainpage(props: Props) {
  const { containersArray, containersLoaded, softMemObj } = props;
  const containerRows: JSX.Element[] = [];
  console.log(softMemObj);
  let containerNames: any = [];
  let containerMemPerc: any = [];
  if (containersLoaded) {
    containersArray.forEach((element) => {
      containerRows.push(
        <Containers
          ID={element.ID}
          MemUsage={element.MemUsage}
          MemPerc={element.MemPerc}
          Name={element.Name}
          softLimit={softMemObj[element.ID]}
        />
      );
      containerNames.push(element.Name);
      containerMemPerc.push(parseFloat(element.MemPerc));
    });
  }

  return (
    <>
      {containersLoaded ? (
        <div className="mainPageWrapper">
          <div className="doughnutCharts">
            <DoughnutChart
              containerNames={containerNames}
              containerMemPerc={containerMemPerc}
              maxMem={8}
              className="doughnutChart"
              id="doughnutChart1"
            />
            <DoughnutChart
              containerNames={containerNames}
              containerMemPerc={containerMemPerc}
              className="doughnutChart"
              id="doughnutChart2"
            />
          </div>
          <h1>Running Containers</h1>
          <table className="mainPageTable">
            <thead>
              <tr>
                <th> Name </th>
                <th> Current Mem Usage </th>
                <th> Hard Limit / % Used </th>
                <th> Soft Limit / % Used </th>
                {/* <th> Expand </th> */}
              </tr>
            </thead>
            <tbody>{containerRows}</tbody>
          </table>
          {/* <div className="containers">{containerComponents}</div> */}
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
