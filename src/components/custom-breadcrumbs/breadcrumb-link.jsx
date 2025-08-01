import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function BreadcrumbsLink({ href, icon, name, disabled, ...other }) {
  const renderContent = () => (
    <ItemRoot disabled={disabled} {...other}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {name}
    </ItemRoot>
  );

  if (href) {
    return (
      <Link
        component={RouterLink}
        href={href}
        color="inherit"
        sx={{
          display: 'inline-flex',
          ...(disabled && { pointerEvents: 'none' }),
        }}
      >
        {renderContent()}
      </Link>
    );
  }

  return renderContent();
}

// ----------------------------------------------------------------------

const ItemRoot = styled('div', {
  shouldForwardProp: (prop) => !['disabled', 'sx'].includes(prop),
})(({ disabled, theme }) => ({
  ...theme.typography.body2,
  alignItems: 'center',
  gap: theme.spacing(0.5),
  display: 'inline-flex',
  color: theme.vars.palette.text.primary,
  ...(disabled && {
    cursor: 'default',
    pointerEvents: 'none',
    color: theme.vars.palette.text.disabled,
  }),
}));

const ItemIcon = styled('span')(() => ({
  display: 'inherit',
  /**
   * As ':first-child' for ssr
   * https://github.com/emotion-js/emotion/issues/1105#issuecomment-1126025608
   */
  '& > :first-of-type:not(style):not(:first-of-type ~ *), & > style + *': {
    width: 20,
    height: 20,
  },
}));
