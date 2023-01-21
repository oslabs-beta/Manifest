import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';
import { ContainerInfo } from './containerInfo'

export function Containers() {
  const location = useLocation();
  const { containerData } = location.state;
  const id  = containerData.ID;
  const memPerc = containerData.MemPerc;
  const memUsage = containerData.MemUsage;
  const name = containerData.name;
  console.log('This is the container data:', containerData);
  return <ContainerInfo id = {id} name = {name} memPerc = {memPerc} memUsage ={memUsage} />;
}
