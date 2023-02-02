
import {  TextField, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './UpdateMemLimits.scss'
import { byteStringToBytes } from '../../formattingBytes/formattingBytes'
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { updateMemoryLimits } from '../../interactingWithDDClient';
const ddClient = createDockerDesktopClient();

type Props = {
  ID: string,
  totalDockerMem : number
}
type Units = {
  ID : string,
  softLimit : string,
  softLimitUnits: string,
  hardLimit : string,
  hardLimitUnits : string
}
export default function UpdateMemLimitsForm (props: Props) {
  
  const { ID, totalDockerMem } = props;
  const defaultValues: Units = {
    ID : ID,
    softLimit: '0',
    softLimitUnits: 'm',
    hardLimit: '0',
    hardLimitUnits: 'm'
  }
  const [formValues, setFormValues] = useState<Units>(defaultValues);
  

  const handleInputChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const newHardLimitBytes = byteStringToBytes(formValues.hardLimit, formValues.hardLimitUnits);
    const newSoftLimitBytes = byteStringToBytes(formValues.softLimit, formValues.softLimitUnits);
    console.log('newSoftLimitBytes:', newSoftLimitBytes);
    console.log('newHardLimitBytes:', newHardLimitBytes);
    //FIrst check to make sure soft limit isn't higher than hard limit
    if(newSoftLimitBytes > newHardLimitBytes) ddClient.desktopUI.toast.error('The soft limit must be smaller than the hard limit. Please try again.');
    //then check to make sure soft and hard limits are set  less than total memory avaliable to docker atm
    else if(newHardLimitBytes > totalDockerMem) ddClient.desktopUI.toast.error('Limits must be less than the total memory allocated to Docker Desktop. Please try again.')
    //then check to make sure soft/hard limits are inside of Dockers limits 
    else if(newHardLimitBytes < 6000000 || newSoftLimitBytes < 6000000) ddClient.desktopUI.toast.error('Limits must be greater than 6m. Please try again');
    //if all the checks pass, we ping success and querry ddclient.
    else{
      updateMemoryLimits(formValues.softLimit + formValues.softLimitUnits, formValues.hardLimit + formValues.hardLimitUnits, ID)
      .then(() => ddClient.desktopUI.toast.success('Success! Please reload the page to see your updated memory limits'))
      .catch(() => ddClient.desktopUI.toast.error('Something went wront. Please try again.'));
      
    }
  }

  const unitsArray = [
    // <MenuItem value ={'b'}>b</MenuItem>,
    // <MenuItem value ={'k'}>k</MenuItem>,
    <MenuItem value ={'m'}>m</MenuItem>,
    <MenuItem value ={'g'}>g</MenuItem>,
    
  ];

  return(
    <form onSubmit = {handleSubmit} className = 'formGrid'>
        <TextField
          id = {`hardLimit-input-${ID}`}
          className = 'hard-limit-input'
          name = 'hardLimit'
          label = 'Hard Limit'
          type = 'text'
          value = {formValues.hardLimit}
          onChange = {handleInputChange}
        />
        <Select
          id = {`hardLimit-units-${ID}`}
          className = 'hard-limit-units'
          name = "hardLimitUnits"
          value = {formValues.hardLimitUnits}
          onChange = {handleInputChange}
        >
          {unitsArray}
        </Select>
        <br></br>
        <TextField
          id = {`softLimit-input-${ID}`}
          className = 'soft-limit-input'
          name = 'softLimit'
          label = 'Soft Limit'
          type = 'text'
          value = {formValues.softLimit}
          onChange = {handleInputChange}
        />
        <Select
          id = {`softLimit-units-${ID}`}
          className = 'soft-limit-units'
          name = "softLimitUnits"
          value = {formValues.softLimitUnits}
          onChange = {handleInputChange}
        >
          {unitsArray}
        </Select>
        <br></br>
        
        <Button type = 'submit' className='formSubmit'>Submit</Button>
   
    </form>  
  )
}