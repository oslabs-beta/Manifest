import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient();

//returns an array of all the currently running containers 
const getContianerIds = async () => {
  return await ddClient.docker.cli
  .exec('ps', ['--no-trunc','--format', '"{{.ID}}"'])
  .then((res) => {
    //splitting by new lines
    const containerIdArr = res.stdout.split('\n');
    //pop off last element (will always be empty string '' since the res.stdout has a \n at the end)
    containerIdArr.pop();
    return containerIdArr;
  });
}

//returns an object with keys being id's of containers and values being soft mem limit. if soft mem limit isn't set - null is returned
const getSoftMemLimits = async (idArr: string[]) => {
  const returnObj = {};
  const softMemLimitArr = await ddClient.docker.cli
  .exec(`inspect`, [`--format='{{.HostConfig.MemoryReservation}}'`, ...idArr])
  .then(res => res.parseJsonLines());
  idArr.forEach((id, index) => {
    if(softMemLimitArr[index] === 0) returnObj[id] = null;
    else returnObj[id] = softMemLimitArr[index];
  });
  return returnObj;
}

//returns an array that holds objects containg metrics associated with each container. 
const getContainerMetrics = async () => {
  return ddClient.docker.cli
    .exec('stats', ['--no-stream', '--no-trunc', '--format', '"{{json .}}"'])
    .then((res) => res.parseJsonLines());
}

export {getContianerIds, getSoftMemLimits, getContainerMetrics}