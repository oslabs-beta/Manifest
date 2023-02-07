import { createDockerDesktopClient } from '@docker/extension-api-client';
import { allMemoryObject } from './components/types/memoryObject';
import containerData from './components/types/containerData';
const ddClient = createDockerDesktopClient();

/**************
getContainerIds --> returns an array holding the Id's of all running containers
***************/
const getContainerIds = async (): Promise<string[]> => {
  return await ddClient.docker.cli
    .exec('ps', ['--no-trunc', '--format', '"{{json .ID}}"'])
    .then((res) =>  res.parseJsonLines());
};


/**************
getMemLimits --> Returns an object with keys being the id's of all running containers, and value of a nested object.
This nested object 2 properties -> the soft mem limit and the hard mem limit. Each one of these is a number
Example object = {
  SampleContainerID1: {
    softLimit: number | null (if no limit set)
    hardLimit: number | null (if no limit set)
  },
  SampleContainerID2: {
    softLimit: number | null (if no limit set)
    hardLimit: number | null (if no limit set)
  }
}
***************/
const getMemLimits = async (idArr: string[]): Promise<allMemoryObject> => {
  const returnObj: allMemoryObject = {};
  const memLimitArr: string[] = await ddClient.docker.cli
    .exec(`inspect`, [
      // NOTE: We use this format instead of '{{.HostConfig.MemoryReservation}} {{.HostConfig.Memory}}'
      // because this format works on both Linux based AND Windows, above format does not work on Windows
      `--format='{{.HostConfig.MemoryReservation}}/{{.HostConfig.Memory}}'`,
      ...idArr,
    ]).then((res) => res.stdout.split('\n'));
  memLimitArr.pop();
  memLimitArr.forEach((memString, i) => {
    let softLimit: string | null;
    let hardLimit: string | null;
    // NOTE: We replace any instances of ' or " because Windows will include them in soft and hard limits otherwise
    [softLimit, hardLimit] = memString.replaceAll(/['"]/g, '').split('/');
    if (softLimit === '0') softLimit = null;
    if (hardLimit === '0') hardLimit = null;
    returnObj[idArr[i]] = {
      softLimit: softLimit,
      hardLimit: hardLimit,
    };
  });
  return returnObj;
};


/**************
getContainerMetrics --> returns an array that holds objects. Each object contains metrics associated with each container.
***************/
const getContainerMetrics = async (): Promise<containerData[]> => {
  return ddClient.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
};


/**************
getTotalMemoryAllocatedToDocker --> returns the NUMBER of bytes allocated to docker as a whole. (The total memory Docker Desktop can take up)
***************/
const getTotalMemoryAllocatedToDocker = async (): Promise<number> => {
  const [response]: number[] = await ddClient.docker.cli
    .exec('info', ['--format', '"{{json .MemTotal}}"'])
    .then((res) => res.parseJsonLines());
  return response;
};



/**************
updateMemoryLimits --> this function accepts 2 strings and an ID example: updateMemoryLimits('500m', '1g', '1234sampleID5678')
Will locate the container with the matching ID, and update it's --memory-reservation (soft limit) and -m (hard limit) accordingly.
Also note that we need to set the --memory-swap to the hard limit. Docker does not allow containers to have a hard limit that is greater than a memory reservation 
If null is passed in instead of a string, will NOT update that memory limit
***************/
const updateMemoryLimits = async (softMemLimit: string | null, hardMemLimit: string | null, ID: string): Promise<void> => {
  //updates BOTH soft and hard mem limits
  if(softMemLimit && hardMemLimit) await ddClient.docker.cli
    .exec('update', [`-m`, hardMemLimit, '--memory-reservation', softMemLimit, '--memory-swap', hardMemLimit, ID]);
  //updates only hard mem limit
  else if(hardMemLimit && !softMemLimit) await ddClient.docker.cli
    .exec('update', [`-m`, hardMemLimit, '--memory-swap', hardMemLimit, ID]);
  //updtaes only soft mem limit
  else if(softMemLimit && !hardMemLimit) await ddClient.docker.cli
    .exec('update', ['--memory-reservation', softMemLimit,  ID]);
}


const openExternalLink = async (link: string): Promise<void> => {
  await ddClient.host.openExternal(link);
}

const sendToast = (toastType: 'error' | 'success' | 'warning', message: string): void => {
  const toast = ddClient.desktopUI.toast;
  const funcs: { [key: string]: Function } = {
    'error': toast.error,
    'success': toast.success,
    'warning': toast.warning,
  }
  funcs[toastType](message);
 
}

export {
  getContainerIds,
  getMemLimits,
  getContainerMetrics,
  getTotalMemoryAllocatedToDocker,
  updateMemoryLimits,
  openExternalLink,
  sendToast
};
