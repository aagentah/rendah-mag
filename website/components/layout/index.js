import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';

export default function Layout({
  navOffset,
  navOnWhite,
  meta,
  preview,
  children,
}) {
  let navOffsetType;

  switch (navOffset) {
    case 'top':
      navOffsetType = 'pt5  mt3';
      break;
    case 'center':
      navOffsetType = 'flex  align-center';
      break;
    case 'top':
      navOffsetType = 'pt5  mt3';
      break;
    default:
      navOffsetType = '';
      break;
  }
  return (
    <>
      <Meta {...meta} />
      {preview && <Alert preview={preview} />}
      <Header navOnWhite={navOnWhite} />
      <main className={`page ${navOffsetType}`}>{children}</main>
      <Footer />
    </>
  );
}
