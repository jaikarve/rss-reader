const sdk = require('kinvey-flex-sdk');

const handlers = require('./lib/handlers');

sdk.service((err, flex) => {
  const data = flex.data;   // gets the FlexData object from the service

  handlers.initHandler(flex.logger);

  // set the serviceObject
  const rssNews = data.serviceObject('rss-news');
  // wire up the event that we want to process
  rssNews.onGetAll(handlers.listHandler);
  rssNews.onGetCount(handlers.countHandler);
  rssNews.onGetById(handlers.fetchHandler);
});
