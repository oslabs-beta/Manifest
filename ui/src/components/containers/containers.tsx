import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';
import { ContainerInfo } from './containerInfo';
import ContainerData from '../types/containerData';
import DoughnutChart from '../charts/doughnut';

type Props = {
  ID: string;
  container: ContainerData;
  softMemObj: any;
  softLimit: number | null;
};

export default function Containers(props: Props) {
  const { ID, MemPerc, MemUsage, Name, softLimit } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const expand = () => {
    setExpanded(!expanded);
  };

  function formatMemUsage(bytes: string | null) {
    if (bytes?.includes('MiB')) {
      return bytes.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g).map(function (v) {
        return +v;
      });
    }
  }
  console.log(formatMemUsage(MemUsage)[0]);

  function formatBytes(bytes: number | null, decimals = 2) {
    if (!bytes) return 'Soft Limit Not Set';
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  const softLimitString = formatBytes(softLimit);

  return (
    <>
      <tr onClick={() => expand()} className="row">
        <td> {Name} </td>
        <td> {MemUsage} </td>
        <td> Hard Limit Coming Soon </td>
        <td> {softLimitString}</td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={4}>
            <img
              src="https://miro.medium.com/max/1308/0*hNntnFFkfN67zLt3"
              style={{ width: '10%', height: '10%' }}
            />
          </td>
        </tr>
      )}
    </>
  );
}
