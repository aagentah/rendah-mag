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

  playlistEmbeds = () => {
    if (isAndroid && isChrome) {
      return <p className="pa4  t8  normal-font  grey  tac"><a className="t8  link  rendah-red" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/a/rendahmag.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform">Soundcloud&#39;s Application API</a> currently does not work with Android (Chrome) To preview, please try another browser.</p>;
    }

    return (
      <div className="row  pt5  pb4">
        <div className="col-md-12  pb0  pb4-md">
          <h2 className="dn">Tracks</h2>
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
          <h2 className="dn">Mixes</h2>
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
    );
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Watch Tower" />
        <div className="container  ph4-sm">
          <div className="row">
            <div className="col-sm-18  offset-sm-3">
              <h1 className="tac  mid-grey  t6  ttu  khula-bold  mt3  pt4  pt4-sm  pv4  pb3-sm">Watch Tower</h1>
              <p className="tac  pb1  mw4  db  center">
                The&nbsp;
                <Link className="link" to={'/Authors'}>
                  <span className="rendah-red">Rendah Team</span>
                </Link>
                &nbsp;is invested in keeping you up-to-date with
                the latest Halftime Beats. We&apos;ve compiled our favourite Tracks & Mixes into
                2 &apos;Watch Tower&apos; playlists which will be updated regularly.
              </p>
            </div>
          </div>
          {this.playlistEmbeds()}
        </div>

        <p className="t7  tac  grey  pb3-sm  pb4">MORE ARTICLES</p>
        <div className="pb2">
          <ExtraArticles />
        </div>
      </main>
    );
  }
}

export default WatchTower;
