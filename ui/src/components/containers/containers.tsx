import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';


export function Containers() {
  const location = useLocation();
  const { containerData } = location.state;
  const id  = containerData.ID;
  console.log('This is the container data:', containerData);
  return <div>I'm in container. ID: {id}. Check console to see data avaliable to us that was passed through {'<Link>'} props</div>;
}
