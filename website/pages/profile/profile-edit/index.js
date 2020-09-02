import { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useDropzone } from 'react-dropzone';

import {
  Modal,
  Image,
  Heading,
  Button,
  Copy,
  Icon,
  Input,
  Label,
} from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../../context-provider/app';
import { useUser } from '../../../lib/hooks';
import passwordStrength from '../../../lib/password-strength';

export default function ProfileEdit({ customerOrders }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [avatarModalActive, setAvatarModalActive] = useState(false);
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();
  const [isSubNewsletter, setIsSubNewsletter] = useState('Loading...');
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [avatarEl, setAvatarEl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setAvatarModalActive(false);

    addToast(`To save your image, make sure to hit Update.`, {
      appearance: 'info',
      autoDismiss: true,
    });

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      setAvatarEl(URL.createObjectURL(file));
      reader.readAsDataURL(file);
      reader.onload = () => setAvatarBlob(reader.result);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    mailchimpGetMember();
  }, []);

  const mailchimpGetMember = async () => {
    const res = await fetch('/api/common/mailchimp/get-member', {
      body: JSON.stringify({
        email: user.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.status === 200) {
      const mailchimpMember = await res.json();
      setIsSubNewsletter('Subscribed');
    } else {
      setIsSubNewsletter('Not Subscribed');
    }
  };

  async function handleEditProfile(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
    };

    if (avatarBlob) body.avatar = avatarBlob;

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
        active={deleteModalActive}
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
                setDeleteModalActive(!deleteModalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>

      <Modal
        /* Options */
        size="medium"
        active={avatarModalActive}
      >
        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Update Avatar"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4">
          <div className="react-dropzone__wrapper" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag & drop your image here, or click to select file</p>
            )}
          </div>
        </div>
        <div className="flex  flex-wrap  pb2">
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
                setAvatarModalActive(!avatarModalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>

      <div className="pb4">
        <Heading
          /* Options */
          htmlEntity="h1"
          text="Edit Profile."
          color="black"
          size="medium"
          truncate={null}
          reveal={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <div className="flex  flex-wrap">
        <div className="col-24  pb4">
          <div className="w4">
            <div className="shadow2">
              <Image
                /* Options */
                src={avatarEl || '/images/avatar-placeholder.png'}
                placeholder={null}
                alt={(user && user.username) || ''}
                figcaption={null}
                height={150}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </div>

        <div className="col-24  pb3">
          <Button
            /* Options */
            type="primary"
            size="small"
            text="Choose Profile Picture"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted
            loading={false}
            disabled={app.isLoading}
            onClick={() => {
              setAvatarModalActive(!avatarModalActive);
            }}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>

      <div className="flex  flex-wrap">
        <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
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
              <div className="pr3  pb3  pb0-md">
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
                    setDeleteModalActive(!deleteModalActive);
                  }}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-24  col-12-md  pr0  pr4-md">
          <div className="flex  justify-between  justify-end-md  align-center  pv3">
            <p className="t-secondary  black  f6  pr2">Newsletter Status:</p>
            <Label
              /* Options */
              customClass="ph3  pv2  shadow2"
              text={isSubNewsletter}
              color="white"
              backgroundColor={
                isSubNewsletter === 'Subscribed' ? 'green' : 'red'
              }
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="flex  justify-between  justify-end-md  align-center  pv3">
            <p className="t-secondary  black  f6  pr2">
              Dominion Subscription:
            </p>
            <Label
              /* Options */
              customClass="ph3  pv2  shadow2"
              text={user?.isDominion ? 'Subscribed' : 'Not Subscribed'}
              color="white"
              backgroundColor={user?.isDominion ? 'green' : 'red'}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </div>
    </>
  );
}
