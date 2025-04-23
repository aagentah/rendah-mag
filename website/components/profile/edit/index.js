import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import imageCompression from 'browser-image-compression';

// import { useStripe, useElements } from '@stripe/react-stripe-js';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Checkbox from '~/components/elements/checkbox';
import Input from '~/components/elements/input';
import Image from '~/components/elements/image';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import passwordStrength from '~/lib/password-strength';
import { imageBuilder } from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));

const IconEnvelope = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconEnvelope)
);
const IconUser = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconUser)
);
const IconLock = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconLock)
);
const IconReceipt = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconReceipt)
);
const IconAt = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconAt)
);
const IconHashtag = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHashtag)
);
const IconDiscord = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconDiscord)
);
const IconPencil = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconPencil)
);

export default function ProfileEdit() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [passwordModalActive, setPasswordModalActive] = useState(false);
  const [updatePasswordButtonLoading, setUpdatePasswordButtonLoading] =
    useState(false);
  const [avatarModalActive, setAvatarModalActive] = useState(false);
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const fileInputRef = useRef(null);
  const [updateAddressButtonLoading, setUpdateAddressButtonLoading] =
    useState(false);
  // const [customer, setCustomer] = useState(null);

  // const stripe = useStripe();
  // const elements = useElements();
  const [user, { mutate }] = useUser();

  console.log('avatarBlob', avatarBlob);
  console.log('avatarImage', avatarImage);

  const userTags = [
    'Producer',
    'DJ',
    'Visual Artist',
    'Label',
    'Listener',
    'Developer',
    'Engineer',
  ];

  const handleFileChange = useCallback(
    async (e) => {
      setAvatarModalActive(false);
      toast.info('To save your image, make sure to hit Update Profile.');
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.size > 10 * 1024 * 1024) {
          return toast.error('File exceeds maximum size of 10MB');
        }
        if (!file.type.startsWith('image/')) {
          return toast.error('Invalid file format');
        }
        try {
          const options = { maxWidthOrHeight: 1080, useWebWorker: true };
          const compressedFile = await imageCompression(file, options);
          const img = new window.Image();
          img.src = URL.createObjectURL(compressedFile);
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          // Note: Dimension check removed as long as file is under 10MB
          setAvatarImage(URL.createObjectURL(compressedFile));
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => setAvatarBlob(reader.result);
        } catch (error) {
          console.error('Image compression failed', error);
          toast.error('Image compression failed, please try another image.');
        }
      }
    },
    [setAvatarModalActive]
  );

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
    if (updatePasswordButtonLoading) return false;
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
      const isPasswordValid = passwordStrength(body.password);
      if (!isPasswordValid.isValid) {
        return toast.error(isPasswordValid.message);
      }
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdatePasswordButtonLoading(true);
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      mutate(await response.json());
      toast.success('Password successfully updated');
      setPasswordModalActive(false);
    } else {
      toast.error('Error whilst updating, try again, or a different browser.');
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdatePasswordButtonLoading(false);
    return true;
  }

  async function handleEditProfile(e) {
    e.preventDefault();
    if (updateButtonLoading) return false;
    const tags = [];
    for (let i = 0; i < userTags.length; i += 1) {
      const checkbox = e.currentTarget[userTags[i]];
      tags.push({
        name: checkbox?.name,
        status: checkbox?.checked ? 'active' : 'inactive',
      });
    }
    const body = {
      username: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
      discordId: e.currentTarget.discordId.value,
    };
    if (!body.name) {
      return toast.error('Please enter your name');
    }
    if (avatarBlob) body.avatar = avatarBlob;
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(true);
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      mutate(await response.json());
      toast.success('Successfully updated');
      fetch('/api/discord/get-dominion-members', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    } else if (response.status === 413) {
      toast.error(
        'File too big. Please make sure your file does not exceed 1 MB'
      );
    } else {
      toast.error('Error whilst updating, try again, or a different browser.');
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(false);
    return true;
  }

  const inputIconEnvelope = <IconEnvelope color="neutral-300" size={16} />;
  const inputIconUser = <IconUser color="neutral-300" size={16} />;
  const inputIconLock = <IconLock color="neutral-300" size={16} />;
  const inputIconReceipt = <IconReceipt color="neutral-300" size={16} />;
  const inputIconAt = <IconAt color="neutral-300" size={16} />;
  const inputIconHash = <IconHashtag color="neutral-300" size={16} />;
  const iconDiscord = <IconDiscord color="neutral-300" size={16} />;
  const iconPencil = <IconPencil color="neutral-300" size={16} />;

  // async function getCustomer() {
  //   const response = await fetch(
  //     `${process.env.SITE_URL}/api/stripe/get-customer`,
  //     {
  //       body: JSON.stringify({
  //         stripeCustomerId: user.stripeCustomerId,
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //       method: 'POST',
  //     }
  //   );
  //   if (response.ok) {
  //     setCustomer(await response.json());
  //   }
  // }

  async function handleUpdateAddress(e) {
    e.preventDefault();
    if (updateAddressButtonLoading) return false;
    const body = {
      address: {
        line1: e.currentTarget.line1.value,
        line2: e.currentTarget.line2.value,
        city: e.currentTarget.city.value,
        postal_code: e.currentTarget.postal_code.value,
        state: e.currentTarget.state.value,
        country: e.currentTarget.country.value,
      },
    };
    if (!body.address?.line1) {
      return toast.error('Please enter your Address Line 1');
    }
    if (!body.address?.city) {
      return toast.error('Please enter your City');
    }
    if (!body.address?.postal_code) {
      return toast.error('Please enter your Postal Code');
    }
    if (!body.address?.state) {
      return toast.error('Please enter your State/County');
    }
    if (!body.address?.country) {
      return toast.error('Please enter your Country');
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateAddressButtonLoading(true);
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      mutate(await response.json());
      toast.success('Successfully updated');
    } else {
      toast.error('Error whilst updating, try again, or a different browser.');
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateAddressButtonLoading(false);
    return true;
  }

  // useEffect(() => {
  //   if (user && !customer) {
  //     getCustomer();
  //   }
  // }, [user, customer]);

  if (user) {
    return (
      <>
        <div className="grid gap-4">
          <div className="w-full md:w-1/2 border border-neutral-700 p-8">
            <div>
              <div className="profile_heading mb-6">
                <Heading
                  htmlEntity="h2"
                  text="Edit Profile"
                  color="neutral-300"
                  size="medium"
                  truncate={null}
                  withLinkProps={null}
                />
              </div>
              <div className="flex flex-wrap mt-6 md:mt-0">
                <div className="w-full mb-6">
                  <div className="size-[120px] relative">
                    <div className="opacity-50 overflow-hidden">
                      <Image
                        src={avatarImage || '/images/avatar-placeholder.png'}
                        placeholder={null}
                        alt={user?.username || ''}
                        figcaption={null}
                        height={120}
                        width={120}
                        customClass="shadow-md"
                        skeleton={false}
                        onClick={null}
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 max-w-prose">
                <p className="text-xs text-neutral-300 opacity-50 max-w-72">
                  Change profile image. Recomended square &amp; at least 720px
                  &amp; under 1MB.
                </p>
              </div>
              <div className="mb-6 max-w-prose">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Button
                  type="secondary"
                  size="small"
                  text={avatarBlob ? 'Change image' : 'Upload image'}
                  color="neutral-300"
                  fluid={false}
                  icon={iconPencil}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  withLinkProps={null}
                />
              </div>
              <form noValidate className="w-full" onSubmit={handleEditProfile}>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
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
                    <div className="py-2">
                      <Input
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
                    <div className="py-2 relative hidden">
                      <Input
                        type="text"
                        label="Discord Username"
                        name="discordId"
                        value={user?.discordId || ''}
                        icon={inputIconAt}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                      <a
                        href="https://discord.com/invite/ev2Q22C"
                        target="_blank"
                        className="absolute top-0 right-0 text-sm pt-4 pr-2 text-gray-500 underline"
                      >
                        {iconDiscord}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="md:flex flex-wrap md:items-end md:justify-between mt-6">
                  <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0">
                    <Button
                      type="primary"
                      size="small"
                      text="Update profile"
                      color="neutral-300"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={updateButtonLoading}
                      disabled={app.isLoading}
                      skeleton={false}
                      onClick={null}
                      withLinkProps={{
                        type: 'form',
                        url: null,
                        target: null,
                        routerLink: null,
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full md:w-1/2 border border-neutral-700 p-8">
            <div className="profile_heading mb-6">
              <Heading
                htmlEntity="h2"
                text="Change your password"
                color="neutral-300"
                size="medium"
                truncate={null}
                withLinkProps={null}
              />
            </div>
            <form
              noValidate
              autoComplete="off"
              name="lastpass-disable-search"
              className="w-full"
              onSubmit={handleUpdatePassword}
            >
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                  <div className="py-2">
                    <Input
                      type="password"
                      label="New Password"
                      name="password"
                      value=""
                      icon={inputIconLock}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                  <div className="py-2 mb-4">
                    <Input
                      type="password"
                      label="Repeat New Password"
                      name="rpassword"
                      value=""
                      icon={inputIconLock}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-1/2 flex justify-center md:justify-start items-center">
                  <Button
                    type="primary"
                    size="small"
                    text="Update password"
                    color="neutral-300"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={false}
                    loading={updatePasswordButtonLoading}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    withLinkProps={{
                      type: 'form',
                      url: null,
                      target: null,
                      routerLink: null,
                    }}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/2 border border-neutral-700 p-8">
            <div>
              <div className="mb-6">
                <Heading
                  htmlEntity="h2"
                  text="Shipping Address"
                  color="neutral-300"
                  size="medium"
                  truncate={null}
                  withLinkProps={null}
                />
              </div>
              <form className="w-full" onSubmit={handleUpdateAddress}>
                <div className="flex flex-wrap mb-6 gap-4">
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="Address Line 1"
                        name="line1"
                        value={user?.address?.line1 || ''}
                        icon={null}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="Address Line 2"
                        name="line2"
                        value={user?.address?.line2 || ''}
                        icon={null}
                        required={false}
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="City"
                        name="city"
                        value={user?.address?.city || ''}
                        icon={null}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="Postal Code"
                        name="postal_code"
                        value={user?.address?.postal_code || ''}
                        icon={null}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="State/County"
                        name="state"
                        value={user?.address?.state || ''}
                        icon={null}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="py-2">
                      <Input
                        type="text"
                        label="Country"
                        name="country"
                        value={user?.address?.country || ''}
                        icon={null}
                        required
                        disabled={false}
                        readOnly={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    type="primary"
                    size="small"
                    text="Update Address"
                    color="neutral-300"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={true}
                    loading={updateAddressButtonLoading}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    withLinkProps={{
                      type: 'form',
                    }}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="w-full md:w-1/2 border border-neutral-700 p-8">
            <div className="mb-6">
              <Heading
                htmlEntity="h2"
                text="Billing"
                color="neutral-300"
                size="medium"
                truncate={null}
                withLinkProps={null}
              />
            </div>

            <Button
              type="primary"
              size="small"
              text="Update Payment Method"
              color="neutral-300"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={true}
              loading={updateAddressButtonLoading}
              disabled={false}
              skeleton={false}
              onClick={null}
              withLinkProps={{
                type: 'external',
                href: `https://billing.stripe.com/p/login/9AQaHtf4adFb99u288`,
                target: '_blank',
                routerLink: null,
                routerLinkProps: null,
              }}
            />
          </div>

          <div className="w-full md:w-1/2 border border-neutral-700 p-8">
            <div>
              <section className="w-full">
                <div className="mb-6">
                  <Heading
                    htmlEntity="h2"
                    text="Pause/Cancel Membership"
                    color="neutral-300"
                    size="medium"
                    truncate={null}
                    withLinkProps={null}
                  />
                </div>

                <div>
                  <p className="text-sm text-neutral-300">
                    If you'd like to pause or cancel your membership, please
                    email us at{' '}
                    <a
                      className="underline text-neutral-300"
                      href="mailto:info@rendahmag.com"
                    >
                      info@rendahmag.com
                    </a>
                    .
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
}
