// import React from 'react';
// import WithLink from '../../utils/with-link';
// import classnames from 'classnames';

// export default function Button(props) {
//   const {
//     type, // "primary" or "secondary"
//     size, // "x-small", "small", "medium", "large", "x-large"
//     text,
//     color, // e.g. "neutral-500", "rendah-red", etc.
//     fluid,
//     icon,
//     iconFloat,
//     inverted,
//     loading,
//     disabled,
//     onClick,
//     skeleton,
//     withLinkProps,
//   } = props;

//   const baseClasses =
//     'transition-all duration-300 ease-in-out inline-flex justify-center items-center bg-transparent shadow-none outline-none border-0 cursor-pointer relative no-underline min-w-[50px] font-secondary z-[4]';

//   const sizeClasses =
//     {
//       'x-small': 'text-xs',
//       small: 'text-sm',
//       medium: 'text-base',
//       large: 'text-lg',
//       'x-large': 'text-xl',
//     }[size] || '';

//   const fluidClass = fluid ? 'w-full' : '';

//   const disabledClasses = disabled ? 'opacity-30 cursor-not-allowed' : '';
//   const loadingClasses = loading ? 'cursor-default' : '';

//   const primaryColorClasses =
//     type === 'primary'
//       ? color
//         ? `border-2 border-${color} text-${color} fill-${color}`
//         : 'border-2 border-black'
//       : '';

//   const primaryClasses =
//     type === 'primary'
//       ? `${primaryColorClasses} text-center flex justify-center`
//       : '';
//   const secondaryClasses = type === 'secondary' ? 'text-left p-0' : '';

//   const primarySizeClasses =
//     type === 'primary'
//       ? {
//           'x-small': 'h-10 min-w-0 p-2',
//           small: 'h-10 min-w-0 p-2',
//           medium: 'h-[50px] min-w-[100px] p-3',
//           large: 'h-[60px] min-w-[200px] p-4',
//           'x-large': 'h-[65px] min-w-[200px] p-4',
//         }[size] || ''
//       : '';

//   const skeletonClasses = skeleton ? 'skeleton skeleton-active' : '';

//   const dynamicColorClasses =
//     type === 'secondary' && color ? `text-${color} fill-${color}` : '';

//   const invertedClass = inverted ? 'inverted' : '';
//   const loadingStateClass = loading ? 'loading' : '';
//   const disabledStateClass = disabled ? 'disabled' : '';

//   const finalClassName = classnames(
//     baseClasses,
//     sizeClasses,
//     fluidClass,
//     disabledClasses,
//     loadingClasses,
//     primaryClasses,
//     secondaryClasses,
//     primarySizeClasses,
//     skeletonClasses,
//     dynamicColorClasses,
//     invertedClass,
//     loadingStateClass,
//     disabledStateClass
//   );

//   const iconWidthClasses =
//     {
//       'x-small': 'w-[8px]',
//       small: 'w-[14px]',
//       medium: 'w-4',
//       large: 'w-[18px]',
//       'x-large': 'w-5',
//     }[size] || '';

//   const renderNormalContents = () => {
//     if (icon) {
//       if (iconFloat === 'left') {
//         return (
//           <div className="flex items-center">
//             <div
//               className={classnames(
//                 'transition-transform duration-300 ease-in-out ml-[7px] mr-[7px]',
//                 iconWidthClasses
//               )}
//             >
//               {Array.isArray(icon)
//                 ? icon.map((iconItem, index) => (
//                     <span key={index} className="pr-1">
//                       {iconItem}
//                     </span>
//                   ))
//                 : icon}
//             </div>
//             <span>
//               {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
//             </span>
//           </div>
//         );
//       }
//       return (
//         <div className="flex items-center">
//           <span>
//             {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
//           </span>
//           <div
//             className={classnames(
//               'flex items-center transition-transform duration-300 ease-in-out ml-[7px] mr-[7px]',
//               iconWidthClasses
//             )}
//           >
//             {Array.isArray(icon)
//               ? icon.map((iconItem, index) => (
//                   <span key={index} className="pr-2">
//                     {iconItem}
//                   </span>
//                 ))
//               : icon}
//           </div>
//         </div>
//       );
//     }
//     return (
//       <span>
//         {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
//       </span>
//     );
//   };

