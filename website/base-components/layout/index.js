import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';

import deviceSize from '~/lib/device-size';

export default function Layout({ meta, preview, children }) {
  // set device type in context API
  deviceSize();

  return (
    <>
      <Meta {...meta} />
      {preview && <Alert preview={preview} />}
      <Header {...meta} />
      <main className="page">{children}</main>
      <Footer />
    </>
  );
}
