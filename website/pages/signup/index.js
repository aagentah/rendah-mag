import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { Heading, Button, Icon, Input, Checkbox } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useUser } from '~/lib/hooks';
import { getSiteConfig } from '~/lib/sanity/requests';
import passwordStrength from '~/lib/password-strength';

export default function Sigup({ siteConfig }) {
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();

  async function onSubmit(e) {
    e.preventDefault();
    let hasError = false;

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
      age: e.currentTarget.age.checked,
      addMailchimp: e.currentTarget.addMailchimp.checked,
    };

    console.log('e', e.currentTarget.username.required);
    console.log('body', body);

    if (!body.username) {
      addToast('Please enter a valid email.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (!body.name) {
      addToast('Please enter your name.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (!body.password) {
      addToast('Please enter a password.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (!body.age) {
      addToast('Please confirm you are 18+.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      addToast("The passwords don't match.", {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (body.password === e.currentTarget.username.value) {
      addToast('Password should not match email.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (body.password === e.currentTarget.name.value) {
      addToast('Password should not match name.', {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    // Check password strength
    const isPasswordValid = passwordStrength(body.password);
    if (!isPasswordValid.isValid) {
      addToast(isPasswordValid.message, {
        appearance: 'error',
        autoDismiss: true,
      });

      hasError = true;
    }

    if (hasError) {
      return;
    }

    const res = await fetch('../api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      addToast(await res.text(), {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/profile');
  }, [user]);

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconUser = <Icon icon={['fas', 'user']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;

  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite
        meta={{
          siteConfig,
          title: 'Sign Up',
          description: 'his is the Sign Up page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Sign up"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <form
            className="form  form--default  mla  mra"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="pv2">
              <Input
                /* Options */
                type="text"
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
                type="text"
                label="Name"
                name="name"
                value=""
                icon={inputIconUser}
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
            <div className="pv2">
              <Input
                /* Options */
                type="password"
                label="Repeat Password"
                name="rpassword"
                value=""
                icon={inputIconLock}
                required
                disabled={false}
                readOnly={false}
              />
            </div>
            <div className="pv2">
              <Checkbox
                /* Options */
                label="Confirm I am 18+ years old."
                name="age"
                checked={false}
                required
                disabled={false}
                onClick={null}
              />
            </div>
            <div className="pv2">
              <Checkbox
                /* Options */
                label="Add to Rendah's Mailout (We promise to only send relevant content)."
                name="addMailchimp"
                checked={false}
                required={false}
                disabled={false}
                onClick={null}
              />
            </div>

            <div className="df  dib-md  flex-wrap  align-center  pt3">
              <div className="col-24  di-md  pb3  pb0-md  pr3-md">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Sign up"
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
                  text="I already have an account"
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