//   const renderContents = () => {
//     if (loading) {
//       return (
//         <div className="flex items-center relative">
//           <div className="opacity-0">{renderNormalContents()}</div>
//           <div className="absolute inset-0 flex justify-center items-center animate-spin">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="transition-all duration-300 ease-in-out"
//             >
//               <path d="M13 0c3.667.305 6.863 2.26 8.851 5.129l-1.746 1.013c-1.634-2.273-4.182-3.84-7.105-4.133v-2.009zm-11 12c0-1.47.324-2.863.891-4.122l-1.737-1.007c-.733 1.558-1.154 3.292-1.154 5.129 0 1.837.421 3.571 1.153 5.129l1.738-1.008c-.567-1.259-.891-2.651-.891-4.121zm20 0c0 1.47-.324 2.863-.891 4.122l1.738 1.007c.732-1.558 1.153-3.292 1.153-5.129s-.421-3.571-1.153-5.129l-1.738 1.007c.567 1.259.891 2.652.891 4.122zm-1.895 5.858c-1.634 2.273-4.182 3.84-7.105 4.133v2.009c3.667-.305 6.863-2.26 8.851-5.129l-1.746-1.013zm-16.21-11.717c1.634-2.272 4.183-3.839 7.105-4.132v-2.009c-3.667.305-6.862 2.259-8.851 5.128l1.746 1.013zm7.105 15.85c-2.923-.293-5.471-1.86-7.105-4.133l-1.746 1.013c1.988 2.87 5.184 4.824 8.851 5.129v-2.009z" />
//             </svg>
//           </div>
//         </div>
//       );
//     }
//     return renderNormalContents();
//   };

//   return (
//     <WithLink
//       {...(loading && { 'aria-label': 'Loading' })}
//       {...(disabled && { disabled, 'aria-label': 'Disabled' })}
//       {...(onClick && { onClick })}
//       {...(withLinkProps && { withLinkProps })}
//       className={finalClassName}
//     >
//       {renderContents()}
//     </WithLink>
//   );
// }

import React from 'react';
import WithLink from '../../utils/with-link';
import classnames from 'classnames';

