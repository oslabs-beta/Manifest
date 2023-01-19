import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';

export function Containers(props) {
  const { id } = useParams();
  console.log('This is the id: ', id);
  return <div>I'm in container. ID: {id}</div>;
}
