module.exports = {
   feeds:{
    __versions:[
      '2020-09-04',
      '2021-06-30'
    ],
    __operations:[
      'getFeeds',
      'createFeed',
      'getFeed',
      'cancelFeed',
      'createFeedDocument',
      'getFeedDocument'
    ],
    ...require('./versions/feeds/feeds_2020-09-04'),
    ...require('./versions/feeds/feeds_2021-06-30')
  }
};