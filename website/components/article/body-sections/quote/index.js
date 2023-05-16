export default function Quote({ quote, source }) {
  return (
    <>
      <div className="flex  flex-wrap  pb4">
        <div className="col-6"></div>
        <div className="col-24  col-12-md  flex  justify-center">
          <p className="flex  flex-wrap  justify-center  pt4">
            <div className="col-24  pb3">
              <q className="t-primary  lh-title  f5  f3-md  grey  tal  db">
                {quote}
              </q>
            </div>

            <div className="col-24">
              <span className="t-secondary  lh-copy  f5  grey  fw7  tal  db">
                {source}
              </span>
            </div>
          </p>
        </div>
        <div className="col-6"></div>{' '}
      </div>
    </>
  );
}
