import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { Heading, Button, Icon, Input } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { useUser } from '../../lib/hooks';
import { getSiteConfig } from '../../lib/sanity/requests';
import passwordStrength from '../../lib/password-strength';

export default function Sigup({ siteConfig }) {
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      addToast("The passwords don't match", {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    if (body.password === e.currentTarget.username.value) {
      addToast('Password should not match Email', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    if (body.password === e.currentTarget.name.value) {
      addToast('Password should not match Name', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    // Check password strength
    const isPasswordValid = passwordStrength(body.password);
    if (!isPasswordValid.isValid) {
      addToast(isPasswordValid.message, {
        appearance: 'error',
        autoDismiss: true,
      });
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
    if (user) Router.push('/');
  }, [user]);

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconUser = <Icon icon={['fas', 'user']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;

  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite={true}
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

          <form className="form  form--default  mla  mra" onSubmit={onSubmit}>
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

            <div className="flex  flex-wrap  align-center  pt3">
              <div className="pr3">
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
              <div className="pr3">
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
