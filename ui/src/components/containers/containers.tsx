import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './containers.scss';
import Button from '@mui/material/Button';

export function Containers(props) {
  return <button className="containerButton">Name: {props.name}</button>;
}
