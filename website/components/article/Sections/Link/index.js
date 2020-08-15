export default function Link() {
  const withLinkProps = {
    type: 'external',
    url: this.props.url,
    target: '_blank',
    routerLink: null,
  };

  return (
    <div className="pv3  tal">
      <div className="col-24">button</div>
    </div>
  );
}
