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
//function that takes in a number and a string representing the memory limit, and returns out the number of bytes. 
function formatBytes(bytes: number | null, memLimit: string, decimals = 2) {
  if (!bytes) return `${memLimit} Not Set`;
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

export {formatMemUsage, formatBytes}