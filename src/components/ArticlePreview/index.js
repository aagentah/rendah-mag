/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';

import Sections from './Sections';
import SocialLinks from './SocialLinks';

import { convertDate } from '../../functions';
import TeamMember from '../TeamMember';

import Seo from './Seo';

export class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sideBarSize: 0,
    };
  }

  componentDidMount() {
    const articleHeight = this.articleElem.clientHeight;
    let sideBarSize = 0;

    if (articleHeight < 1000) {
      sideBarSize = 1;
    }
    if (articleHeight >= 1000) {
      sideBarSize = 2;
    }

    this.setState({ sideBarSize });
  }

  date = date => convertDate(date);

  render() {
    const article = this.props.info;
    const { teamMember } = article;

    return (
      <React.Fragment>
        <Seo
          title={article.title}
          slug={article.slug}
          description={article.description}
          img={article.img}
          created={article.created}
          teamMember={teamMember.name}
        />

        <div className="w-100">
          <div className="FeaturedArticle  FeaturedArticle--preview" key={article.title}>
            <Link to={`/article/${article.slug}`} title={article.title}>
              <div className="content">
                <div className="glitch">
                  <ProgressiveImage src={article.img} placeholder={`${article.img}?w=100`}>
                    {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                  </ProgressiveImage>
                  <ProgressiveImage src={article.img} placeholder={`${article.img}?w=100`}>
                    {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                  </ProgressiveImage>
                  <ProgressiveImage src={article.img} placeholder={`${article.img}?w=100`}>
                    {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                  </ProgressiveImage>
                  <ProgressiveImage src={article.img} placeholder={`${article.img}?w=100`}>
                    {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                  </ProgressiveImage>
                  <ProgressiveImage src={article.img} placeholder={`${article.img}?w=100`}>
                    {(src, loading) => <img className={`card__ima  ${loading ? 'img-loading' : ''}`} src={src} alt="an" />}
                  </ProgressiveImage>
                </div>
                <h2 className="t-special  white  FeaturedArticle__title">{article.title}</h2>
                <p className="t-title  white  dn  db-md  FeaturedArticle__description">{article.description}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="article  dn">
          <figure className="rel  article__hero">
            <div className="article__hero--background" style={{ backgroundImage: `url(${article.img})` }} />
            <img className="article__hero--img" alt={article.title} src={article.img} />
          </figure>

          <section className="container-large  center  ph0  mt5  rel">
            <div className="flex  flex-wrap">
              <div className="col-24  col-3-lg" />
              <article ref={(articleElem) => { this.articleElem = articleElem; }} className="col-18  center  col-15-lg  pr5-lg">
                <div className="article__social  pb4">
                  <a className="ph1" href={`https://www.facebook.com/sharer.php?u=https://www.rendahmag.com/article/${article.slug}`} rel="noopener noreferrer" target="_blank">
                    <img src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
                  </a>
                  <a className="ph1" href={`https://twitter.com/share?url=https://www.rendahmag.com/article/${article.slug}`} rel="noopener noreferrer" target="_blank">
                    <img src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
                  </a>
                </div>

                <span className="grey  t8">{this.date(article.created)} | </span>
                <Link title={teamMember.slug} to={`/team/${teamMember.slug}`} className="no-underline"><span className="grey  t8  cp  link">{teamMember.name}</span></Link>
                <h1 className="pb3  pt4  t-title">{article.title}</h1>
                <p className="pv3  t-body  f5  dark-grey">{article.description}</p>
                <Sections body={article.body} />
                <SocialLinks article={article} />
                <TeamMember article padding="pt4  pt5-sm" info={teamMember} />
              </article>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape({
    article: PropTypes.shape({}),
    teamMember: PropTypes.shape({}),
  }),
};

Article.defaultProps = {
  info: {
    article: {},
    teamMember: {},
  },
};

export default Article;
