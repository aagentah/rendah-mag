import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';

export default function Layout({ meta, preview, children }) {
  return (
    <>
      <Meta {...meta} />
      {preview && <Alert preview={preview} />}
      <Header />
      <main className="page">{children}</main>
      {
        // <Footer />
      }
    </>
  );
}
