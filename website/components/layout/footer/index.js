import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
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
      <footer className="footer  pv5">
        <Container>
          <div className="flex  flex-wrap">
            <div className="col-24  col-14-md">
              {!user && (
                <>
                  <div className="pb2  mb2">
                    <Heading
                      /* Options */
                      htmlEntity="h3"
                      text="Join our Newsletter?"
                      color="white"
                      size="small"
                      truncate={0}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                  <div className="pb2">
                    <Copy
                      /* Options */
                      text="We usually only send a few emails each month, and keep the content relevant as ever."
                      color="white"
                      size="medium"
                      truncate={null}
                    />
                  </div>

                  <div className="pb5  tac  tal-md">
                    <SubscribeForm type="footer" />
                  </div>
                </>
              )}

              <ul className="pb3  pb0-md">
                <li className="db  pb3  tac  tal-md">
                  <Button
                    /* Options */
                    type="secondary"
                    size="small"
                    text="Privacy Policy"
                    color="white"
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
                      href: '/privacy-policy',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        scroll: false,
                      },
                    }}
                  />
                </li>
                <li className="db  pb3  tac  tal-md">
                  <Button
                    /* Options */
                    type="secondary"
                    size="small"
                    text="Cookie Policy"
                    color="white"
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
                      href: '/cookie-policy',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        scroll: false,
                      },
                    }}
                  />
                </li>
                {
                  // <li className="db  pb3  tac  tal-md">
                  //   <Button
                  //     /* Options */
                  //     type="secondary"
                  //     size="small"
                  //     text="Return Policy"
                  //     color="white"
                  //     fluid={false}
                  //     icon={null}
                  //     iconFloat={null}
                  //     inverted
                  //     loading={false}
                  //     disabled={false}
                  //     skeleton={false}
                  //     onClick={null}
                  //     /* Children */
                  //     withLinkProps={{
                  //       type: 'next',
                  //       href: '/return-policy',
                  //       target: null,
                  //       routerLink: Link,
                  //       routerLinkProps: {
                  //         scroll: false,
                  //       },
                  //     }}
                  //   />
                  // </li>
                }
                <li className="db  pb3  tac  tal-md">
                  <Button
                    /* Options */
                    type="secondary"
                    size="small"
                    text="Terms & Conditions"
                    color="white"
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
                      href: '/terms-conditions',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        scroll: false,
                      },
                    }}
                  />
                </li>
                <li className="db  pb3  tac  tal-md">
                  <Button
                    /* Options */
                    type="secondary"
                    size="small"
                    text="Contact"
                    color="white"
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
                      type: 'external',
                      href: 'https://forms.gle/xpPtVhUiuzZzehdy8',
                      target: '_blank',
                      routerLink: null,
                      routerLinkProps: null,
                    }}
                  />
                </li>
                <li className="db  pb3  tac  tal-md">
                  <Button
                    /* Options */
                    type="secondary"
                    size="small"
                    text="Join our mailout"
                    color="white"
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
                      href: '/mailout',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        scroll: false,
                      },
                    }}
                  />
                </li>

                <li className="db  pb3  tac  tal-md">
                  <Heading
                    /* Options */
                    htmlEntity="h3"
                    text={`Rendah Mag ${new Date().getFullYear()}`}
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </li>
              </ul>
            </div>
            <div className="col-24  col-10-md  flex  flex-wrap  justify-center  justify-end-md  align-end-md  pb3">
              <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/rendahmag/"
                  target="_blank"
                  rel="noreferrer"
                  className="white"
                >
                  <IconInstagram color="white" size={30} />
                </a>
              </div>
              <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                <a
                  aria-label="Facebook"
                  href="https://www.facebook.com/rendahmag/"
                  target="_blank"
                  rel="noreferrer"
                  className="white"
                >
                  <IconFacebook color="white" size={30} />
                </a>
              </div>
              <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                <a
                  aria-label="Twitter"
                  href="https://twitter.com/RendahMag"
                  target="_blank"
                  rel="noreferrer"
                  className="white"
                >
                  <IconTwitter color="white" size={30} />
                </a>
              </div>

              <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                <a
                  aria-label="Soundcloud"
                  href="https://soundcloud.com/rendahmag"
                  target="_blank"
                  rel="noreferrer"
                  className="white"
                >
                  <IconSoundcloud color="white" size={30} />
                </a>
              </div>

              <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                <a
                  aria-label="Discord"
                  href="https://discord.com/invite/ev2Q22C"
                  target="_blank"
                  rel="noreferrer"
                  className="white"
                >
                  <IconDiscord color="white" size={30} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </LazyLoad>
  );
}
