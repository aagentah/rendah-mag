export default function Quote({ quote, source }) {
  return (
    <>
      <p className="bw2  bl  bc-light-grey  pa3">
        <q className="t-body  lh-copy  f5  dark-grey  di  taj">{quote}</q>
        <span className="t-body  lh-copy  f6  dark-grey  fs-normal  di  tac  pt2  pl2">
          - {source}
        </span>
      </p>
    </>
  );
}
