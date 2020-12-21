import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Heading, Button, Icon, Input } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { getSiteConfig } from '~/lib/sanity/requests';
import validEmail from '~/lib/valid-email';

export default function Login({ siteConfig }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const fwdRoute = router.query?.fwdRoute ? router.query.fwdRoute : null;
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  async function loginViaQuery() {
    const body = {
      username: router.query.username,
      password: `${router.query.salt}:${router.query.hash}`,
    };

    dispatch({ type: 'TOGGLE_LOADING' });
    setSubmitButtonLoading(true);

    // Post to log in API
    const response = await fetch(`${process.env.SITE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
    } else {
      // Error
      toast.error(
        'Something went wrong, please try again, or a different browser?'
      );

      setTimeout(() => {
        setSubmitButtonLoading(false);
      }, 500);
    }

    dispatch({ type: 'TOGGLE_LOADING' });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Prevent double submit
    if (submitButtonLoading) return;

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (!body.username || !validEmail(body.username)) {
      return toast.error('Please enter a valid email.');
    }

    if (!body.password) {
      return toast.error('Please enter your password.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setSubmitButtonLoading(true);

    // Post to log in API
    const response = await fetch(`${process.env.SITE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
    } else {
      // Error
      toast.error(
        'Something went wrong, have you used the correct Username/Password?'
      );

      setTimeout(() => {
        setSubmitButtonLoading(false);
      }, 500);
    }

    dispatch({ type: 'TOGGLE_LOADING' });
  }

  useEffect(() => {
    if (router.query?.username && router.query?.hash && router.query?.salt) {
      loginViaQuery();
    }
  }, []);

  useEffect(() => {
    if (user) Router.push(`${fwdRoute ? `/${fwdRoute}` : '/profile'}`);
  }, [user, fwdRoute]);

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;

  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Log In',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Login"
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
            <div className="pv2">
              <Input
                /* Options */
                type="password"
                label="Password"
                name="password"
                value=""
                icon={inputIconLock}
                required
                disabled={false}
                readOnly={false}
              />
            </div>

            <div className="db  df-md flex-wrap  align-center  pt3">
              <div className="df  db-md  align-center  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Login"
                  color="black"
                  fluid={false}
                  icon={buttonIconArrowRight}
                  iconFloat={null}
                  inverted={false}
                  loading={submitButtonLoading}
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
              <div className="df  db-md  align-center  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text={"I don't have an account"}
                  color="black"
                  fluid={false}
                  icon={buttonIconArrowRight}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/dominion',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false,
                    },
                  }}
                />
              </div>
              <div className="df  db-md  align-center  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Forgot Password"
                  color="black"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/forgot',
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

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
