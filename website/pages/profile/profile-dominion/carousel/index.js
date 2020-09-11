import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import BlockContent from '@sanity/block-content-to-react';
import { useKeenSlider } from 'keen-slider/react';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
  Label,
} from 'next-pattern-library';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { imageBuilder, getDominionItemsSinceDate } from '~/lib/sanity/requests';

function ArrowLeft(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--left' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--right' + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}

export default function Carousel({ dominionItems, refreshDominion }) {
  const [user, { loading, mutate, error }] = useUser();
  const [modalActive, setModalActive] = useState(null);

  const sliderOptions = {
    slidesPerView: 2,
    mode: 'snap',
    spacing: 0,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider(sliderOptions);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  if (refreshDominion && dominionItems?.length) {
    return (
      <>
        <div>
          {dominionItems.map((item, i) => (
            <Modal
              /* Options */
              size="large"
              active={modalActive === i}
            >
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text={item.title}
                  color="black"
                  size={item.image ? 'large' : 'medium'}
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <div className="flex  flex-wrap">
                <div className={`col-24  ${item.image && 'col-12-md'}  pr4-md`}>
                  <div className="pb2">
                    <div className="post__body">
                      <BlockContent blocks={item.mainDescription} />
                    </div>
                  </div>
                </div>
                <div className="col-24  col-12-md">
                  {item.image && (
                    <div className="pb4  pb0-md">
                      <Image
                        /* Options */
                        src={imageBuilder
                          .image(item.image)
                          .height(500)
                          .width(500)
                          .url()}
                        placeholder={imageBuilder
                          .image(item.image)
                          .height(50)
                          .width(50)
                          .url()}
                        alt=""
                        figcaption={null}
                        height={300}
                        width={null}
                        customClass="shadow2"
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex  flex-wrap  pb2">
                <div className="col-24 flex  justify-center  justify-start-md  align-center">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Close"
                    color="black"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={false}
                    loading={false}
                    disabled={false}
                    onClick={() => setModalActive(null)}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
            </Modal>
          ))}
        </div>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {dominionItems.map((item, i) => (
              <article className="keen-slider__slide  pa3" key={item._id}>
                <div className="relative">
                  <div className="br3  pa4  mb4  shadow2">
                    {i === 0 && (
                      <div className="absolute  top  right  mr3  nt2">
                        <Label
                          /* Options */
                          customClass="ph2"
                          text="New"
                          color="white"
                          backgroundColor="blue"
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    )}
                    <p className="t-secondary  f7  grey  pb2  mb2">
                      {new Date(item.activeFrom).toDateString()}
                    </p>

                    <p className="t-primary  f4  black  pb3">{item.title}</p>

                    {
                      // <div className="post__body  pr2  pb2">
                      //   <BlockContent blocks={item.briefDescription} />
                      // </div>
                    }

                    <div className="flex  flex-wrap  pb3">
                      {item?.tags &&
                        item.tags.map((tag) => (
                          <div key={tag} className="mr2  mb3">
                            <Label
                              /* Options */
                              customClass="ph2"
                              text={tag}
                              color="white"
                              backgroundColor="black"
                              onClick={null}
                              /* Children */
                              withLinkProps={null}
                            />
                          </div>
                        ))}
                    </div>

                    <div className="pb2">
                      <Button
                        /* Options */
                        type="secondary"
                        size="small"
                        text="More details"
                        color="black"
                        fluid={false}
                        icon={buttonIcon}
                        iconFloat={null}
                        inverted={false}
                        loading={false}
                        disabled={false}
                        onClick={() => setModalActive(i)}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {slider && (
            <>
              <ArrowLeft
                onClick={(e) => e.stopPropagation() || slider.prev()}
                disabled={currentSlide === 0}
              />

              <ArrowRight
                onClick={(e) => e.stopPropagation() || slider.next()}
                disabled={currentSlide === slider.details().size - 1}
              />
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="N/A"
      color="black"
      size="medium"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
