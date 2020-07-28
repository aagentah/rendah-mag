import Container from '../container';

export default function Footer() {
  return (
    <footer className="footer  bg-almost-white  flex  align-center  justify-center">
      <Container>
        <div className="justify-center">
          <p className="t-secondary  f5  lh-copy  almost-black  pa3">
            This is the footer.
          </p>
        </div>
      </Container>
    </footer>
  );
}
