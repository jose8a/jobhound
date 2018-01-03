let format = require('date-fns/format');

NewsItemParser = {
  init: function(parserOptions, jobProperties) {
    this.initProperties = Object.assign({}, jobProperties);

    this.listSelector = parserOptions.listSelector;
    this.linkSelector = parserOptions.linkSelector;
    this.linkType = parserOptions.linkType || 'inner';
  },
  getNewsItem: function() {
    return this.storyProperties;
  },
  getLinkSelector: function() {
    return this.linkSelector;
  },
  getCollectionSelector: function() {
    return this.listSelector;
  },
  getLinkItem: function(itemContainer, linkSelector) {
    // if type === 'inner', the link is embedded in the item container,
    //    else, it is attached to the itemContainer itself
    let urlAnchor = itemContainer.find(linkSelector);

    // this property is WWR-specific.  TODO: figure out how to refactor
    //  this logic into the wwr-prog or wwr-cust modules.
    if (urlAnchor.attr("href") === "/#intro" ) {
      return null;
    }

    if (this.linkType === 'inner') {
      // if linkSelector is not found within itemContainer, skip the
      // current list item.
      if (!urlAnchor.attr("href")) {
        return null;
      }

      return itemContainer.find(linkSelector);
    }

    return itemContainer;
  },
  parseItem: function(itemContainer, linkItem, rank) {
    // make sure to start with an empy object when parsing a news item
    this.storyProperties = Object.assign({}, this.initProperties);

    this.storyProperties.title = this.extractTitle(itemContainer, linkItem);
    this.storyProperties.url =  this.extractUrl(itemContainer, linkItem);
    this.storyProperties.sourceId = this.extractId(itemContainer, linkItem);
    this.storyProperties.fetchDate = this.extractDate(itemContainer, linkItem);
    this.storyProperties.company = this.extractCompany(itemContainer, linkItem);
  }

  // The following four methods should be an interface that is 'assigned'
  // to all siteParsers as the extraction of each of these items may
  // require a unique process for each site
  //    * extractTitle(itemContainer, linkItem)
  //    * extractUrl(itemContainer, linkItem)
  //    * extractId(itemContainer, linkItem)
  //    * extractRank(itemContainer, linkItem, rank)
}

module.exports = NewsItemParser;
