import React, { useRef }  from 'react';
import { TextInput } from '@strapi/design-system/TextInput';

import { Button } from '@strapi/design-system/Button';

import { Stack } from '@strapi/design-system/Stack';


export default function Index({ name, value, onChange, attribute }) {
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
    onChange({ target: { name, value: slug_name, type: attribute.type } })
  };

  
  const clearGeneratedSlug = () => {
    onChange({ target: { name, value: "", type: attribute.type } })
  };
  
  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
      <TextInput
        label="slug_input"
        name="slug_input"
        onChange={(e) =>
          onChange({
            target: { name, value: e.target.value, type: attribute.type },
          })
        }
        value={value ? value : generateSlug()}
        ref={ref}
      >
      </TextInput>
        <Stack horizontal spacing={1}>
          <Button onClick={() => clearGeneratedSlug()}>Generate</Button>
          {/* <Button onClick={() => clearGeneratedSlug()}>Clear</Button> */}
        </Stack>
      </Stack>

    </Stack>
  )
}