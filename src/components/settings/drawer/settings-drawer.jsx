'use client';

import { useEffect, useCallback } from 'react';
import { hasKeys, varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';

import { themeConfig } from 'src/theme/theme-config';
import { primaryColorPresets, secondaryColorPresets } from 'src/theme/with-settings';

import { Label } from 'src/components/label';

import { settingIcons } from './icons';
import { Iconify } from '../../iconify';
import { BaseOption } from './base-option';
import { Scrollbar } from '../../scrollbar';
import { SmallBlock, LargeBlock } from './styles';
import { PresetsOptions } from './presets-options';
import { FullScreenButton } from './fullscreen-button';
import { FontSizeOptions, FontFamilyOptions } from './font-options';
import { useSettingsContext } from '../context/use-settings-context';

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }) {
  const settings = useSettingsContext();
  const { mode, setMode, colorScheme } = useColorScheme();

  // Visible options by default settings
  const visibility = {
    mode: hasKeys(defaultSettings, ['mode']),
    fontSize: hasKeys(defaultSettings, ['fontSize']),
    direction: hasKeys(defaultSettings, ['direction']),
    fontFamily: hasKeys(defaultSettings, ['fontFamily']),
    primaryColor: hasKeys(defaultSettings, ['primaryColor']),
  };

  useEffect(() => {
    if (mode !== undefined && mode !== settings.state.mode) {
      settings.setState({ mode });
    }
  }, [mode, settings]);

  const handleReset = useCallback(() => {
    settings.onReset();
    setMode(null);
  }, [setMode, settings]);

  const renderHead = () => (
    <Box
      sx={{
        py: 2,
        pr: 1,
        pl: 2.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <FullScreenButton />

      <Tooltip title="Reset all">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = () => (
    <BaseOption
      label="Mode"
      selected={settings.state.mode === 'dark'}
      icon={<SvgIcon>{settingIcons.moon}</SvgIcon>}
      action={
        mode === 'system' ? (
          <Label
            sx={{
              height: 20,
              cursor: 'inherit',
              borderRadius: '20px',
              fontWeight: 'fontWeightSemiBold',
            }}
          >
            System
          </Label>
        ) : null
      }
      onChangeOption={() => {
        setMode(colorScheme === 'light' ? 'dark' : 'light');
        settings.setState({ mode: colorScheme === 'light' ? 'dark' : 'light' });
      }}
    />
  );

  const renderDirection = () => (
    <BaseOption
      label="Right to left"
      selected={settings.state.direction === 'rtl'}
      icon={<SvgIcon>{settingIcons.alignRight}</SvgIcon>}
      onChangeOption={() => {
        settings.setState({ direction: settings.state.direction === 'ltr' ? 'rtl' : 'ltr' });
      }}
    />
  );

  const renderPresets = () => (
    <LargeBlock
      title="Presets"
      canReset={settings.state.primaryColor !== defaultSettings.primaryColor}
      onReset={() => {
        settings.setState({ primaryColor: defaultSettings.primaryColor });
      }}
    >
      <PresetsOptions
        options={Object.keys(primaryColorPresets).map((key) => ({
          name: key,
          value: [primaryColorPresets[key].main, secondaryColorPresets[key].main],
        }))}
        value={settings.state.primaryColor}
        onChangeOption={(newOption) => {
          settings.setState({ primaryColor: newOption });
        }}
      />
    </LargeBlock>
  );

  const renderFont = () => (
    <LargeBlock title="Font" sx={{ gap: 2.5 }}>
      {visibility.fontFamily && (
        <SmallBlock
          label="Family"
          canReset={settings.state.fontFamily !== defaultSettings.fontFamily}
          onReset={() => {
            settings.setState({ fontFamily: defaultSettings.fontFamily });
          }}
        >
          <FontFamilyOptions
            value={settings.state.fontFamily}
            onChangeOption={(newOption) => {
              settings.setState({ fontFamily: newOption });
            }}
            options={[
              themeConfig.fontFamily.primary,
              'Inter Variable',
              'DM Sans Variable',
              'Nunito Sans Variable',
            ]}
            icon={<SvgIcon sx={{ width: 28, height: 28 }}>{settingIcons.font}</SvgIcon>}
          />
        </SmallBlock>
      )}
      {visibility.fontSize && (
        <SmallBlock
          label="Size"
          canReset={settings.state.fontSize !== defaultSettings.fontSize}
          onReset={() => {
            settings.setState({ fontSize: defaultSettings.fontSize });
          }}
          sx={{ gap: 5 }}
        >
          <FontSizeOptions
            options={[12, 20]}
            value={settings.state.fontSize}
            onChangeOption={(newOption) => {
              settings.setState({ fontSize: newOption });
            }}
          />
        </SmallBlock>
      )}
    </LargeBlock>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: [
            (theme) => ({
              ...theme.mixins.paperStyles(theme, {
                color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
              }),
              width: 360,
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {renderHead()}

      <Scrollbar>
        <Box
          sx={{
            pb: 5,
            gap: 6,
            px: 2.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
            {visibility.mode && renderMode()}
            {visibility.direction && renderDirection()}
          </Box>

          {visibility.primaryColor && renderPresets()}
          {(visibility.fontFamily || visibility.fontSize) && renderFont()}
        </Box>
      </Scrollbar>
    </Drawer>
  );
}
