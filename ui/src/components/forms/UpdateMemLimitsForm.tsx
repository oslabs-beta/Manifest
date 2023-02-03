import {
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './UpdateMemLimits.scss';
import { byteStringToBytes } from '../../formattingBytes/formattingBytes';
import { updateMemoryLimits, sendToast } from '../../interactingWithDDClient';

//Shape of props object passed into UpdateMemLimitsForm
type Props = {
  ID: string,
  totalDockerMem : number,
  updateMemoryObject: () => Promise<void>
}

//shape of formValues object
type FormValues = {
  ID : string,
  softLimit : string,
  softLimitUnits: string,
  hardLimit : string,
  hardLimitUnits : string,
}

export default function UpdateMemLimitsForm (props: Props) {
  //ID --> container ID, totalDockerMem --> total memory (in bytes) allocated to Docker Desktop
  const { ID, totalDockerMem, updateMemoryObject } = props;
  const defaultValues: FormValues = {
    ID : ID,
    softLimit: '0',
    softLimitUnits: 'm',
    hardLimit: '0',
    hardLimitUnits: 'm'
  }

  //setting up formValues piece of state with defaultValues as the default value
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  

  //handleInputChange runs whenever a value in the form is updated. 
  //Name and value taken from the event and used to update the name/value property on the formValue piece of state
  const handleInputChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }


  /******************* 
   handleSubmit --> this function is invoked when a user presses submit on the form. It does a few things

   1. converts the soft limit and hard limits into numbers for comparison. 
      Example:  softLimit of '5' and softLimitUnits of 'm' will convert into the number 5,000,000
   2. Compare the softLimit and hardLimit byte numbers to make sure that soft limit is less than hard limit
   3. Compare hardLimit byte number to totalDocker memory. Hard limit must be less than total memory allocated to docker
   4. Makes sure both hard limit and soft limit are greater than 6m. Docker does not allow setting limits less than 6m.
   5. If the above conditions are met, querry updateMemoryLimits and pass in the users hard/soft limits plus the ID to update the 
   *******************/
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    //1. converting limits to numbers
    const hardLimitByteNumber = byteStringToBytes(
      formValues.hardLimit, 
      formValues.hardLimitUnits
    );
    const softLimitByteNumber = byteStringToBytes(
      formValues.softLimit, 
      formValues.softLimitUnits
    );  
    //2-4 making sure byte inputs are acceptable by docker 
    if(softLimitByteNumber > hardLimitByteNumber) sendToast('error', 'The soft limit must be smaller than the hard limit. Please try again.');
    else if(hardLimitByteNumber > totalDockerMem) sendToast('error', 'Limits must be less than the total memory allocated to Docker Desktop. Please try again.')
    else if(hardLimitByteNumber < 6000000 || softLimitByteNumber < 6000000) sendToast('error', 'Limits must be greater than 6m. Please try again');
    //5. querrying to update the memory limits on a container
    else {
      updateMemoryLimits(
        formValues.softLimit + formValues.softLimitUnits,
        formValues.hardLimit + formValues.hardLimitUnits,
        ID
      )
        .then(() => {
          sendToast(
            'success',
            'Success! Please wait a moment for Dockery to update its display'
          )
          updateMemoryObject();
        }
        )
        .catch(() =>
          sendToast(
            'error',
            'Something went wrong. Please try again.'
          )
        );
    }
  };

  //units array for dropdown selection
  const unitsArray = [
    <MenuItem value ={'m'} key='m' >m</MenuItem>,
    <MenuItem value ={'g'} key='g'>g</MenuItem>,
  ];

  return(
    <div id='formWrapper'>
      <p className = 'formTitle'>Update memory limits</p>
      <form onSubmit = {handleSubmit} className = 'formGrid'>
          <TextField
            id = {`hardLimit-input-${ID}`}
            className = 'hard-limit-input'
            name = 'hardLimit'
            label = 'Hard Limit'
            type = 'number'
            value = {formValues.hardLimit}
            // @ts-ignore - no onChange prop in TextField MUI
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

          <TextField
            id = {`softLimit-input-${ID}`}
            className = 'soft-limit-input'
            name = 'softLimit'
            label = 'Soft Limit'
            type = 'number'
            value = {formValues.softLimit}
            // @ts-ignore - no onChange prop in TextField MUI
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
          
          <Button type = 'submit' className='formSubmit'>Submit</Button>
    
      </form>  
    </div>
  )
}

