/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
// import { assemblePageUrl, websiteUrl, toPlainText } from "./frontendUtils";
import styles from "./userAddress.css";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source) => {
  return builder.image(source);
};

const author = {
  name: "Sanity.io",
  handle: "sanity_io",
  image:
    "https://pbs.twimg.com/profile_images/1135907399582199809/7uZ5d2to_400x400.jpg",
};

class TwitterCard extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object,
    width: PropTypes.number,
    route: PropTypes.object,
  };

  static defaultProps = {
    document: null,
    width: 500,
  };

  render() {
    const { document } = this.props;
    const { name, address } = document?.published;
    // const url = assemblePageUrl({ document, options });
    // const websiteUrlWithoutProtocol = url.split("://")[1];

    return (
      <section className={styles.section}>
        <h1 className={styles.h1}>Address</h1>
        <p>{name}</p>
        <p>{address?.line1}</p>
        <p>{address?.line2}</p>
        <p>{address?.city}</p>
        <p>{address?.state}</p>
        <p>{address?.postal_code}</p>
        <p>{address?.country}</p>
      </section>
    );
    // return (
    //   <div className={styles.seoItem}>
    //     <h3>Twitter card preview</h3>
    //     <div className={styles.tweetWrapper} style={{ width }}>
    //       {author && (
    //         <div className={styles.tweetAuthor}>
    //           <img
    //             className={styles.tweetAuthorAvatar}
    //             src={
    //               author && typeof author.image === "object"
    //                 ? urlFor(author.image).width(300).url()
    //                 : author.image
    //             }
    //           />
    //           <span className={styles.tweetAuthorName}>{author.name}</span>
    //           <span className={styles.tweetAuthorHandle}>@{author.handle}</span>
    //         </div>
    //       )}
    //
    //       <div className={styles.tweetText}>
    //         <p>
    //           The card for your website will look a little something like this!
    //         </p>
    //       </div>
    //       <a href={url} className={styles.tweetUrlWrapper}>
    //         <div className={styles.tweetCardPreview}>
    //           <div className={styles.tweetCardImage}>
    //             <img src={urlFor(mainImage).width(300).url()} />
    //           </div>
    //           <div className={styles.tweetCardContent}>
    //             <h2 className={styles.tweetCardTitle}>{title}</h2>
    //             {excerpt && (
    //               <div className={styles.tweetCardDescription}>
    //                 {toPlainText(excerpt)}
    //               </div>
    //             )}
    //             <div className={styles.tweetCardDestination}>
    //               {websiteUrlWithoutProtocol}
    //             </div>
    //           </div>
    //         </div>
    //       </a>
    //     </div>
    //   </div>
    // );
  }
}

export default TwitterCard;
