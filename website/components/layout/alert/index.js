import Container from '../container';

export default function Alert() {
  return (
    <Container>
      <>
        This page is a preview.
        {' '}
        <a
          href="/api/sanity/exit-preview"
          className="underline hover:text-cyan duration-200 transition-colors"
        >
          Click here
        </a>
        {' '}
        to exit preview mode.
      </>
    </Container>
  );
}
