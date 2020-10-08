const getSiteConfigCookies = (cookies) => {
  const getCookie = (cname, cookies) => {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  };

  // If config cookie has never been set
  if (cookies && cookies.includes('siteConfig')) {
    return JSON.parse(getCookie('siteConfig', cookies));
  }

  return null;
};

export default getSiteConfigCookies;
