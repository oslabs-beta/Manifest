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

  function formatBytes(bytes: number | null, decimals = 2) {
    if (!bytes) return 'Soft Limit Not Set';
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      'Bytes',
      'KiB',
      'MiB',
      'GiB',
      'TiB',
      'Pi',
      'EiB',
      'ZiB',
      'YiB',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  let softLimitPerc = 0;
  if (softLimit) {
    console.log((formatMemUsage(MemUsage) / softLimit) * 100);
    softLimitPerc =
      Math.round((formatMemUsage(MemUsage) / softLimit) * 100 * 100) / 100;
  }
  const softLimitString = formatBytes(softLimit);

  return (
    <>
      <tr onClick={() => expand()} className="row">
        <td> {Name} </td>
        <td> {MemUsage} </td>
        <td> Hard Limit Coming Soon </td>
        <td>
          {softLimitString} {softLimit ? `/ ${softLimitPerc}` : null}
        </td>
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
