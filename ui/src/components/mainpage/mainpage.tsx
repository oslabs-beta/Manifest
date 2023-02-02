import { useEffect, useState, useContext } from 'react';

import './mainpage.scss';
import CircularProgress from '@mui/material/CircularProgress';

import DoughnutChart from '../charts/doughnut';
import ContainerData from '../types/containerData';

import TableRow from '../tables/tablerow';
import { formatMemUsage } from '../../formattingBytes/formattingBytes';

interface Props {
  containersArray: ContainerData[];
  containersLoaded: boolean;
  memObj: any;
  totalDockerMem: number;
  darkMode: boolean;
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
    darkMode,
  } = props;
  const tableRows: JSX.Element[] = [];

  let containerNames: any[] = [];
  let containerMemPerc: any[] = [];
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
          darkMode={darkMode}
          totalDockerMem={totalDockerMem}
        />
      );
      containerNames.push(element.Name);
      containerMemPerc.push(elementMemUsage);
    });
  }

  const style = darkMode
    ? { borderBottom: '1px solid white' }
    : { borderBottom: '1px solid black' };

  return (
    <>
      {containersLoaded ? (
        <div className="mainPageWrapper">
          <div className="doughnutCharts">
            <DoughnutChart
              containerNames={containerNames}
              containerMemPerc={containerMemPerc}
              maxMem={totalDockerMem}
              darkMode={darkMode}
              className="doughnutChart"
              id="doughnutChart1"
            />
            <DoughnutChart
              containerNames={containerNames}
              containerMemPerc={containerMemPerc}
              darkMode={darkMode}
              className="doughnutChart"
              id="doughnutChart2"
            />
          </div>
          <h1 className={darkMode ? 'h1Dark' : 'h1Light'}>
            Running Containers
          </h1>
          <table
            className={darkMode ? 'mainPageTableDark' : 'mainPageTableLight'}
          >
            <thead>
              <tr>
                <th id="tableName" style={style}>
                  Name
                </th>
                <th id="tableMemUsage" style={style}>
                  Mem Usage
                </th>
                <th id="tableHardLim" style={style}>
                  Hard Limit / % Used
                </th>
                <th id="tableSoftLim" style={style}>
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
