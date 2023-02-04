
//takes in a string representing the number of MiB OR GiB and returns out a number of bytes
function formatMemUsage(bytes: string): number {
  // const regExMatch: RegExpMatchArray | null = bytes.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g);
  // if(!regExMatch) return 0;
  const index: number = bytes.search(/[^0-9.]/);
  const amount: string = bytes.substring(0, index);
  const units: string = bytes.substring(index, index + 3);
  return byteStringToBytes(amount, units);
}


//function that takes in a number and a string representing the memory limit, and returns out a STRING representing the number of bytes.
function formatBytes(bytes: number | null, memLimit: string, decimals = 2) {
  if (!bytes) return `${memLimit}`;
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

//this function accepts a string represinting the amount of bites and a string representing the units. 
//Example: byteStringToBytes(1, KiB) -> returns 1024 since there are 1024 bytes in a KiB. would return 1048576 for m since there are 1048576 byes in a MiB
function byteStringToBytes(amountOfBytes: string, units:string): number {

  const conversion: { [key: string]: number } = {
    KiB: 1024,
    MiB: 1048576,
    GiB: 1073741824,
    TiB: 1099511627776,
  };

  return Math.round(parseFloat(amountOfBytes) * conversion[units]);
}

export { formatMemUsage, formatBytes, byteStringToBytes };
