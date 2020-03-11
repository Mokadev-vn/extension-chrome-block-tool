chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.cookies.getAll(
    {
      domain: ".facebook.com"
    },
    function(cookies) {
      cookie = cookies;
    }
  );

  getToken = () => {
    return new Promise(function(resolve, reject) {
      let res = new XMLHttpRequest();
      res.onreadystatechange = () => {
        if (res.readyState == 4 && res.status == 200) {
          try {
            resolve(
              res.responseText
                .match(/accessToken(.*?)useLocalFilePreview/)[1]
                .split('"')[2]
            );
          } catch (e) {}
        }
      };
      res.open(
        "GET",
        "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed"
      );
      res.setRequestHeader("Content-type", "text/html; charset=utf-8");
      res.setRequestHeader(
        "Access-Control-Allow-Origin",
        "https://m.facebook.com"
      );
      res.withCredentials = true;
      res.send();
    });
  };

  getToken().then(accessToken => {
    token = accessToken.substring(0, accessToken.length - 1);
  });

  let msg = {
    cookie: cookie,
    token: token
  };

  chrome.tabs.sendMessage(details.tabId, msg);
});
