
import {  TextField, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './UpdateMemLimits.scss'
import { byteStringToBytes } from '../../formattingBytes/formattingBytes'
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { updateMemoryLimits } from '../../interactingWithDDClient';
const ddClient = createDockerDesktopClient();

//Shape of props object passed into UpdateMemLimitsForm
type Props = {
  ID: string,
  totalDockerMem : number
}

//shape of formValues object
type FormValues = {
  ID : string,
  softLimit : string,
  softLimitUnits: string,
  hardLimit : string,
  hardLimitUnits : string
}

export default function UpdateMemLimitsForm (props: Props) {
  //ID --> container ID, totalDockerMem --> total memory (in bytes) allocated to Docker Desktop
  const { ID, totalDockerMem } = props;

  const defaultValues: FormValues = {
    ID : ID,
    softLimit: '0',
    softLimitUnits: 'm',
    hardLimit: '0',
    hardLimitUnits: 'm'
  }

  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  
  //handleInputChange runs whenever a value in the form is updated. 
  //Name and value taken from the event and used to update the name/value property on the formValue piece of state
  const handleInputChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }
  /******************* 
   handleSubmit --> this function is invoked when a user presses submit on the form. It does a few things

   1. converts the soft limit and hard limits into numbers for comparison. 
      Example:  softLimit of '5' and softLimitUnits of 'm' will convert into the number 5,000,000
   2. Compare the softLimit and hardLimit byte numbers to make sure that soft limit is less than hard limit
   3. Compare hardLimit byte number to totalDocker memory. Hard limit must be less than total memory allocated to docker
   4. Makes sure both hard limit and soft limit are greater than 6m. Docker does not allow setting limits less than 6m.
   
   *******************/
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const hardLimitByteNumber = byteStringToBytes(formValues.hardLimit, formValues.hardLimitUnits);
    const softLimitByteNumber = byteStringToBytes(formValues.softLimit, formValues.softLimitUnits);
    console.log('newSoftLimitBytes:', softLimitByteNumber);
    console.log('newHardLimitBytes:', hardLimitByteNumber);
    //FIrst check to make sure soft limit isn't higher than hard limit
    if(softLimitByteNumber > hardLimitByteNumber) ddClient.desktopUI.toast.error('The soft limit must be smaller than the hard limit. Please try again.');
    //then check to make sure soft and hard limits are set  less than total memory avaliable to docker atm
    else if(hardLimitByteNumber > totalDockerMem) ddClient.desktopUI.toast.error('Limits must be less than the total memory allocated to Docker Desktop. Please try again.')
    //then check to make sure soft/hard limits are inside of Dockers limits 
    else if(hardLimitByteNumber < 6000000 || softLimitByteNumber < 6000000) ddClient.desktopUI.toast.error('Limits must be greater than 6m. Please try again');
    //if all the checks pass, we ping success and querry ddclient.
    else{
      updateMemoryLimits(formValues.softLimit + formValues.softLimitUnits, formValues.hardLimit + formValues.hardLimitUnits, ID)
      .then(() => ddClient.desktopUI.toast.success('Success! Please reload the page to see your updated memory limits'))
      .catch(() => ddClient.desktopUI.toast.error('Something went wront. Please try again.'));
      
    }
  }

  const unitsArray = [
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