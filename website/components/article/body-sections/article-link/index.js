import Button from '~/components/elements/button';

export default function ArticleLink({ text, url }) {
  return (
    <div className="flex  flex-wrap  pb3">
      <div className="col-6"></div>
      <div className="col-24  col-12-md  pv3  flex  justify-center">
        <Button
          /* Options */
          type="primary"
          size="small"
          text={text}
          color="black"
          fluid={false}
          icon={null}
          iconFloat={null}
          inverted={true}
          loading={false}
          disabled={false}
          skeleton={false}
          onClick={null}
          /* Children */
          withLinkProps={{
            type: 'external',
            href: url,
            target: '_blank',
            routerLink: null,
            routerLinkProps: null,
          }}
        />
      </div>
      <div className="col-6"></div>
    </div>
  );
}
