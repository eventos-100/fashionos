import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { ComponentBox, contentStyles } from '../layout';

// ----------------------------------------------------------------------

const renderText = () => (
  <ComponentBox title="Text">
    <Typography
      variant="h2"
      sx={[
        (theme) => ({
          ...theme.mixins.textGradient(
            `to right, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.main}`
          ),
        }),
      ]}
    >
      Minimals UI
    </Typography>
  </ComponentBox>
);

const renderBorder = () => (
  <ComponentBox title="Border">
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.borderGradient({
            padding: '4px',
            color: `linear-gradient(to right, ${theme.vars.palette.primary.main}, ${varAlpha(theme.vars.palette.warning.mainChannel, 0.2)})`,
          }),
          width: 160,
          height: 160,
          borderRadius: 1.5,
          position: 'relative',
        }),
      ]}
    />
    <Box
      sx={{
        width: 160,
        height: 160,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'fontWeightMedium',
      }}
    >
      <Box
        sx={[
          (theme) => ({
            ...theme.mixins.borderGradient({
              padding: '4px',
              color: `linear-gradient(to top, ${theme.vars.palette.secondary.main}, ${varAlpha(theme.vars.palette.error.mainChannel, 0.2)})`,
            }),
          }),
        ]}
      />
      Content
    </Box>
  </ComponentBox>
);

const renderBackground = () => (
  <>
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(135deg, ${varAlpha(theme.vars.palette.warning.lighterChannel, 0.8)}, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.8)})`,
              `url(${CONFIG.assetsDir}/assets/background/overlay-1.webp)`,
            ],
          }),
          height: 160,
          borderRadius: 1.5,
        }),
      ]}
    />

    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgBlur({
            color: `${varAlpha(theme.vars.palette.primary.mainChannel, 0.24)}`,
            imgUrl: `${CONFIG.assetsDir}/assets/background/overlay-1.webp`,
            blur: 8,
          }),
          height: 160,
          borderRadius: 1.5,
        }),
      ]}
    />

    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.paperStyles(theme),
          height: 160,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'fontWeightMedium',
        }),
      ]}
    >
      Paper
    </Box>

    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(135deg, ${varAlpha('0 0 0', 0.48)}, ${varAlpha('255 255 255', 0.48)})`,
              `url(${CONFIG.assetsDir}/assets/background/overlay-2.webp)`,
              `radial-gradient(farthest-side at bottom right, blue, transparent)`,
              `url(${CONFIG.assetsDir}/assets/background/overlay-1.webp)`,
            ],
            sizes: ['64px 64px', '80px auto', '64px 64px', 'cover'],
            positions: ['top right', 'top left', 'bottom right', 'center'],
          }),
          height: 160,
          borderRadius: 1.5,
        }),
      ]}
    />
  </>
);

// ----------------------------------------------------------------------

export function Gradients() {
  return (
    <>
      <Box sx={{ ...contentStyles.grid(), mb: 5 }}>
        {renderText()}
        {renderBorder()}
      </Box>

      <ComponentBox title="Background" sx={contentStyles.grid(3)}>
        {renderBackground()}
      </ComponentBox>
    </>
  );
}
