import  { useState } from 'react';
import './tables.scss';
import Bar from '../charts/BarChart';
import { formatBytes } from '../../formattingBytes/formattingBytes';
import UpdateMemLimitsForm from '../forms/UpdateMemLimitsForm';
import { getCurrentTextColor } from '../../getCurrentTextColor';
const currentTextColor = getCurrentTextColor();
type Props = {
  ID: string;
  containerName: string;
  memUsageReadableString: string;
  byteUsage: number;
  softLimit: number | null;
  hardLimit: number | null;
  totalDockerMem: number
};

type style = {
  borderBottom: string;
};

export default function TableRow(props: Props) {
  const {
    ID,
    containerName,
    memUsageReadableString,
    byteUsage,
    softLimit,
    hardLimit,
    totalDockerMem
  } = props;

  /**************
  State variable to check whether or not a row is expanded
  Function also to change the row to expanded or unexpand the row
  ***************/
  const [expanded, setExpanded] = useState<boolean>(false);
  const expand = (): void => {
    setExpanded(!expanded);
   
    
  };  

  /**************
  softLimitPerc/String and hardLimitPerc/String are for displaying text within the tables
  ***************/
  let softLimitPerc: number = 0;
  if (softLimit) {
    softLimitPerc = Math.round((byteUsage / softLimit) * 100 * 100) / 100;
  }
  let hardLimitPerc: number = 0;
  if (hardLimit) {
    hardLimitPerc = Math.round((byteUsage / hardLimit) * 100 * 100) / 100;
  }
  const softLimitString: string = formatBytes(softLimit, 'Soft Limit Not Set');
  const hardLimitString: string = formatBytes(hardLimit, 'Hard Limit Not Set');
  const totalMemString: string = formatBytes(byteUsage, '');



  return (
    <>
      <tr onClick={() => expand()} className="row" style ={{borderTop: `solid ${currentTextColor}`}}>
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
          <td colSpan={3}>
            {hardLimit || softLimit ? (
              <Bar
                byteUsage={byteUsage}
                softLimit={softLimit}
                hardLimit={hardLimit}
                softLimitString={softLimitString}
                hardLimitString={hardLimitString}
                totalMemString={totalMemString}
              />
            ) : (
              <p>Use the interface to the right to setup memory limits</p>
            )}
          </td>
          <td colSpan={1} >
            <UpdateMemLimitsForm ID = {ID} totalDockerMem = {totalDockerMem}/>
          </td>
        </tr>
      )}
    </>
  );
}
