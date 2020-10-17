import { useEffect, useState } from 'react';
import { Heading } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardTeam from '~/components/card/team';

import { getSiteConfig, getTeamMembers } from '~/lib/sanity/requests';

export default function Post({ siteConfig }) {
  const [team, setTeam] = useState(null);
  const [teamLength, setTeamLength] = useState(40);

  const handleAsyncTasks = async () => {
    const teamData = await getTeamMembers();
    setTeamLength(teamData.length);
    setTeam(teamData);
  };

  useEffect(() => {
    handleAsyncTasks();
  }, []);

  return (
    <Layout
      navOffset="top"
      navOnWhite
      meta={{
        siteConfig,
        title: 'Team',
        description: null,
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

        <section className="pb3">
          <div className="flex  flex-wrap">
            {[...Array(teamLength)].map((iteration, i) => (
              <div key={iteration} className="col-24  col-6-md">
                <div className="pa3">
                  <CardTeam
                    i={i}
                    teamMember={team && team[i]}
                    columnCount="4"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
