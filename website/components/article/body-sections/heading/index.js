export default function Heading({ text }) {
  return (
    <>
      <div className="flex  flex-wrap  pb3">
        <div className="col-6"></div>
        <div className="col-24  col-12-md">
          <h2 className="t-primary  lh-title  f2  black">
            {'—'}
            {text}
          </h2>
        </div>
        <div className="col-6"></div>
      </div>
    </>
  );
}
