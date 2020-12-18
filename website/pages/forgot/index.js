import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Heading, Button, Icon, Input } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useDispatchApp } from '~/context-provider/app';
import { getSiteConfig } from '~/lib/sanity/requests';

export default function Forgot({ siteConfig }) {
  const dispatch = useDispatchApp();
  const [buttonLoading, setButtonLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(true);

    const body = {
      username: e.currentTarget.username.value,
    };

    // Post to forgot API
    const response = await fetch(`${process.env.SITE_URL}/api/forgot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      toast.info("We've sent you an email with some instructions");
    } else {
      // Error
      toast.error(
        'Something went wrong, are you sure you used the correct email?'
      );
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(false);
  }

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;

  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Forgot Password',
          description: 'Forgot your password?.',
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

          <form
            noValidate
            className="form  form--default  mla  mra  ph3  ph0-md"
            onSubmit={onSubmit}
          >
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
                  loading={buttonLoading}
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
                    routerLinkProps: {
                      scroll: false,
                    },
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
