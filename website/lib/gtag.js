export const GA_TRACKING_ID = 'UA-120300345-1'; // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (window?.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (window?.gtag) {
    console.log('aaa', action, category, label, value);
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
