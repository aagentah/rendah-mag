export default function Quote({ quote, source }) {
  return (
    <>
      <p className="flex  flex-wrap  justify-center  pt4">
        <div className="col-24">
          <q className="t-body  lh-copy  f5  dark-grey  tac  fs-italic  db">
            {quote}
          </q>
        </div>
        <div className="col-24">
          <span className="t-body  lh-copy  f5  grey  tac  db">~~~</span>
        </div>
        <div className="col-24">
          <span className="t-body  lh-copy  f5  dark-grey  fw7  tac  db">
            {source}
          </span>
        </div>
      </p>
    </>
  );
}
