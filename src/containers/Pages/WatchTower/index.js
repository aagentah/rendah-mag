/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Iframe from 'react-iframe';
import { isChrome, isAndroid } from 'react-device-detect';

export class WatchTower extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    if (isAndroid && isChrome) {
      return <p className="t8  normal-font  grey"><a className="t8  link  rendah-red" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/a/rendahmag.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform">Soundcloud&#39;s Application API</a> currently does not work with Android (Chrome) To preview, please try another browser.</p>;
    }
    return (
      <main className="page-fade-in">
        <Helmet title="Watch Tower" />
        <div className="container  ph4-sm">
          <div className="row">
            <div className="col-sm-16  offset-sm-4">
              <h1 className="tac  grey  t7  ttu  mt3  pt4  pt4-sm  pv4  pb3-sm">Watch Tower</h1>
              <p className="tac  pb1  mw4  db  center">
                The&nbsp;
                <Link className="link" to={'/Authors'}>
                  <span className="rendah-red" >Rendah Team</span>
                </Link>
                &nbsp;is invested in keeping you up-to-date with
                the latest Halftime Beats. We compiled our favourite Tracks & Mixes into
                2 Watch Tower playlists, Updated monthly.
              </p>

              <h2 className="tac  grey  t7  ttu  pt2  pv4  pb3-sm">Tracks</h2>
              <div className="w-80  db  center  mb3">
                <Iframe
                  url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500154426&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
                  width="100%"
                  height="400"
                  display="initial"
                  position="relative"
                />
              </div>

              <h2 className="tac  grey  t7  ttu  pt2  pv4  pb3-sm">Mixes</h2>
              <div className="w-80  db  center  mb3">
                <Iframe
                  url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500154426&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
                  width="100%"
                  height="400"
                  display="initial"
                  position="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default WatchTower;