export default function Button(props) {
  const {
    type, // "primary" or "secondary"
    size, // "x-small", "small", "medium", "large", "x-large"
    text,
    color, // e.g. "neutral-500", "rendah-red", etc.
    fluid,
    icon,
    iconFloat,
    inverted,
    loading,
    disabled,
    onClick,
    skeleton,
    withLinkProps,
  } = props;

  const baseClasses =
    'transition-all duration-300 ease-in-out inline-flex justify-center items-center bg-transparent shadow-none outline-none border-0 cursor-pointer relative no-underline min-w-[50px] font-secondary z-[4]';

  const sizeClasses =
    {
      'x-small': 'text-xs',
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      'x-large': 'text-xl',
    }[size] || '';

  const fluidClass = fluid ? 'w-full' : '';

  const disabledClasses = disabled ? 'opacity-30 cursor-not-allowed' : '';
  const loadingClasses = loading ? 'cursor-default' : '';

  const primaryColorClasses =
    type === 'primary'
      ? color
        ? `border-2 border-${color} text-${color} fill-${color}`
        : 'border-2 border-black'
      : '';

  const primaryClasses =
    type === 'primary'
      ? `${primaryColorClasses} text-center flex justify-center`
      : '';
  const secondaryClasses = type === 'secondary' ? 'text-left p-0' : '';

  const primarySizeClasses =
    type === 'primary'
      ? {
          'x-small': 'h-10 min-w-0 p-2',
          small: 'h-10 min-w-0 p-2',
          medium: 'h-[50px] min-w-[100px] p-3',
          large: 'h-[60px] min-w-[200px] p-4',
          'x-large': 'h-[65px] min-w-[200px] p-4',
        }[size] || ''
      : '';

  const skeletonClasses = skeleton ? 'skeleton skeleton-active' : '';

  const dynamicColorClasses =
    type === 'secondary' && color ? `text-${color} fill-${color}` : '';

  const invertedClass = inverted ? 'inverted' : '';
  const loadingStateClass = loading ? 'loading' : '';
  const disabledStateClass = disabled ? 'disabled' : '';

  const finalClassName = classnames(
    baseClasses,
    sizeClasses,
    fluidClass,
    disabledClasses,
    loadingClasses,
    primaryClasses,
    secondaryClasses,
    primarySizeClasses,
    skeletonClasses,
    dynamicColorClasses,
    invertedClass,
    loadingStateClass,
    disabledStateClass
  );

  const iconWidthClasses =
    {
      'x-small': 'w-[8px]',
      small: 'w-[14px]',
      medium: 'w-4',
      large: 'w-[18px]',
      'x-large': 'w-5',
    }[size] || '';

  const renderNormalContents = () => {
    if (icon) {
      if (iconFloat === 'left') {
        return (
          <div className="flex items-center">
            <div
              className={classnames(
                'transition-transform duration-300 ease-in-out ml-[7px] mr-[7px]',
                iconWidthClasses
              )}
            >
              {Array.isArray(icon)
                ? icon.map((iconItem, index) => (
                    <span key={index} className="pr-1">
                      {iconItem}
                    </span>
                  ))
                : icon}
            </div>
            <span>
              {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center">
          <span>
            {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
          </span>
          <div
            className={classnames(
              'flex items-center transition-transform duration-300 ease-in-out ml-[7px] mr-[7px]',
              iconWidthClasses
            )}
          >
            {Array.isArray(icon)
              ? icon.map((iconItem, index) => (
                  <span key={index} className="pr-2">
                    {iconItem}
                  </span>
                ))
              : icon}
          </div>
        </div>
      );
    }
    return (
      <span>
        {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
      </span>
    );
  };

  const renderContents = () => {
    if (loading) {
      return (
        <div className="flex items-center relative">
          <div className="opacity-0">{renderNormalContents()}</div>
          <div className="absolute inset-0 flex justify-center items-center animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="transition-all duration-300 ease-in-out"
            >
              <path d="M13 0c3.667.305 6.863 2.26 8.851 5.129l-1.746 1.013c-1.634-2.273-4.182-3.84-7.105-4.133v-2.009zm-11 12c0-1.47.324-2.863.891-4.122l-1.737-1.007c-.733 1.558-1.154 3.292-1.154 5.129 0 1.837.421 3.571 1.153 5.129l1.738-1.008c-.567-1.259-.891-2.651-.891-4.121zm20 0c0 1.47-.324 2.863-.891 4.122l1.738 1.007c.732-1.558 1.153-3.292 1.153-5.129s-.421-3.571-1.153-5.129l-1.738 1.007c.567 1.259.891 2.652.891 4.122zm-1.895 5.858c-1.634 2.273-4.182 3.84-7.105 4.133v2.009c3.667-.305 6.863-2.26 8.851-5.129l-1.746-1.013zm-16.21-11.717c1.634-2.272 4.183-3.839 7.105-4.132v-2.009c-3.667.305-6.862 2.259-8.851 5.128l1.746 1.013zm7.105 15.85c-2.923-.293-5.471-1.86-7.105-4.133l-1.746 1.013c1.988 2.87 5.184 4.824 8.851 5.129v-2.009z" />
            </svg>
          </div>
        </div>
      );
    }
    return renderNormalContents();
  };

  return (
    <WithLink
      {...(loading && { 'aria-label': 'Loading' })}
      {...(disabled && { disabled, 'aria-label': 'Disabled' })}
      {...(onClick && { onClick })}
      {...(withLinkProps && { withLinkProps })}
      className={`underline text-${color} fill-${color} underline cursor-pointer`}
    >
      {renderContents()}
    </WithLink>
  );
}
