import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Input from '~/components/elements/input';
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
  const prefillEmail = router.query?.prefillEmail || null;
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (submitButtonLoading) return false;

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

  // Use Font Awesome icons with Tailwind styling.
  const buttonIconArrowRightWhite = (
    <FontAwesomeIcon
      icon={faArrowRight}
      className="rendah-red"
      style={{ fontSize: '16px' }}
    />
  );
  const buttonIconArrowRightBlack = (
    <FontAwesomeIcon
      icon={faArrowRight}
      className="text-black"
      style={{ fontSize: '16px' }}
    />
  );
  const inputIconEnvelope = (
    <FontAwesomeIcon
      icon={faEnvelope}
      className="text-neutral-400"
      style={{ fontSize: '16px' }}
    />
  );
  const inputIconLock = (
    <FontAwesomeIcon
      icon={faLock}
      className="text-neutral-400"
      style={{ fontSize: '16px' }}
    />
  );

  return (
    <>
      <Layout
        title="login"
        navOffset="center"
        navOnWhite={false}
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
        <div className="container py-24">
          <div className="max-w-xl">
            <div className="pb-12">
              <h1 className="text-neutral-300">Login</h1>
            </div>

            <form noValidate className="px-3 md:px-0" onSubmit={onSubmit}>
              <div className="py-2">
                <Input
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
              <div className="py-2">
                <Input
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

              <div className="flex flex-col items-start gap-y-6 pt-10">
                <div className="flex items-center pb-3 md:pb-0 md:pr-3">
                  <Button
                    type="primary"
                    size="small"
                    text="Login"
                    color="rendah-red"
                    fluid={false}
                    icon={buttonIconArrowRightWhite}
                    iconFloat={null}
                    inverted={false}
                    loading={submitButtonLoading}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    withLinkProps={{
                      type: 'form',
                      href: null,
                      target: null,
                      routerLink: null,
                      routerLinkProps: null,
                    }}
                  />
                </div>

                <div className="text-neutral-400 text-sm flex items-center pb-3 md:pb-0 md:pr-3">
                  <Link href="/membership" legacyBehavior>
                    <div className="flex justify-start underline cursor-pointer">
                      Don't have an account
                    </div>
                  </Link>
                </div>
                <div className="text-neutral-400 text-sm flex items-center pb-3 md:pb-0 md:pr-3">
                  <Link href="/forgot" legacyBehavior>
                    <div className="flex justify-start underline cursor-pointer">
                      Forgot Password
                    </div>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
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
