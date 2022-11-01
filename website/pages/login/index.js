import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Input from '~/components/elements/input';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { getSiteConfig } from '~/lib/sanity/requests';
import validEmail from '~/lib/valid-email';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowRight)
);

const IconEnvelope = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconEnvelope)
);

const IconLock = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconLock)
);

export default function Login({ siteConfig }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const fwdRoute = router.query?.fwdRoute ? router.query.fwdRoute : null;
  const prefillEmail = router.query?.prefillEmail || null;
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    // Prevent double submit
    if (submitButtonLoading) return false;

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
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
      body: JSON.stringify(body)
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
    } else {
      // Error
      toast.error(
        'Something went wrong, have you used the correct Username/Password?'
      );

      setTimeout(() => setSubmitButtonLoading(false), 500);
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    return true;
  };

  useEffect(() => {
    if (router.query?.username && router.query?.hash && router.query?.salt) {
      const loginViaQuery = async () => {
        const body = {
          username: router.query.username,
          password: `${router.query.salt}:${router.query.hash}`
        };

        dispatch({ type: 'TOGGLE_LOADING' });
        setSubmitButtonLoading(true);

        // Post to log in API
        const response = await fetch(`${process.env.SITE_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          // Success
          mutate(await response.json());
        } else {
          // Error
          toast.error(
            'Something went wrong, please try again, or a different browser?'
          );

          setTimeout(() => setSubmitButtonLoading(false), 500);
        }

        dispatch({ type: 'TOGGLE_LOADING' });
        return true;
      };

      loginViaQuery();
    }
  }, [router.query.username, router.query.hash, router.query.salt]);

  useEffect(() => {
    if (user) Router.push(`${fwdRoute ? `/${fwdRoute}` : '/profile'}`);
  }, [user, fwdRoute]);

  const buttonIconArrowRightWhite = <IconArrowRight color="white" size={16} />;
  const buttonIconArrowRightBlack = <IconArrowRight color="black" size={16} />;
  const inputIconEnvelope = <IconEnvelope color="black" size={16} />;
  const inputIconLock = <IconLock color="black" size={16} />;

  return (
    <>
      <Layout
        title="login"
        navOffset="center"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Log In',
          description: null,
          image: null
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
                value={prefillEmail}
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
                  icon={buttonIconArrowRightWhite}
                  iconFloat={null}
                  inverted={false}
                  loading={submitButtonLoading}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'form',
                    href: null,
                    target: null,
                    routerLink: null,
                    routerLinkProps: null
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
                  icon={buttonIconArrowRightBlack}
                  iconFloat={null}
                  inverted
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
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/forgot',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      scroll: false
                    }
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
    props: { siteConfig }
  };
}
