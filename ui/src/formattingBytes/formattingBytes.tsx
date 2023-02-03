
//takes in a string representing the number of MiB OR GiB and returns out a number of bytes
function formatMemUsage(bytes: string) {
  const strArr: RegExpMatchArray | null  = bytes.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
  if(strArr){
    const inBytes: number[] = strArr.map(function (v) {
        return +v;
      });
      console.log('typeof inBytes[0]', typeof inBytes[0])
    if (bytes?.includes('MiB')) {
      return inBytes[0] * 1048576;
    } else {
      return inBytes[0] * 1073741824;
    }
  }
  else return 0;
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
