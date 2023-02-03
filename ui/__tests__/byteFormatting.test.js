import { afterEach, beforeEach, describe, it, vi, expect } from 'vitest'
import {formatBytes, formatMemUsage} from '../src/formattingBytes/formattingBytes'
/*
formatBytes accepts 2 things --> number/null & string(Soft Limit/Hard Limit)
it returns back a human readable string of the amount of bytes taken up. 
*/
describe('formatBytes functionality', () => {
  const memString = '1.328MiB / 1.938GiB';
  it('should return the string `___ limit not set` if soft/hard limit hasn\'t been set', () =>{
    expect(formatBytes(null, 'Soft Limit')).toEqual('Soft Limit Not Set');
    expect(formatBytes(null, 'Hard Limit')).toEqual('Hard Limit Not Set');
  })
  it('should return a human readable string representing bytes of memory used', () => {
    let bytes = 54
    expect(formatBytes(bytes, 'Soft Limit')).toEqual('54 Bytes');
    bytes = 58843;
    expect(formatBytes(bytes, 'Soft Limit')).toEqual('57.46 KiB');
    bytes = 68394765;
    expect(formatBytes(bytes, 'Soft Limit')).toEqual('65.23 MiB');
    bytes = 8133000000;
    expect(formatBytes(bytes, 'Soft Limit')).toEqual('7.57 GiB');
  })
});

describe('formatMemUsage functionality', () => {
  it('should return the number of bytes when passed a string from ddClient', () => {
    expect(formatMemUsage('1.328MiB / 1.938GiB')).toEqual(1392508);
    expect(formatMemUsage('1.12GiB / 1.938GiB')).toEqual(1202590842);
  });
});