import { CONFIG } from 'src/global-config';

import { FashionLandingView } from 'src/sections/_fashion/view/fashion-landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `Fashion Events | ${CONFIG.appName}`,
  description: 'Discover exclusive fashion events, runway shows, and designer collections worldwide.',
  keywords: 'fashion,events,runway,shows,designers,collections,fashion week',
};

export default function Page() {
  return <FashionLandingView />;
}
