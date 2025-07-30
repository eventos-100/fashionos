import { CONFIG } from 'src/global-config';

import { FashionLandingView } from 'src/sections/_fashion/view/fashion-landing-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Fashion Events | ${CONFIG.appName}` };

export default function Page() {
  return <FashionLandingView />;
}
