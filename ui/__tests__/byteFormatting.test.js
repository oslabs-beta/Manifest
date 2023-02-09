import { describe, it, expect } from 'vitest'
import { formatBytes, formatMemUsage, byteStringToBytes } from '../src/formattingBytes/formattingBytes'

describe('formatBytes functionality', () => {

  it('should return the string `Hard/Soft Limit` if soft/hard limit hasn\'t been set', () =>{
    expect(formatBytes(null, 'Soft Limit')).toEqual('Soft Limit');
    expect(formatBytes(null, 'Hard Limit')).toEqual('Hard Limit');
  });
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

describe('byteStringToByte functionality', () => {
  it('should return the number of bytes when passed amount of bytes as a string as well as units as a string', () => {
    expect(byteStringToBytes('25.3', 'KiB')).toEqual(25907);
    expect(byteStringToBytes('0.56', 'MiB')).toEqual(587203)
    expect(byteStringToBytes('2.34', 'GiB')).toEqual(2512555868);
  })
});

describe('formatMemUsage functionality', () => {
  it('should return the number of bytes when passed a string from ddClient', () => {
    expect(formatMemUsage('1.328MiB / 1.938GiB')).toEqual(1392509);
    expect(formatMemUsage('1.12GiB / 1.938GiB')).toEqual(1202590843);
    expect(formatMemUsage('3.4MiB / 1.938GiB')).toEqual(3565158);
    expect(formatMemUsage('10.8KiB / 1.98GiB')).toEqual(11059)
  });
});

