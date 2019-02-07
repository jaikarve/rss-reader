const sdk = require('kinvey-flex-sdk');

const handlers = require('./lib/handlers');
const eventHandlers = require('./lib/event-handlers');

sdk.service((err, flex) => {
  const data = flex.data;   // gets the FlexData object from the service

  handlers.initHandler(flex.logger);
  eventHandlers.initHandler(flex.logger);

  // set the serviceObject
  const rssNews = data.serviceObject('rss-news');
  const rssEvents = data.serviceObject('rss-events');

  // wire up the event that we want to process
  rssNews.onGetAll(handlers.listHandler);
  rssNews.onGetCount(handlers.countHandler);
  rssNews.onGetById(handlers.fetchHandler);

  rssEvents.onGetAll(eventHandlers.listHandler);
  rssEvents.onGetCount(eventHandlers.countHandler);
  rssEvents.onGetById(eventHandlers.fetchHandler);
});
