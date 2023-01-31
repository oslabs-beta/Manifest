
import { Box, TextField, MenuItem, Select, SelectChangeEvent, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
type Props = {
  ID: string
}
export default function UpdateMemLimitsForm (props: Props) {
  const [units, setUnits] = useState<string>('MiB');
  const { ID } = props;
  const handleUnitChange = (event: SelectChangeEvent) => {
    console.log('event target value :', event.target.value)
    setUnits(event.target.value as string)
  }
  const unitsArray = [
    <MenuItem value ={'Bytes'}>Bytes</MenuItem>,
    <MenuItem value ={'KiB'}>KiB</MenuItem>,
    <MenuItem value ={'MiB'}>MiB</MenuItem>,
    <MenuItem value ={'GiB'}>GiB</MenuItem>,
    <MenuItem value ={'TiB'}>TiB</MenuItem>,
  ];

  return(
    <Box component="form">
      <TextField id="soft-limit-input" label='Soft Limit' variant='outlined' />
      <Select
        labelId = 'soft-limit-units-label'
        id = 'soft-limit-input'
        value = {units}
        onChange = {handleUnitChange}
      >
        {unitsArray}
      </Select>
      <TextField id="hard-limilt-input" label = 'Hard Limit' variant='outlined'/>
      <Select
        labelId = 'hard-limit-label'
        id = 'hard-limit-label'
        value = {units}
        label="Units"
        onChange = {handleUnitChange}
      >
        {unitsArray}
      </Select>
    </Box>
  )
}