module.exports = {
  feeds: {
    __versions: ['2021-06-30'],
    __operations: ['getFeeds', 'createFeed', 'getFeed', 'cancelFeed', 'createFeedDocument', 'getFeedDocument'],
    ...require('./versions/feeds/feeds_2021-06-30')
  }
};
