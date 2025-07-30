import { MainLayout } from 'src/layouts/main';

import { EcommerceLayout } from 'src/sections/_ecommerce/layout';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <MainLayout>
      <EcommerceLayout>{children}</EcommerceLayout>
    </MainLayout>
  );
}
