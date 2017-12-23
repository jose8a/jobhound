let cheerio = require('cheerio');

SiteCollectionParser = {
  init: function(html, itemParser) {
    this.$ = cheerio.load(html);
    this.newsItems = [];
    this.itemParser = itemParser;
  },
  parseCollection: function() {
    self = this;
    self.newsItems = [];    // always start w/an empty collection when parsing
    let linkSelector = self.itemParser.getLinkSelector();
    let collectionSelector = self.itemParser.getCollectionSelector();

    // A collection of news items usually can be identified and extracted via a
    // common CSS selector - often a class attribute, but sometimes
    // a collection of css selectors. This selection returns a collection of
    // DOM 'containers' from which properties can be extracted
    self.rawCollection = this.$(collectionSelector);

    // Each DOM news item container will be parsed for the necessary properties
    // within it, and those properties will be stored in the siteParser's
    self.rawCollection.each( function(i, elem) {
      // this is a cheerio object graph with the story container as the root
      let itemContainer = self.$(this);
      let linkItem = self.itemParser.getLinkItem(itemContainer, linkSelector);

      if (linkItem) {
        self.itemParser.parseItem(itemContainer, linkItem, i);
        self.newsItems.push(self.itemParser.getNewsItem());
      }
    });
  },
  getParsedItems: function() {
    return this.newsItems;
  }
}

module.exports = SiteCollectionParser;
