import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './tables.scss';
import Button from '@mui/material/Button';
import { ContainerInfo } from './tableInfo';
import ContainerData from '../types/containerData';
import DoughnutChart from '../charts/doughnut';
import Bar from '../charts/BarChart'
import { formatBytes } from '../../formattingBytes/formattingBytes';

type Props = {
  ID: string;
  containerName: string;
  memUsageReadableString: string;
  byteUsage: number;
  softLimit: number | null;
  hardLimit: number | null;
};

export default function TableRow(props: Props) {
  const {
    ID,
    containerName,
    memUsageReadableString,
    byteUsage,
    softLimit,
    hardLimit,
  } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const expand = () => {
    setExpanded(!expanded);
  };

  let softLimitPerc: number = 0;
  if (softLimit) {
    softLimitPerc = Math.round((byteUsage / softLimit) * 100 * 100) / 100;
  }
  let hardLimitPerc: number = 0;
  if (hardLimit) {
    hardLimitPerc = Math.round((byteUsage / hardLimit) * 100 * 100) / 100;
  }

  const softLimitString: string = formatBytes(softLimit, 'Soft Limit');
  const hardLimitString: string = formatBytes(hardLimit, 'Hard Limit');
  const totalMemString: string = formatBytes(byteUsage, '');

  return (
    <>
      <tr onClick={() => expand()} className="row">
        <td> {containerName} </td>
        <td> {memUsageReadableString} </td>
        <td>
          {hardLimitString} {hardLimit ? `/ ${hardLimitPerc}%` : null}
        </td>
        <td>
          {softLimitString} {softLimit ? `/ ${softLimitPerc}%` : null}
        </td>
      </tr>
      {expanded && (
        <tr className="rowExpanded">
          <td colSpan={2}>
            {hardLimit || softLimit ? 
              <Bar byteUsage = {byteUsage} softLimit = {softLimit} hardLimit = {hardLimit} softLimitString ={softLimitString} hardLimitString = {hardLimitString} totalMemString = {totalMemString} />
              : <p>Use the interface to the right to setup memory limits</p>}
            </td>
        </tr>
      )}
    </>
  );
}
