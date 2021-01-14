import { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

import {
  Modal,
  Image,
  Heading,
  Button,
  Copy,
  Icon,
  Input,
  Checkbox,
  Label,
} from 'next-pattern-library';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import passwordStrength from '~/lib/password-strength';
import { imageBuilder } from '~/lib/sanity/requests';
import findUserByHandle from '~/lib/sanity/user/findUserByHandle';

export default function ProfileEdit() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [passwordModalActive, setPasswordModalActive] = useState(false);
  const [
    updatePasswordButtonLoading,
    setUpdatePasswordButtonLoading,
  ] = useState(false);
  const [avatarModalActive, setAvatarModalActive] = useState(false);
  const [user, { mutate }] = useUser();
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);

  const userTags = [
    'Producer',
    'DJ',
    'Visual Artist',
    'Label',
    'Listener',
    'Developer',
    'Engineer',
  ];

  const onDrop = useCallback(
    (acceptedFiles) => {
      setAvatarModalActive(false);

      toast.info(`To save your image, make sure to hit Update.`);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        setAvatarImage(URL.createObjectURL(file));
        reader.readAsDataURL(file);
        reader.onload = () => setAvatarBlob(reader.result);
      }
    },
    [setAvatarModalActive]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    if (user?.avatar) {
      setAvatarImage(
        imageBuilder
          .image(user.avatar)
          .height(500)
          .width(500)
          .auto('format')
          .url()
      );
    }
  }, [user]);

  async function handleUpdatePassword(e) {
    e.preventDefault();

    // Prevent double submit
    if (updatePasswordButtonLoading) return;

    const body = {
      password: e.currentTarget.password.value,
    };

    if (!body.password) {
      return toast.error('Please enter a new password');
    }

    if (e.currentTarget.password.value) {
      body.password = e.currentTarget.password.value;

      if (body.password !== e.currentTarget.rpassword.value) {
        return toast.error("The passwords don't match");
      }

      if (body.password === user?.username) {
        return toast.error('Password should not match Username');
      }

      if (body.password === user?.name) {
        return toast.error('Password should not match Name');
      }

      // Check password strength
      const isPasswordValid = passwordStrength(body.password);
      if (!isPasswordValid.isValid) {
        return toast.error(isPasswordValid.message);
      }
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdatePasswordButtonLoading(true);

    // Update user
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
      toast.success('Password successfully updated');
      setPasswordModalActive(false);
    } else {
      // Error
      toast.error('Error whilst updating, try again, or a different browser.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdatePasswordButtonLoading(false);
  }

  async function handleEditProfile(e) {
    e.preventDefault();

    // Prevent double submit
    if (updateButtonLoading) return;

    const tags = [];

    for (let i = 0; i < userTags.length; i += 1) {
      const checkbox = e.currentTarget[userTags[i]];

      tags.push({
        name: checkbox.name,
        status: checkbox.checked ? 'active' : 'inactive',
      });
    }

    const body = {
      username: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
      handle: e.currentTarget.handle.value,
      publicProfile: e.currentTarget.publicProfile.checked,
    };

    if (!body.name) {
      return toast.error('Please enter your name');
    }

    if (!body.handle) {
      return toast.error('Please add a Dominion handle');
    }

    if (!/^[a-zA-Z0-9]*$/.test(body.handle)) {
      return toast.error(
        'The Dominion handle should only contain alphanumeric characters'
      );
    }

    if (body.handle && body.handle !== body.handle) {
      const userByHandle = await findUserByHandle(body.handle);

      console.log('userByHandle', userByHandle);

      if (userByHandle?.username) {
        return toast.error('This Dominion handle is already in use');
      }
    }

    if (tags.length > 0) body.tags = tags;
    if (avatarBlob) body.avatar = avatarBlob;

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(true);

    // Update user
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
      toast.success('Successfully updated');
    } else if (response.status === 413) {
      // File too big
      toast.error(
        'File too big. Please make sure your file does not exceed 1 MB'
      );
    } else {
      // Error
      toast.error('Error whilst updating, try again, or a different browser.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(false);
  }

  const buttonIconTrash = <Icon icon={['fas', 'trash']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconUser = <Icon icon={['fas', 'user']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;
  const inputIconAt = <Icon icon={['fas', 'at']} />;

  if (user) {
    return (
      <>
        <Modal
          /* Options */
          size="small"
          active={passwordModalActive}
        >
          <div className="pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Change your password"
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
              text="Enter your new password."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <form
            noValidate
            autocomplete="off"
            name="lastpass-disable-search"
            className="w-100"
            onSubmit={handleUpdatePassword}
          >
            <div className="flex  flex-wrap">
              <div className="col-24  pb3">
                <div className="pv2">
                  <Input
                    /* Options */
                    type="password"
                    label="Change Password"
                    name="password"
                    value=""
                    icon={inputIconLock}
                    required={true}
                    disabled={false}
                    readOnly={false}
                  />
                </div>
                <div className="pv2  mb3">
                  <Input
                    /* Options */
                    type="password"
                    label="Repeat Change Password"
                    name="rpassword"
                    value=""
                    icon={inputIconLock}
                    required={true}
                    disabled={false}
                    readOnly={false}
                  />
                </div>
              </div>
            </div>
            <div className="flex  flex-wrap  pb2">
              <div className="col-12  flex  justify-center  justify-start-md  align-center">
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
                  loading={updatePasswordButtonLoading}
                  disabled={false}
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
              <div className="col-12  flex  justify-center  justify-start-md  align-center">
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
                    setPasswordModalActive(false);
                  }}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
            </div>
          </form>
        </Modal>

        <Modal
          /* Options */
          size="medium"
          active={avatarModalActive}
        >
          <div className="pb3">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Change Avatar"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb4">
            <Copy
              /* Options */
              text="Recomended square & at least 720px & under 1 MB."
              color="black"
              size="medium"
              truncate={null}
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

        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Edit Profile."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          <div className="col-24  pb4">
            <div className="w4">
              <Image
                /* Options */
                src={avatarImage || '/images/avatar-placeholder.png'}
                placeholder={null}
                alt={user?.username || ''}
                figcaption={null}
                height={null}
                width={null}
                customClass="shadow2"
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>

          <div className="col-24  pb4">
            <div className="dib">
              <Button
                /* Options */
                type="primary"
                size="small"
                text="Change Avatar"
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
        </div>

        <form noValidate className="w-100" onSubmit={handleEditProfile}>
          <div className="flex  flex-wrap">
            <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
              <div className="pv2">
                <Input
                  /* Options */
                  type="email"
                  label="Email"
                  name="username"
                  value={user?.username || ''}
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
                  value={user?.name || ''}
                  icon={inputIconUser}
                  required
                  disabled={false}
                  readOnly={false}
                />
              </div>
              <div className="pv2">
                <Input
                  /* Options */
                  type="text"
                  label="Dominion Handle"
                  name="handle"
                  value={user?.handle || ''}
                  icon={inputIconAt}
                  required
                  disabled={false}
                  readOnly={false}
                />
              </div>
              <div className="pv3">
                <Checkbox
                  /* Options */
                  label="Public Profile (Coming Soon)"
                  name="publicProfile"
                  checked={user.publicProfile}
                  required={false}
                  disabled={false}
                  onClick={null}
                />
              </div>
            </div>
            <div className="col-24  col-12-md  pb3  pb0-md">
              <div className="bg-almost-white  pa3  pa4-md">
                <div className="pb2">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text="I am..."
                    color="black"
                    size="small"
                    truncate={0}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="flex  flex-wrap">
                  {userTags.map((tag) => (
                    <div key={tag} className="col-24  col-12-md">
                      <div className="pv2">
                        <Checkbox
                          /* Options */
                          label={tag}
                          name={tag}
                          checked={user.tags?.length && user.tags.includes(tag)}
                          required={false}
                          disabled={false}
                          onClick={null}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-md  flex-wrap  align-end-md  justify-between-md  pt4">
            <div className="db  dib-md  pr3  pb4  pb0-md">
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
            <div className="db  dib-md  pr3  pb1">
              <Button
                /* Options */
                type="secondary"
                size="small"
                text="Change Password"
                color="black"
                fluid={false}
                icon={inputIconLock}
                iconFloat="left"
                inverted
                loading={false}
                disabled={app.isLoading}
                onClick={() => {
                  setPasswordModalActive(!passwordModalActive);
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

  return <p>Loading...</p>;
}
