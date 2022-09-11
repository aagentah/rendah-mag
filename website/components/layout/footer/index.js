import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Icon from '~/components/elements/icon';
import Container from '../container';

export default function Footer() {
  return (
    <LazyLoad once offset={300} height={300}>
      {
        // <SubscribeForm />
      }
      <footer className="footer  pv5">
        <Container>
          <div className="flex  flex-wrap">
            <div className="col-24  col-14-md">
              <div className="pb3  tac  tal-md">
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text={`Rendah Mag ${new Date().getFullYear()}`}
                  color="white"
                  size="large"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

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
                        scroll: false
                      }
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
                        scroll: false
                      }
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
                        scroll: false
                      }
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
                      routerLinkProps: null
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
                        scroll: false
                      }
                    }}
                  />
                </li>
              </ul>
            </div>
            <div className="col-24  col-10-md  flex  justify-end-md  align-end-md  pb3">
              <div className="flex  flex-wrap  col-24">
                <div className="col-8  col-3-md  flex  justify-end  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Instagram"
                    href="https://www.instagram.com/rendahmag/"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'instagram']} size="2x" />
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
                    <Icon icon={['fab', 'facebook']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-3-md  flex  justify-start  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Twitter"
                    href="https://twitter.com/RendahMag"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'twitter']} size="2x" />
                  </a>
                </div>

                <div className="col-8  col-3-md  flex  justify-end  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Soundcloud"
                    href="https://soundcloud.com/rendahmag"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'soundcloud']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-3-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Youtube"
                    href="https://www.youtube.com/channel/UC4dYeD1ceX8sSY3J3UuMn8w"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'youtube']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-3-md  flex  justify-start  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Discord"
                    href="https://discord.com/invite/ev2Q22C"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'discord']} size="2x" />
                  </a>
                </div>
                <div className="col-24  col-3-md  dn  df-md  justify-center  justify-end-md  pt4  pt0-md">
                  <a
                    aria-label="Spotify"
                    href="https://open.spotify.com/user/z7wa87uoc308b4dmp8qpoukdf?si=28825cb6910f4e39"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'spotify']} size="2x" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </LazyLoad>
  );
}
