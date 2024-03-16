export default function Quote({ quote, source }) {
  return (
    <>
      <div className="flex  flex-wrap  pv3">
        <div className="col-6" />
        <div className="col-24  col-12-md  flex  justify-center">
          <blockquote className="flex flex-wrap justify-center">
            <p className="col-24 t-primary lh-copy f5 f4-md rendah-red tal db">
              "{quote}"<cite className="grey dib pl2">~ {source}</cite>
            </p>
          </blockquote>
        </div>
        <div className="col-6" />{' '}
      </div>
    </>
  );
}
