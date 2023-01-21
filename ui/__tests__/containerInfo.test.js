/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom'
import { ContainerInfo } from '../src/components/containers/containerInfo'

describe('Testing containerInfo Page', () => {

  const data = {
    Name: 'test container',
    ID: '1234',
    MemPerc: '0.02%',
    MemUsage: '1.285MiB / 7.675GiB',
  }

  test('Container info should render the name, id, memusage, and mem percent of the container', () => {  
    render (<ContainerInfo data={data}/>);
    expect(screen.getByText(data.Name)).toBeInTheDocument();
    expect(screen.getByText(`ID: ${data.ID}`)).toBeInTheDocument();
    expect(screen.getByText(`Memory Usage: ${data.MemUsage}`)).toBeInTheDocument();
    expect(screen.getByText(`Percent of memeory used: ${data.MemPerc}`)).toBeInTheDocument();
  });


})
