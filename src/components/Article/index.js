/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key, react/self-closing-comp,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacebookProvider, { Like } from 'react-facebook';

import Seo from './Seo';
import { convertDate } from '../../functions';

import Heading from './Sections/Heading';
import Paragraph from './Sections/Paragraph';
import Image from './Sections/Image';
import Question from './Sections/Question';
import Answer from './Sections/Answer';
import BulletList from './Sections/BulletList';
import NumberedList from './Sections/NumberedList';
// import Soundcloud from './Sections/Soundcloud';
import Youtube from './Sections/Youtube';
import ArticleLink from './Sections/Link';
import AuthorInfo from '../../containers/Fragments/AuthorInfo';

export class Article extends PureComponent {
  date = date => convertDate(date);

  heading = () => {
    const title = this.props.info.title;

    if (title) {
      return (
        <h1 className="pb3  pt4  title-font">{title}</h1>
      );
    }
    console.log('Not Returned: Article.heading');
    return false;
  };

  sections = (item, i) => {
    if (item) {
      switch (item.section.type) {
        case 'heading':
          return (
            <div className="pv3">
              <Heading
                key={i}
                text={item.section.text}
              />
            </div>
          );
        case 'paragraph':
          return (
            <div className="pv3">
              <Paragraph
                key={i}
                text={item.section.text}
              />
            </div>
          );
        case 'image':
          return (
            <div className="pv3">
              <Image
                key={i}
                img={item.section.img}
              />
            </div>
          );
        case 'question':
          return (
            <div className="pt3">
              <Question
                key={i}
                text={item.section.text}
              />
            </div>
          );
        case 'answer':
          return (
            <div className="pv3">
              <Answer
                key={i}
                text={item.section.text}
              />
            </div>
          );
        case 'bulletList':
          return (
            <div className="pb3">
              <BulletList
                key={i}
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        case 'numberedList':
          return (
            <div className="pb3">
              <NumberedList
                key={i}
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        // case 'soundcloud':
        //   return (
        //     <div className="pv3">
        //       <Soundcloud
        //         key={i}
        //         text={item.section.text}
        //         id={item.section.id}
        //       />
        //     </div>
        //   );
        case 'youtube':
          return (
            <div className="pv3">
              <Youtube
                key={i}
                videoId="XxVg_s8xAms"
              />
            </div>
          );
        case 'link':
          return (
            <div className="pv3">
              <ArticleLink
                key={i}
                linkType={item.section.linkType}
                text={item.section.text}
                url={item.section.url}
              />
            </div>
          );
        default:
          console.log('Not Returned: Article.section.switch');
          return false;
      }
    }
    console.log('Not Returned: Article.sections');
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
              <div className="article__hero--background" style={{ backgroundImage: `url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img})` }}></div>
              <img className="article__hero--img" alt={article.title} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`} />
            </figure>

            <section className="rel">
              <article className="container  article__content">
                <div className="row">
                  <div className="col-md-16  col-md-offset-4  ph4-sm">
                    <div className="article__fb-like  pb2">
                      <FacebookProvider appId="154881868603516">
                        <Like href={`https://www.rendahmag.com/Article/${article.url}`} width="320" colorScheme="dark" />
                      </FacebookProvider>
                    </div>
                    <span className="grey  t8">{this.date(article.created)} | </span>
                    <Link to={`/Author/${article.author.replace(/\s+/g, '-')}`} className="no-underline"><span className="grey  t8  cp  link">{article.author}</span></Link>
                    {this.heading()}
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
