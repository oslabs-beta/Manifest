import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './mainpage.scss';
import CircularProgress from '@mui/material/CircularProgress';
import ContainerContext from '../../container-context';
import DoughnutChart from '../charts/doughnut';
import ContainerData from '../types/containerData';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';
import TableRow from '../tables/tablerow';
import { formatMemUsage } from '../../formattingBytes/formattingBytes';
// const ddClient = createDockerDesktopClient();

interface Props {
  containersArray: ContainerData[];
  containersLoaded: boolean;
  memObj: any;
  totalDockerMem: number;
}

interface containerInfo {
  containerNames: string[];
  containerMemPerc: number[];
}

export function Mainpage(props: Props) {
  const { containersArray, containersLoaded, memObj, totalDockerMem } = props;
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
          {/* <h1>Running Containers</h1> */}
          <table className="mainPageTable">
            <thead>
              <tr>
                <th colSpan={4} id="tableHeader">
                  Running Containers
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th id="tableName"> Name </th>
                <th id="tableMemUsage"> Current Mem Usage </th>
                <th id="tableHardLim"> Hard Limit / % Used </th>
                <th id="tableSoftLim"> Soft Limit / % Used </th>
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
