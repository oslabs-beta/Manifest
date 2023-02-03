import { useEffect, useState, useContext } from 'react';

import './mainpage.scss';
import CircularProgress from '@mui/material/CircularProgress';

import DoughnutChart from '../charts/DoughnutChart';
import ContainerData from '../types/containerData';

import TableRow from '../tables/tablerow';
import { formatMemUsage } from '../../formattingBytes/formattingBytes';

interface Props {
  containersArray: ContainerData[];
  containersLoaded: boolean;
  memObj: any;
  totalDockerMem: number;
  updateMemoryObject: () => Promise<void>
}

interface containerInfo {
  containerNames: string[];
  containerMemPerc: number[];
}

export function Mainpage(props: Props) {
  const {
    containersArray,
    containersLoaded,
    memObj,
    totalDockerMem,
    updateMemoryObject
  } = props;
  /**************
  tableRows variable is what we are rendering, it is an array of react components
  ***************/
  const tableRows: JSX.Element[] = [];

  /**************
  containerNames and containerMemPerc are arrays which is passed into the charts' data because the charts require arrays to render
  ***************/
  let containerNames: string[] = [];
  let containerMemPerc: number[] = [];

  /**************
  This pushes react components into tableRows array to be rendered passing down the necessary props it needs
  ***************/
  if (containersLoaded) {
    containersArray.forEach((element) => {
      const elementMemUsage = formatMemUsage(element.MemUsage);
      tableRows.push(
        <TableRow
          key={`TableRow${element.ID}`}
          ID={element.ID}
          containerName={element.Name}
          memUsageReadableString={element.MemUsage}
          byteUsage={elementMemUsage}
          softLimit={memObj[element.ID].softLimit}
          hardLimit={memObj[element.ID].hardLimit}
          totalDockerMem={totalDockerMem}
          updateMemoryObject = {updateMemoryObject}
        />
      );
      containerNames.push(element.Name);
      containerMemPerc.push(elementMemUsage);
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
              maxMem={totalDockerMem}
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
          <h1>
            Running Containers
          </h1>
          <table>
            <thead>
              <tr>
                <th id="tableName">
                  Name
                </th>
                <th id="tableMemUsage">
                  Mem Usage
                </th>
                <th id="tableHardLim">
                  Hard Limit / % Used
                </th>
                <th id="tableSoftLim">
                  Soft Limit / % Used
                </th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
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
