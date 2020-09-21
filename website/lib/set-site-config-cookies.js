import Cookies from 'js-cookie';

const setSiteConfigCookies = (siteConfig) => {
  if (!Cookies.get('siteConfig')) {
    Cookies.set('siteConfig', JSON.stringify(siteConfig), { expires: 7 });
  }
};

export default setSiteConfigCookies;
