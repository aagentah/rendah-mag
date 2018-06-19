/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import { isChrome, isAndroid } from 'react-device-detect';

import ExtraArticles from '../../../containers/Fragments/ExtraArticles';

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
            <div className="col-sm-18  offset-sm-3">
              <h1 className="tac  grey  t7  ttu  mt3  pt4  pt4-sm  pv4  pb3-sm">Watch Tower</h1>
              <p className="tac  pb1  mw4  db  center">
                The&nbsp;
                <Link className="link" to={'/Authors'}>
                  <span className="rendah-red" >Rendah Team</span>
                </Link>
                &nbsp;is invested in keeping you up-to-date with
                the latest Halftime Beats. We&apos;ve compiled our favourite Tracks & Mixes into
                2 &apos;Watch Tower&apos; playlists to be regularly updated.
              </p>
            </div>
          </div>

          <div className="row  pv5">
            <div className="col-md-12  pb0  pb4-md">
              <h2 className="tac  grey  t7  ttu  pt2  pv4  pb3-md  dn">Tracks</h2>
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
            <div className="col-md-12">
              <h2 className="tac  grey  t7  ttu  pt2  pv4  pb3-md  dn">Mixes</h2>
              <div className="w-90  db  center  mb3">
                <Iframe
                  url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/543805866&color=%23ff817b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                  width="100%"
                  height="420"
                  display="initial"
                  position="relative"
                />
              </div>
            </div>
          </div>
        </div>
        <ExtraArticles />
      </main>
    );
  }
}

export default WatchTower;
