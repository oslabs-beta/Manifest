import { createDockerDesktopClient } from '@docker/extension-api-client';
import { allMemoryObject } from './components/types/memoryObject';
const ddClient = createDockerDesktopClient();

//returns an array of all the currently running containers
const getContianerIds = async () => {
  return await ddClient.docker.cli
    .exec('ps', ['--no-trunc', '--format', '"{{.ID}}"'])
    .then((res) => {
      const containerIdArr = res.stdout.split('\n');
      containerIdArr.pop();
      return containerIdArr;
    });
};

//returns an object with keys being id's of containers and values being soft mem limit. if soft mem limit isn't set - null is returned
const getMemLimits = async (idArr: string[]) => {
  const returnObj: allMemoryObject = {};
  const memLimitArr = await ddClient.docker.cli
    .exec(`inspect`, [
      `--format='{{.HostConfig.MemoryReservation}} {{.HostConfig.Memory}}'`,
      ...idArr,
    ])
    .then((res) => res.stdout.split('\n'));
  memLimitArr.pop();
  // console.log('memLimitArr:', memLimitArr);
  memLimitArr.forEach((memString, i) => {
    let softLimit: string | null;
    let hardLimit: string | null;
    [softLimit, hardLimit] = memString.split(' ');
    if (softLimit === '0') softLimit = null;
    if (hardLimit === '0') hardLimit = null;
    returnObj[idArr[i]] = {
      softLimit: softLimit,
      hardLimit: hardLimit,
    };
  });
  // console.log('Return Object:', returnObj);
  return returnObj;
};

//returns an array that holds objects containg metrics associated with each container.
const getContainerMetrics = async () => {
  return ddClient.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
};

//returns the NUMBER of bytes allocated to docker as a whole. (The total memory Docker Desktop can take up)
const getTotalMemoryAllocatedToDocker = async () => {
  const [response] = await ddClient.docker.cli
    .exec('info', ['--format', '"{{json .MemTotal}}"'])
    .then((res) => res.parseJsonLines());
  return response;
};

export {
  getContianerIds,
  getMemLimits,
  getContainerMetrics,
  getTotalMemoryAllocatedToDocker,
};
