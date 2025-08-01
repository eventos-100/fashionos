'use client';

import { useState, useCallback } from 'react';
import { useDoubleClick, useCopyToClipboard } from 'minimal-shared/hooks';

import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import { ComponentBox } from '../layout';

// ----------------------------------------------------------------------

const LOREM_TEXT = `
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed
aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
Cras non dolor.
`;

// ----------------------------------------------------------------------

export function CopyToClipboard() {
  const { copy } = useCopyToClipboard();

  const [value, setValue] = useState('https://www.npmjs.com/package/');

  const handleCopy = useCallback(
    (text) => {
      if (text) {
        alert('Copied!');
        copy(text);
      }
    },
    [copy]
  );

  const handleClick = useDoubleClick({
    doubleClick: () => handleCopy(LOREM_TEXT),
  });

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <>
      <ComponentBox title="onChange">
        <TextField
          fullWidth
          hiddenLabel
          value={value}
          onChange={handleChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => handleCopy(value)}>
                      <Iconify icon="solar:copy-outline" width={24} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      </ComponentBox>

      <ComponentBox title="onDoubleClick">
        <Typography onClick={handleClick}>{LOREM_TEXT}</Typography>
      </ComponentBox>
    </>
  );
}
