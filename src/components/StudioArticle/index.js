/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Heading, Copy, Label } from 'rendah-pattern-library';

import Sections from './Sections';

import { convertDate } from '../../functions';

import Seo from './Seo';

export class StudioArticle extends PureComponent {
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
    console.log('article', article);

    return (
      <React.Fragment>
        <Seo
          title={article.title}
          slug={article.slug}
          description={article.description}
          img={article.img}
          created={article.created}
        />

        <div className="studio-article  pb5">
          <section className="container-large-md  mla  mra  rel">
            <div className="flex  flex-wrap">
              <article
                ref={(articleElem) => {
                  this.articleElem = articleElem;
                }}
                className="col-24  mla  mra  col-12-lg  ph4-lg"
              >
                <div className="mla  mra  mt3-md  mb4">
                  <Image
                    /* Options */
                    src={article.img}
                    placeholder={`${article.img}?w=100`}
                    alt={article.title}
                    figcaption={null}
                    height={null}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="col-18  col-24-md  mla  mra">
                  <div className="pb1">
                    <Label
                      /* Options */
                      type={'date'}
                      text={this.date(article.created)}
                      color={'white'}
                      backgroundColor={'dark-grey'}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="pt2  pb3  mb2">
                    <Heading
                      /* Options */
                      htmlEntity={'h1'}
                      text={article.title}
                      color={'white'}
                      size={'large'}
                      truncate={null}
                      reveal={false}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="pb2">
                    <Copy
                      /* Options */
                      text={article.description}
                      color={'white'}
                      size={'medium'}
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <Sections body={article.body} />
                </div>
              </article>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

StudioArticle.propTypes = {
  info: PropTypes.shape({
    article: PropTypes.shape({}),
  }),
};

StudioArticle.defaultProps = {
  info: {
    article: {},
  },
};

export default StudioArticle;
