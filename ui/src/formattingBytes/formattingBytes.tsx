
//takes in a string representing the number of MiB OR GiB and returns out a number of bytes
function formatMemUsage(bytes: string | null): number {
  const inBytes: number[] = bytes
    .match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
    .map(function (v) {
      return +v;
    });

  const conversion: { [key: string] : number } = {
    'KiB': 1024,
    'MiB': 1048576,
    'GiB': 1073741824,
    'TiB': 1099511627776,
  }

  for (const key of Object.keys(conversion)) {
    if (bytes?.includes(key)) return inBytes[0] * conversion[key];
  }
  return inBytes[0];
  // if (bytes?.includes('KiB')) {
  //   return parseInt(inBytes[0] * )
  // } else if (bytes?.includes('MiB')) {
  //   return parseInt(inBytes[0] * 1048576);
  // } else {
  //   return parseInt(inBytes[0] * 1073741824);
  // }
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
//Example: byteStringToBytes(1, k) -> returns 1000 since there are 1000 bytes in a kb. would return 1 mil for m since there are 1 mil byes in a mb
const byteStringToBytes: (amountOfBytes: string, units:string) => number = function (
  amountOfBytes: string, 
  units:string
): number {
  const numberOfBytes = parseFloat(amountOfBytes);
  if(units === 'm') return numberOfBytes*1000000;
  else return numberOfBytes*1000000000;
}

export { formatMemUsage, formatBytes, byteStringToBytes };
