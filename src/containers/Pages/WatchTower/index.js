/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Iframe from 'react-iframe';
import { isChrome, isAndroid } from 'react-device-detect';

import Hero from '../../../components/Hero';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';

export class WatchTower extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  playlistEmbeds = () => {
    if (isAndroid && isChrome) {
      return <p className="pa4  t8  t-body  grey  tac"><a className="t8  link  rendah-red" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/a/rendahmag.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform">Soundcloud&#39;s Application API</a> currently does not work with Android (Chrome) To preview, please try another browser.</p>;
    }

    return (
      <div className="flex  flex-wrap  pt4">
        <div className="col-24  col-12-md  center  pb0  pb4-md">
          <div className="w-90  db  center  mb3">
            <Iframe
              url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/543806010&color=%23ff817b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              width="100%"
              height="420"
              display="initial"
              position="relative"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const title = 'Watch Tower';
    const desc = `The Rendah Team is invested in keeping you up-to-date
    with the latest Halftime Beats. We've compiled our favourite Tracks &
    Mixes into 2 Watch Tower playlists which will be updated regularly.`;

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
        </Helmet>

        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb3" />
        <div className="container-medium  center  pt4  pb4">
          <div className="flex  flex-wrap">
            <div className="col-24">
              <p className="t-body  dark-grey  f6  tac  mw6  db  center  pb2">
                {desc}
              </p>
            </div>
          </div>
          {this.playlistEmbeds()}
        </div>

        <p className="t-title  bold  tac  f6  ttu  pb3">More Articles</p>
        <ExtraArticles type="grid" limit={4} padding="pt3" />
      </main>
    );
  }
}

export default WatchTower;
