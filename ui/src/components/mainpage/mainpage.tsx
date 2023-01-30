import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './mainpage.scss';
import CircularProgress from '@mui/material/CircularProgress';
import ContainerContext from '../../container-context';
import DoughnutChart from '../charts/doughnut';
import ContainerData from '../types/containerData';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';
import TableRow from '../tables/tablerow';

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

function formatMemUsage(bytes: string | null) {
  const inBytes: number[] = bytes
    .match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
    .map(function (v) {
      return +v;
    });
  if (bytes?.includes('MiB')) {
    return parseInt(inBytes[0] * 1048576);
  } else {
    return parseInt(inBytes[0] * 1073741824);
  }
}

export function Mainpage(props: Props) {
  const { containersArray, containersLoaded, memObj, totalDockerMem } = props;
  const tableRows: JSX.Element[] = [];
  // console.log(memObj);

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
