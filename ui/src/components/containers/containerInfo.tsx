import React, { useEffect } from 'react';
type containerData = {
  id: string,
  name: string,
  memPerc: string,
  memUsage: string
}
export function ContainerInfo(props: containerData){
  const { id, memPerc, memUsage, name } = props;
  return(
    <>
    <h4>{name}</h4>
    <h4>testing</h4>
    <ul>
      <li>ID: {id}</li>
      <li>Memory Usage: {memUsage}</li>
      <li>Percent of memeory used: {memPerc}</li>
    </ul>
    </>
  );
}


// BlockIO: "5.89MB / 0B"
// CPUPerc: "0.00%"
// Container: "e432301e2dcb"
// ID: "e432301e2dcb2d782b4a0df0bd5cab38419c03961808475577fc4495e010164e"
// MemPerc: "0.02%"
// MemUsage: "1.285MiB / 7.675GiB"
// Name: "dockery_extension-desktop-extension-service"
// NetIO: "2.16kB / 0B"
// PIDs: "5"