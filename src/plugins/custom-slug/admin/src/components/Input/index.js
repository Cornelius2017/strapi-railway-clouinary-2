import React, { useRef } from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';


export default function Index() {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  let day = ('0' + dateObj.getDate()).slice(-2);
  let hours = ('0' + dateObj.getHours()).slice(-2);
  let minutes = ('0' + dateObj.getMinutes()).slice(-2);
  let seconds = ('0' + dateObj.getSeconds()).slice(-2);
  let slug_name = (`post-${year}-${month}-${day}-${hours}-${minutes}-${seconds}`);

  const ref = useRef(null);

  return (
    <Stack spacing={1}>

      <TextInput
        ref={ref}
        label="slug"
        name="slug"
        placeholder={slug_name}
        value="test slug"
        disabled="true"
      >
      </TextInput>

    </Stack>
  )
}