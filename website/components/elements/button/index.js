import React from 'react';
import WithLink from '../../utils/with-link';

/**
 * A Button indicates a possible user action.
 */

export default function Button(props) {
  const {
    /* Options */
    type,
    size,
    text,
    color,
    fluid,
    icon,
    iconFloat,
    inverted,
    loading,
    disabled,
    onClick,
    skeleton,
    /* Children */
    withLinkProps
  } = props;

  const isFluid = fluid && 'fluid';
  const isInverted = inverted && 'inverted';
  const isLoading = loading && 'loading';
  const isDisabled = disabled && 'disabled';

  const skeletonClass = skeleton ? 'skeleton  skeleton-active' : 'skeleton';

  const contents = () => {
    if (loading) {
      return (
        <div className="button__spinner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13 0c3.667.305 6.863 2.26 8.851 5.129l-1.746 1.013c-1.634-2.273-4.182-3.84-7.105-4.133v-2.009zm-11 12c0-1.47.324-2.863.891-4.122l-1.737-1.007c-.733 1.558-1.154 3.292-1.154 5.129 0 1.837.421 3.571 1.153 5.129l1.738-1.008c-.567-1.259-.891-2.651-.891-4.121zm20 0c0 1.47-.324 2.863-.891 4.122l1.738 1.007c.732-1.558 1.153-3.292 1.153-5.129s-.421-3.571-1.153-5.129l-1.738 1.007c.567 1.259.891 2.652.891 4.122zm-1.895 5.858c-1.634 2.273-4.182 3.84-7.105 4.133v2.009c3.667-.305 6.863-2.26 8.851-5.129l-1.746-1.013zm-16.21-11.717c1.634-2.272 4.183-3.839 7.105-4.132v-2.009c-3.667.305-6.862 2.259-8.851 5.128l1.746 1.013zm7.105 15.85c-2.923-.293-5.471-1.86-7.105-4.133l-1.746 1.013c1.988 2.87 5.184 4.824 8.851 5.129v-2.009z" />
          </svg>
        </div>
      );
    }

    if (icon) {
      if (iconFloat === 'left') {
        return (
          <div className="button__icon__wrapper">
            <div className="button__icon  button__icon--left">{icon}</div>
            <span>
              {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
            </span>
          </div>
        );
      }
      return (
        <div className="button__icon__wrapper">
          <span>
            {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
          </span>
          <div className="button__icon  button__icon--right">{icon}</div>
        </div>
      );
    }

    return (
      <span>
        {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
      </span>
    );
  };

  return (
    <WithLink
      {...(loading && { 'aria-label': 'Loading' })}
      {...(disabled && { disabled, 'aria-label': 'Disabled' })}
      {...(onClick && { onClick })}
      {...(withLinkProps && { withLinkProps })}
      className={`button button--${color} ${type} ${isFluid} ${isInverted} ${isLoading} ${isDisabled} ${size} ${skeletonClass}`}
    >
      {contents()}
    </WithLink>
  );
}
