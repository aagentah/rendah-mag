import { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  Modal,
  Heading,
  Button,
  Copy,
  Icon,
  Input,
} from 'next-pattern-library';
import { useToasts } from 'react-toast-notifications';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { useApp, useDispatchApp } from '../../context-provider/app';
import { useUser } from '../../lib/hooks';
import { getSiteConfig } from '../../lib/sanity/requests';
import passwordStrength from '../../lib/password-strength';

function ProfileEdit() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();

  async function handleEditProfile(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
    };

    if (e.currentTarget.password.value) {
      body.password = e.currentTarget.password.value;

      if (body.password !== e.currentTarget.rpassword.value) {
        addToast("The passwords don't match", {
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      }

      if (body.password === e.currentTarget.username.value) {
        addToast('Password should not match Username', {
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
    }

    console.log('body', body);

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(true);

    const res = await fetch('../api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const updatedUser = await res.json();
      mutate(updatedUser);
      addToast('Successfully updated', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast('Error whilst updating, try again.', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(false);
  }

  async function handleDeleteProfile() {
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(true);

    const res = await fetch('../api/user', {
      method: 'DELETE',
    });

    if (res.status === 204) {
      mutate({ user: null });
      Router.replace('/');
    } else {
      addToast('Error whilst deleting, try again.', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(false);
  }

  const buttonIconTrash = <Icon icon={['fas', 'trash']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconUser = <Icon icon={['fas', 'user']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;

  return (
    <>
      <Modal
        /* Options */
        size="small"
        active={modalActive}
      >
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Are you sure?"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Copy
            /* Options */
            text="This is the point of no return. Are you sure you want to DELETE your account?"
            color="black"
            size="medium"
            truncate={2}
          />
        </div>
        <div className="flex  flex-wrap  pb2">
          <div className="col-24  col-12-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Delete"
              color="red"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={handleDeleteProfile}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="col-24  col-12-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="secondary"
              size="medium"
              text="Cancel"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={() => {
                setModalActive(!modalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>

      <form className="form  form--default" onSubmit={handleEditProfile}>
        <div className="pv2">
          <Input
            /* Options */
            type="email"
            label="Email"
            name="username"
            value={(user && user.username) || ''}
            icon={inputIconEnvelope}
            required
            disabled={false}
            readOnly
          />
        </div>
        <div className="pv2">
          <Input
            /* Options */
            type="text"
            label="Name"
            name="name"
            value={(user && user.name) || ''}
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
            required={false}
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
            required={false}
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
              text="Update"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={updateButtonLoading}
              disabled={app.isLoading}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'form',
                url: null,
                target: null,
                routerLink: null,
              }}
            />
          </div>
          <div className="pr3">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Delete Profile"
              color="black"
              fluid={false}
              icon={buttonIconTrash}
              iconFloat={null}
              inverted
              loading={false}
              disabled={app.isLoading}
              onClick={() => {
                setModalActive(!modalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  return (
    <>
      <Layout
        meta={{
          siteConfig,
          title: 'Profile',
          description: 'This is the Profile page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Profile"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          {user && (
            <>
              {
                // <p>Your profile: {JSON.stringify(user)}</p>
              }
              <ProfileEdit />
            </>
          )}
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
