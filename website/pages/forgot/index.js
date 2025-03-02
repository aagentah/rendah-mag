import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Input from '~/components/elements/input';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { getSiteConfig } from '~/lib/sanity/requests';
import validEmail from '~/lib/valid-email';

export default function Forgot({ siteConfig }) {
  const dispatch = useDispatchApp();
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    // Prevent double submit
    if (submitButtonLoading) return false;

    const body = {
      username: e.currentTarget.username.value,
    };

    if (!body.username || !validEmail(body.username)) {
      return toast.error('Please enter a valid email.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setSubmitButtonLoading(true);

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

    setTimeout(() => setSubmitButtonLoading(false), 500);
    dispatch({ type: 'TOGGLE_LOADING' });
    return true;
  }

  // Match the Login page icons and styling.
  const buttonIconArrowRight = (
    <FontAwesomeIcon
      icon={faArrowRight}
      className="text-neutral-400"
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

  return (
    <Layout
      navOffset="center"
      navOnWhite={false}
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Forgot Password',
        description: 'Forgot your password?',
        image: null,
      }}
      preview={null}
    >
      <div className="container py-24">
        <div className="max-w-xl">
          <div className="pb-12">
            <h1 className="text-neutral-300">Forgot Password</h1>
          </div>

          <form noValidate className="px-3 md:px-0" onSubmit={onSubmit}>
            <div className="py-2">
              <Input
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

            <div className="block md:flex flex-wrap items-center pt-10">
              <div className="flex items-center pb-3 md:pb-0 md:pr-3">
                <Button
                  type="primary"
                  size="small"
                  text="Reset"
                  color="neutral-400"
                  fluid={false}
                  icon={buttonIconArrowRight}
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
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  return {
    props: { siteConfig },
  };
}
