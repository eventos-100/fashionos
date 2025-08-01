'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { RouterLink } from 'src/routes/components';
import { usePathname, useSearchParams } from 'src/routes/hooks';

import { FieldsDemo } from './fields-demo';
import { ComponentLayout } from '../layout';
import { ControlsDemo } from './controls-demo';

// ----------------------------------------------------------------------

const CATEGORIES = [
  { value: '', label: 'Fields' },
  { value: 'controls', label: 'Controls' },
];

// ----------------------------------------------------------------------

const CATEGORY_PARAM = 'category';

export function FormValidationView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get(CATEGORY_PARAM) ?? '';

  const [debug, setDebug] = useState(true);

  const handleChangeDebug = useCallback((event) => {
    setDebug(event.target.checked);
  }, []);

  const createRedirectPath = (currentPath, query) => {
    const queryString = new URLSearchParams({ [CATEGORY_PARAM]: query }).toString();
    return query ? `${currentPath}?${queryString}` : currentPath;
  };

  return (
    <ComponentLayout
      heroProps={{
        heading: 'Form validation',
        moreLinks: ['https://react-hook-form.com', 'https://zod.dev'],
      }}
      containerProps={{ maxWidth: 'lg' }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        React hook form + Zod
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ToggleButtonGroup exclusive value={selectedCategory}>
          {CATEGORIES.map((option) => (
            <ToggleButton
              key={option.label}
              component={RouterLink}
              href={createRedirectPath(pathname, option.value)}
              value={option.value}
              aria-label={option.label}
            >
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <FormControlLabel
          label="Show debug"
          labelPlacement="start"
          control={
            <Switch
              checked={debug}
              onChange={handleChangeDebug}
              slotProps={{ input: { id: 'debug-switch' } }}
            />
          }
          sx={[
            (theme) => ({
              display: 'none',
              [theme.breakpoints.up(1440)]: {
                display: 'flex',
              },
            }),
          ]}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {selectedCategory === '' && <FieldsDemo debug={debug} onCloseDebug={() => setDebug(false)} />}

      {selectedCategory === 'controls' && (
        <ControlsDemo debug={debug} onClose={() => setDebug(false)} />
      )}
    </ComponentLayout>
  );
}
