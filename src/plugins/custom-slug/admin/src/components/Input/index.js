import React, { useEffect, useRef }  from 'react';
import { TextInput } from '@strapi/design-system/TextInput';

import { Button } from '@strapi/design-system/Button';

import { Stack } from '@strapi/design-system/Stack';


export default function Index({ name, value, onChange }) {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  let day = ('0' + dateObj.getDate()).slice(-2);
  let hours = ('0' + dateObj.getHours()).slice(-2);
  let minutes = ('0' + dateObj.getMinutes()).slice(-2);
  let seconds = ('0' + dateObj.getSeconds()).slice(-2);
  let slug_name = (`post-${year}-${month}-${day}-${hours}-${minutes}-${seconds}`);

  const ref = useRef(null);
  

  const generateSlug = () => {
    onChange({ target: { name, value: slug_name } })
  };

  
  // const clearGeneratedSlug = () => {
  //   onChange({ target: { name, value: "" } })
  // };
  
 
  return (
    <Stack spacing={1}>

      <Stack padding={4} spacing={2}>
      <TextInput
        label="slug_input"
        name="slug_input"
        onChange={(e) =>
          onChange({
            target: { name, value: e.target.value },
          })
        }
        value={value ? value : generateSlug()}
        ref={ref}
        
        
      >
      </TextInput>
        <Stack horizontal spacing={4}>
          <Button onClick={() => generateSlug()}>Generate</Button>
          {/* <Button onClick={() => clearGeneratedSlug()}>Clear</Button> */}
        </Stack>
      </Stack>

    </Stack>
  )
}