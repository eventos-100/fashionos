import { CONFIG } from 'src/global-config';

import { IconifyView } from 'src/sections/_examples/icons-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Iconify Icon | Components - ${CONFIG.appName}` };

export default function Page() {
  return <IconifyView />;
}
