export default function Link({ url }) {
  const withLinkProps = {
    type: 'external',
    url: url,
    target: '_blank',
    routerLink: null,
  };

  return (
    <div className="pv3  tal">
      <div className="col-24">button</div>
    </div>
  );
}
