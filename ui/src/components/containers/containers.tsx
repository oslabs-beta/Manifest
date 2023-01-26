import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';
import { ContainerInfo } from './containerInfo';
import ContainerData from '../types/containerData';

interface Props {
  container: ContainerData;
  softLimit: any;
}

export function Containers(props: Props) {
  let containerData = props.container;
  const softLimit = props.softLimit
  // props.containersArray.forEach(element => {
  //   if (element.ID === location.state.ID) containerData = element;
  //   return;
  // });

  const { ID, MemPerc, MemUsage, Name } = containerData;
  // console.log("ID", ID);
  return (
    <ContainerInfo ID={ID} MemPerc={MemPerc} MemUsage={MemUsage} Name={Name} softLimit = {softLimit} />
  );
}
