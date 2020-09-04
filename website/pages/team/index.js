import { Heading } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardTeam from '../../components/card/team';

import { getSiteConfig, getTeamMembers } from '../../lib/sanity/requests';

export default function Post({ siteConfig, allTeam }) {
  console.log('allTeam', allTeam);
  return (
    <Layout
      navOffset="top"
      navOnWhite
      meta={{
        siteConfig,
        title: 'Search',
        description: 'This is the Team page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="pt4  pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Team"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        {allTeam.length === 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              No team found.
            </h2>
          </section>
        )}

        {allTeam.length > 0 && (
          <section className="pb3">
            <div className="flex  flex-wrap">
              {allTeam.map((teamMember, i) => (
                <div key={teamMember.slug} className="col-24  col-6-md">
                  <div className="pa3">
                    <CardTeam i={i} teamMember={teamMember} columnCount="4" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const allTeam = await getTeamMembers();

  return {
    props: {
      siteConfig,
      allTeam,
    },
  };
}
