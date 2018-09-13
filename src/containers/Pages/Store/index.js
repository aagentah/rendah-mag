/* eslint-disable import/no-named-as-default, arrow-body-style */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import AnimatedImage from '../../../components/Elements/AnimatedImage';

export class Store extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Store';
    const products = [
      {
        name: 'Rendah Issue #1',
        price: '£7.99',
        img: 'http://via.placeholder.com/500x500',
        paypalValue: '65DCAX8RSCR6J',
      },
      {
        name: 'Robert Moog Poster',
        price: '£2.99',
        img: 'http://via.placeholder.com/500x500',
        paypalValue: '65DCAX8RSCR6J',
      },
      {
        name: 'Rendah Sticker Pack',
        price: '£2.99',
        img: 'http://via.placeholder.com/500x500',
        paypalValue: '65DCAX8RSCR6J',
      },
    ];

    return (
      <main className="page-fade-in">
        <Helmet title={title} />
        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />

        <div className="container-medium  center">

          <div className="flex  flex-wrap  pb4">
            <div className="col-24  tac">
              <p className="t-title  black  f4  over-hidden  pv1">Save 20%!</p>
              <p className="t-title  black  f4  over-hidden  pv1">Subscribe to our Seasonly Magazine Issue for just £6.49 every 3 months.</p>
              <p className="t-body  black  f5  over-hidden  pv1">Each issue may include stickers, posters & more!</p>
              <p className="t-body  grey  f6  over-hidden  pv1  mb3">We ship worldwide and you can cancel at any time.</p>

              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="UG3JVJV7JKHS4" />
                <input className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  db  center" type="submit" value="Subscribe!" />
              </form>
            </div>
          </div>

          <div className="flex  flex-wrap">
            {products.map((product) => {
              return (
                <div className="col-24  col-12-sm  col-6-md  pa3">
                  <article>
                    <figure>
                      <div className="shadow2">
                        <AnimatedImage
                          lazy
                          src={product.img}
                          alt=""
                          styles="fade-in-zoom-in  h7  h7-sm  w-100"
                        />
                      </div>
                    </figure>

                    <div className="flex  flex-wrap  pb2">
                      <div className="col-18">
                        <p className="t-title  black  f5  over-hidden  pv2  mt2">{product.name}</p>
                      </div>
                      <div className="col-6">
                        <p className="t-title  black  f5  tar  over-hidden  pv2  mt2">{product.price}</p>
                      </div>
                    </div>

                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                      <input type="hidden" name="cmd" value="_s-xclick" />
                      <input type="hidden" name="hosted_button_id" value={product.paypalValue} />
                      <input className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover" type="submit" value="Buy" />
                    </form>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }
}

export default Store;
