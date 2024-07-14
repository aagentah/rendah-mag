import { useEffect, useState } from 'react';

import filter from 'lodash/filter';
import Heading from '~/components/elements/heading';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardTeam from '~/components/card/team';

import { getSiteConfig, getTeamMembers } from '~/lib/sanity/requests';

export default function Post({ siteConfig }) {
  const [core, setCore] = useState(null);
  const [coreLength, setCoreLength] = useState(24);
  const [featured, setFeatured] = useState(null);
  const [featuredLength, setFeaturedLength] = useState(24);

  useEffect(() => {
    const action = async () => {
      const teamRes = await getTeamMembers();
      const core = filter(teamRes, { coreTeam: true });
      const featured = filter(teamRes, (t) => !t.coreTeam);

      setCore(core);
      setCoreLength(core.length);
      setFeatured(featured);
      setFeaturedLength(featured.length);
    };

    action();
  }, []);

  return (
    <Layout
      navOffset="top"
      navOnWhite
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Team',
        description: null,
        image: null,
      }}
      preview={null}
    >
      <Container>
        <section className="pb5  pb6-md">
          <div className="pt4  pb4">
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

          <div className="flex  flex-wrap">
            {[...Array(coreLength)].map((iteration, i) => (
              <div key={iteration} className="col-24  col-6-md">
                <CardTeam i={i} member={core && core[i]} />
              </div>
            ))}
          </div>

          <div className="pt4  pb4">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Featured Writers"
              color="black"
              size="small"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="flex  flex-wrap">
            {[...Array(featuredLength)].map((iteration, i) => (
              <div key={iteration} className="col-24  col-4-md">
                <CardTeam i={i} member={featured && featured[i]} featured />
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
