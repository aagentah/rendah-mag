import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { Heading, Button, Icon, Input } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { getSiteConfig } from '../../lib/sanity/requests';

export default function Forgot({ siteConfig }) {
  const { addToast } = useToasts();

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
    };

    const res = await fetch('../api/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      await res.json();
      addToast("We've sent you an email with some instructions", {
        appearance: 'info',
        autoDismiss: true,
      });
    } else {
      addToast(
        'Something went wrong, are you sure you used the correct email?',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    }
  }

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;

  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite={true}
        meta={{
          siteConfig,
          title: 'Forgot Password',
          description: 'This is the Forgot Password page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Forgot Password"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <form className="form  form--default  mla  mra" onSubmit={onSubmit}>
            <div className="pv2">
              <Input
                /* Options */
                type="email"
                label="Email"
                name="username"
                value=""
                icon={inputIconEnvelope}
                required
                disabled={false}
                readOnly={false}
              />
            </div>

            <div className="df  dib-md  flex-wrap  align-center  pt3">
              <div className="col-24  di-md  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Reset"
                  color="black"
                  fluid={false}
                  icon={buttonIconArrowRight}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'form',
                    href: null,
                    target: null,
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />
              </div>
              <div className="col-24  di-md  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Log in"
                  color="black"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/login',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: null,
                  }}
                />
              </div>
            </div>
          </form>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
