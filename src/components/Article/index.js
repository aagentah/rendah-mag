/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacebookProvider, { Like } from 'react-facebook';

import Seo from './Seo';
import { convertDate } from '../../functions';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';

import Heading from './Sections/Heading';
import Paragraph from './Sections/Paragraph';
import Image from './Sections/Image';
import Question from './Sections/Question';
import Answer from './Sections/Answer';
import BulletList from './Sections/BulletList';
import NumberedList from './Sections/NumberedList';
import Soundcloud from './Sections/Soundcloud';
import Youtube from './Sections/Youtube';
import ArticleLink from './Sections/Link';


export class Article extends PureComponent {
  date = date => convertDate(date);

  sections = (item, i) => {
    if (item) {
      switch (item.section.type) {
        case 'heading':
          return (
            <div key={i} className="pv3">
              <Heading text={item.section.text} />
            </div>
          );
        case 'paragraph':
          return (
            <div key={i} className="pv3">
              <Paragraph text={item.section.text} />
            </div>
          );
        case 'image':
          return (
            <div key={i} className="pv3">
              <Image img={item.section.img} />
            </div>
          );
        case 'question':
          return (
            <div key={i} className="pt3">
              <Question text={item.section.text} />
            </div>
          );
        case 'answer':
          return (
            <div key={i} className="pv3">
              <Answer text={item.section.text} />
            </div>
          );
        case 'bulletList':
          return (
            <div key={i} className="pb3">
              <BulletList
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        case 'numberedList':
          return (
            <div key={i} className="pb3">
              <NumberedList
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        case 'soundcloud':
          return (
            <div key={i} className="pv3">
              <Soundcloud url={item.section.url} />
            </div>
          );
        case 'youtube':
          return (
            <div key={i} className="pv3">
              <Youtube videoId={item.section.url} />
            </div>
          );
        case 'link':
          return (
            <div key={i} className="pt3  pb1">
              <ArticleLink
                linkType={item.section.linkType}
                text={item.section.text}
                url={item.section.url}
              />
            </div>
          );
        default:
          return false;
      }
    }
    return false;
  }

  render() {
    const article = this.props.info;
    const sections = this.sections;
    const authorInfoMatch = { params: { id: article.author } };

    return (
      <div>
        <Seo data={article} />
        <div>
          <div className="article">

            <figure className="rel  article__hero">
              <div className="article__hero--background" style={{ backgroundImage: `url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img})` }} />
              <img className="article__hero--img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
            </figure>

            <section className="rel">
              <article className="container  article__content">
                <div className="row">
                  <div className="col-md-16  offset-md-4  ph4-sm">
                    <div className="article__fb-like  pb2">
                      <FacebookProvider appId="154881868603516">
                        <Like href={`https://www.rendahmag.com/Article/${article.url}`} width="320" colorScheme="dark" />
                      </FacebookProvider>
                    </div>
                    <span className="grey  t8">{this.date(article.created)} | </span>
                    <Link to={`/Author/${article.author.replace(/\s+/g, '-')}`} className="no-underline"><span className="grey  t8  cp  link">{article.author}</span></Link>
                    <h1 className="pb3  pt4  title-font">{article.title}</h1>
                    <p className="pv3  normal-font  grey">{article.description}</p>
                    {article.body.map((item, i) => (
                      sections(item, i)
                    ))}
                  </div>
                </div>
              </article>
            </section>

            <AuthorInfo match={authorInfoMatch} seo={false} />
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape(),
};

Article.defaultProps = {
  info: {},
};

export default Article;
