import Container from '../container';

export default function Alert() {
  return (
    <div className="z9  bg-black  white">
      <Container>
        <div className="pa3  tac  t-primary">
          This page is a preview.{' '}
          <a href="/api/sanity/exit-preview" className="white  underline">
            Click here
          </a>{' '}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
}
