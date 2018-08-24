/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
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
        <div className="col-24  col-md-12  offset-md-6  pb0  pb4-md">
          <div className="w-90  db  center  mb3">
            <Iframe
              url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/484994280&color=%23ff817b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
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
              <h1 className="tac  dark-grey  t6  ttu  khula-bold  mt3  pt4  pt4-sm  pv4  pb3-sm">Mixes</h1>
              <p className="tac  pb1  mw4  db  center">
                Check out our &apos;Modules&apos; series featuring
                guest-mixes from upcomers within the scene.
              </p>
            </div>
          </div>
          {this.playlistEmbeds()}
        </div>

        <p className="tac  dark-grey  t6  ttu  khula-bold  mt3  pt4  pt4-sm  pv4  pb3-sm">MORE ARTICLES</p>
        <div className="pb2">
          <ExtraArticles />
        </div>
      </main>
    );
  }
}

export default WatchTower;
