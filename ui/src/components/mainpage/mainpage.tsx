import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Containers } from '../containers/containers';
import './mainpage.scss';

export function Mainpage(props) {
  // const containers = props.containers;
  // console.log('This is containers in mainpage: ', props.containers);
  let containers;
  let containersArray = [];
  if (props.containers) {
    containers = JSON.parse(props.containers);
    // console.log(containers[0].Names[0]);
    for (let i = 0; i < containers.length; i++) {
      containersArray.push(
        <Containers key={i} name={containers[i].Names[0]} />
      );
    }
  }
  // console.log(containers);

  return (
    <>
      <div className="containers">{containersArray}</div>
    </>
  );
}
