import Link from 'next/link';

import { Heading, Button, Icon } from 'next-pattern-library';

import Container from '../container';
import SubscribeForm from '~/components/subscribe-form';

export default function Footer() {
  return (
    <>
      {
        // <SubscribeForm />
      }
      <footer className="footer  pv5">
        <Container>
          <div className="flex  flex-wrap">
            <div className="col-24  col-16-md">
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
              </ul>
            </div>
            <div className="col-24  col-8-md  flex  justify-end-md  align-end-md  pb3">
              <div className="flex  flex-wrap  col-24">
                <div className="col-8  col-4-md  flex  justify-end  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://www.instagram.com/rendahmag/"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'instagram']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-4-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://www.facebook.com/rendahmag/"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'facebook']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-4-md  flex  justify-start  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://twitter.com/RendahMag"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'twitter']} size="2x" />
                  </a>
                </div>

                <div className="col-8  col-4-md  flex  justify-end  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://soundcloud.com/rendahmag"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'soundcloud']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-4-md  flex  justify-center  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://www.youtube.com/channel/UC4dYeD1ceX8sSY3J3UuMn8w"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'youtube']} size="2x" />
                  </a>
                </div>
                <div className="col-8  col-4-md  flex  justify-start  justify-end-md  pt4  pt0-md">
                  <a
                    href="https://discord.com/invite/ev2Q22C"
                    target="_blank"
                    rel="noreferrer"
                    className="white"
                  >
                    <Icon icon={['fab', 'discord']} size="2x" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
