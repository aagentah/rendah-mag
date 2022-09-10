import Link from 'next/link';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardDashboard from '~/components/card/dashboard';

import { useUser } from '~/lib/hooks';

export default function ProfileCreations({ handleToggle }) {
  const [user, { loading, mutate, error }] = useUser();

  if (user?.isDominion) {
    return (
      <section>
        <div className="profile_heading">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Dominion Dashboard"
            color="white"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="pb4  mb2">
          <p className="white  f6  lh-copy  mla  mra  tac  measure-wide">
            Welcome to the Dominion! Here you can access all exclusive content
            available on your subscription. We add new content here frequently
            month-to-month, make sure to keep an eye here for cool stuff.
          </p>
        </div>

        <div className="flex  flex-wrap  pb3">
          <div className="col-24  col-8-md">
            <div className="ph3  pv2">
              <CardDashboard
                title="Dubplates"
                id="offerings"
                coverImage="https://cdn.sanity.io/images/q8z2vf2k/production/4c4ac0ecf1fee4d9b6b63177ad2842f1a158023b-1920x1342.jpg"
                i={1}
                handleToggle={handleToggle}
              />
            </div>
          </div>
          <div className="col-24  col-8-md">
            <div className="ph3  pv2">
              <CardDashboard
                title="Samples"
                id="packs"
                coverImage="https://cdn.sanity.io/images/q8z2vf2k/production/94fca621e965634f8a04a042e2566cff87874d34-1920x1280.jpg"
                i={2}
                handleToggle={handleToggle}
              />
            </div>
          </div>
          <div className="col-24  col-8-md">
            <div className="ph3  pv2">
              <CardDashboard
                title="Creations"
                id="creations"
                coverImage="https://cdn.sanity.io/images/q8z2vf2k/production/f129fa57166915302fc49e368a0b58b26fc14de6-1024x682.jpg"
                i={3}
                handleToggle={handleToggle}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!user?.isDominion) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion"
            color="white"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Click here to join"
            color="white"
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
              type: 'next',
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                scroll: false
              }
            }}
          />
        </div>
      </>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results."
      color="white"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
