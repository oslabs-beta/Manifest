import React, { useEffect } from 'react';
type containerData = {
  ID: string,
  Name: string,
  MemPerc: string,
  MemUsage: string
}
export function ContainerInfo(props: containerData){
  const { ID, MemPerc, MemUsage, Name } = props;
  return(
    <>
    <h4>{Name}</h4>
    
    <ul>
      <li>ID: {ID}</li>
      <li>Memory Usage: {MemUsage}</li>
      <li>Percent of memeory used: {MemPerc}</li>
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