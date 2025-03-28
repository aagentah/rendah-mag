import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import Button from '~/components/elements/button';
import Container from '../container';
import { useUser } from '~/lib/hooks';

const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));

const IconInstagram = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconInstagram)
);

const IconFacebook = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconFacebook)
);

const IconTwitter = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconTwitter)
);

const IconSoundcloud = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSoundcloud)
);

const IconDiscord = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconDiscord)
);

export default function Footer() {
  const [user] = useUser();

  return (
    <LazyLoad once offset={300} height={300}>
      <footer className="bg-neutral-900 container py-12 mt-12">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            {!user && (
              <>
                <div className="pb-2 mb-2">
                  <h3 className="text-neutral-300 text-lg font-bold">
                    Join our Newsletter?
                  </h3>
                </div>
                <div className="pb-6">
                  <p className="text-neutral-400 text-base">
                    We usually only send a few emails each month, and keep the
                    content relevant as ever.
                  </p>
                </div>
                <div className="pb-5 text-left">
                  <SubscribeForm type="footer" />
                </div>
              </>
            )}

            <ul>
              <li className="block pb-3 text-left">
                <Button
                  type="secondary"
                  size="small"
                  text="Privacy Policy"
                  color="neutral-400"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  withLinkProps={{
                    type: 'next',
                    href: '/privacy-policy',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: { scroll: false },
                  }}
                />
              </li>
              <li className="block pb-3 text-left">
                <Button
                  type="secondary"
                  size="small"
                  text="Cookie Policy"
                  color="neutral-400"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  withLinkProps={{
                    type: 'next',
                    href: '/cookie-policy',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: { scroll: false },
                  }}
                />
              </li>
              {/*
                <li className="block pb-3 text-left">
                  <Button
                    type="secondary"
                    size="small"
                    text="Return Policy"
                    color="neutral-300"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    withLinkProps={{
                      type: 'next',
                      href: '/return-policy',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: { scroll: false },
                    }}
                  />
                </li>
                */}
              <li className="block pb-3 text-left">
                <Button
                  type="secondary"
                  size="small"
                  text="Terms & Conditions"
                  color="neutral-400"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  withLinkProps={{
                    type: 'next',
                    href: '/terms-conditions',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: { scroll: false },
                  }}
                />
              </li>
              <li className="block pb-3 text-left">
                <Button
                  type="secondary"
                  size="small"
                  text="Contact"
                  color="neutral-400"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  withLinkProps={{
                    type: 'external',
                    href: 'https://forms.gle/xpPtVhUiuzZzehdy8',
                    target: '_blank',
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />
              </li>
              <li className="block pb-3 text-left">
                <Button
                  type="secondary"
                  size="small"
                  text="Join our mailout"
                  color="neutral-400"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  withLinkProps={{
                    type: 'next',
                    href: '/mailout',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: { scroll: false },
                  }}
                />
              </li>
              <li className="block pb-3 text-left pt-4">
                <h3 className="text-neutral-500 text-lg font-bold">
                  {`Rendah Mag ${new Date().getFullYear()}`}
                </h3>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-4/12 flex flex-wrap justify-start md:justify-end md:items-end pb-3">
            <div className="w-1/4 flex justify-start md:justify-end pt-4 md:pt-0">
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/rendahmag/"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
              >
                <IconInstagram color="neutral-300" size={30} />
              </a>
            </div>
            <div className="w-1/4 flex justify-start md:justify-end pt-4 md:pt-0">
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/rendahmag/"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
              >
                <IconFacebook color="neutral-300" size={30} />
              </a>
            </div>
            <div className="w-1/4 flex justify-start md:justify-end pt-4 md:pt-0">
              <a
                aria-label="Twitter"
                href="https://twitter.com/RendahMag"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
              >
                <IconTwitter color="neutral-300" size={30} />
              </a>
            </div>
            <div className="w-1/4 flex justify-start md:justify-end pt-4 md:pt-0">
              <a
                aria-label="Soundcloud"
                href="https://soundcloud.com/rendahmag"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
              >
                <IconSoundcloud color="neutral-300" size={30} />
              </a>
            </div>
            {/* <div className="w-1/3 md:w-[12.5%] flex justify-start md:justify-end pt-4 md:pt-0">
              <a
                aria-label="Discord"
                href="https://discord.com/invite/ev2Q22C"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
              >
                <IconDiscord color="neutral-300" size={30} />
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </LazyLoad>
  );
}
