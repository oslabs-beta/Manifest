import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';
import { ContainerInfo } from './containerInfo'

export function Containers() {
  const location = useLocation();
  const  containerData  = location.state.element;
  const {ID, MemPerc, MemUsage, Name}  = containerData;
  console.log("ID", ID);
  return <ContainerInfo ID={ID} MemPerc = {MemPerc} MemUsage = {MemUsage} Name = {Name} />;
}
