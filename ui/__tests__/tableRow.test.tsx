import { afterEach, beforeEach, describe, it, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import TableRow from '../src/components/tables/tablerow';
import {formatBytes, formatMemUsage} from '../src/formattingBytes/formattingBytes'
describe('Table Row', () => {
  const sampleProps = {
    ID: '1234567890',
    containerName: 'test container',
    memUsageReadableString: '1.328MiB / 1.938GiB',
    byteUsage: 58843,
    softLimit: 68394765,
    hardLimit: 813300000
  };
  
  it('displays container name, memory usage, hard limit, and soft limit', () => {
    render(<TableRow 
      ID = {sampleProps.ID} 
      containerName = {sampleProps.containerName} 
      memUsageReadableString = {sampleProps.memUsageReadableString} 
      byteUsage = {sampleProps.byteUsage}
      softLimit = {sampleProps.softLimit}
      hardLimit = {sampleProps.hardLimit}
      />);

    expect(screen.getByText(sampleProps.containerName)).toBeInTheDocument();
    expect(screen.getByText(sampleProps.memUsageReadableString)).toBeInTheDocument();
    const hardLimitPerc = Math.round((sampleProps.byteUsage / sampleProps.hardLimit) * 100 * 100) / 100;
    const hardLimitString = formatBytes(sampleProps.hardLimit, 'Hard Limit');
    expect(screen.getByText(hardLimitString + ' / ' + hardLimitPerc)).toBeInTheDocument();
    const softLimitPer = Math.round((sampleProps.byteUsage / sampleProps.softLimit) * 100 * 100) / 100;
    const softLimitString = formatBytes(sampleProps.softLimit, 'Soft Limit');
    expect(screen.getByText(softLimitString + ' / ' + softLimitPer)).toBeInTheDocument();

  });
});