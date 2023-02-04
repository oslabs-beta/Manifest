import {
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import  { useState } from 'react';
import './UpdateMemLimits.scss';
import { byteStringToBytes } from '../../formattingBytes/formattingBytes';
import { updateMemoryLimits, sendToast } from '../../interactingWithDDClient';

//Shape of props object passed into UpdateMemLimitsForm
type Props = {
  ID: string,
  totalDockerMem : number,
  updateMemoryObject: () => Promise<void>,
  softLimit: number | null,
  hardLimit: number | null
}

//shape of formValues object
type FormValues = {
  ID : string,
  softLimit : string,
  softLimitUnits: string,
  hardLimit : string,
  hardLimitUnits : string,
}

export default function UpdateMemLimitsForm (props: Props): JSX.Element {
  //ID --> container ID, totalDockerMem --> total memory (in bytes) allocated to Docker Desktop 
  //updateMemoryObject --> Function that querries docker desktop API for up to date memory limits on all containers
  //softLimit, hardlimit --> a number representing bytes for these limits, OR NULL if limit isn't set
  const { ID, totalDockerMem, updateMemoryObject, softLimit, hardLimit } = props;
  console.log('soft limit:', softLimit, 'hard limit:', hardLimit);
  const defaultValues: FormValues = {
    ID : ID,
    softLimit: '',
    softLimitUnits: 'MiB',
    hardLimit: '',
    hardLimitUnits: 'MiB'
  }
 

  //setting up formValues piece of state with defaultValues as the default value
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  

  //handleInputChange runs whenever a value in the form is updated. 
  //Name and value taken from the event and used to update the name/value property on the formValue piece of state
  const handleInputChange = (event: SelectChangeEvent): void => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }


  /******************* 
   handleSubmit --> this function is invoked when a user presses submit on the form. It does a few things

   1. converts the soft limit and hard limits into numbers for comparison. (or null if the user doesn't want to update that limit)
      Example:  softLimit of '5' and softLimitUnits of 'm' will convert into the number 5,000,000

   2. Makes sure various entry conditions are met such as mem limits being less than total memory allocated to docker, or mem limits being greater than 6m.

   5. If the above conditions are met, querry updateMemoryLimits and pass in the users hard/soft limits plus the ID to update the containers mem limits
   *******************/
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    //1. converting limits to numbers. number is assigned to null if user doesn't want to update that memory limit 
    const hardLimitByteNumber: number | null = (formValues.hardLimit === '0' || formValues.hardLimit === '' ) ? null : byteStringToBytes(
      formValues.hardLimit, 
      formValues.hardLimitUnits
    );
    const softLimitByteNumber: number | null = (formValues.softLimit === '0' || formValues.softLimit === '' ) ? null : byteStringToBytes(
      formValues.softLimit, 
      formValues.softLimitUnits
    );  

    //Alert the user if they haven't selected ANY memory limits to update
    if(!hardLimitByteNumber && !softLimitByteNumber) sendToast('error', 'You must enter at least one memory limit to udpate');

    //this block of code run if we have both hard limit and soft limit being accepted 
    else if(hardLimitByteNumber && softLimitByteNumber){
      //making sure byte inputs are acceptable by docker 
      if(softLimitByteNumber > hardLimitByteNumber) sendToast('error', 'The soft limit must be smaller than the hard limit. Please try again.');
      else if(hardLimitByteNumber > totalDockerMem) sendToast('error', 'Limits must be less than the total memory allocated to Docker Desktop. Please try again.')
      else if(hardLimitByteNumber < 6000000 || softLimitByteNumber < 6000000) sendToast('error', 'Limits must be greater than 6m. Please try again');
      //querrying to update the memory limits on a container
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
          })
          .catch(() =>
            sendToast(
              'error',
              'Something went wrong. Please try again.'
            )
          );
      }
    } 

    //this block of code runs if user wants to update hard limit but NOT soft limit
    else if(hardLimitByteNumber && !softLimitByteNumber){
      if(hardLimitByteNumber > totalDockerMem) sendToast('error', 'Hard limit must be less than the total memory allocated to Docker Desktop. Please try again.')
      else if(hardLimitByteNumber < 6000000) sendToast('error', 'Hard limit must be greater than 6m. Please try again');
      //check the new hard limit against the current soft limit
      else if(softLimit && hardLimitByteNumber < softLimit) sendToast('error', 'Hard limit must be greater than current soft limit');
      else{
        updateMemoryLimits(
          null,
          formValues.hardLimit + formValues.hardLimitUnits,
          ID
        )
        .then(() => {
          sendToast(
            'success',
            'Success! Please wait a moment for Dockery to update its display'
          )
          updateMemoryObject();
        })
        .catch(() =>
          sendToast(
            'error',
            'Something went wrong. Please try again.'
          )
        );
      }
    }

    //this block of code runs if user wants to udate soft limit but NOT hard limit
    else if(softLimitByteNumber && !hardLimitByteNumber){
      if(softLimitByteNumber > totalDockerMem) sendToast('error', 'Soft limit must be less than the total memory allocated to Docker Desktop. Please try again.')
      else if(softLimitByteNumber < 6000000) sendToast('error', 'Soft limit must be greater than 6m. Please try again');
      else if(hardLimit && softLimitByteNumber > hardLimit) sendToast('error', 'Soft limit must be less than current Hard limit');
      else {
        updateMemoryLimits(
          formValues.softLimit + formValues.softLimitUnits,
          null,
          ID
        )
        .then(() => {
          sendToast(
            'success',
            'Success! Please wait a moment for Dockery to update its display'
          )
          updateMemoryObject();
        })
        .catch(() =>
          sendToast(
            'error',
            'Something went wrong. Please try again.'
          )
        );
      }
    }
  };

  //units array for dropdown selection
  const unitsArray: JSX.Element[] = [
    <MenuItem value ={'MiB'} key='Mib' >MiB</MenuItem>,
    <MenuItem value ={'GiB'} key='GiB'>GiB</MenuItem>,
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

