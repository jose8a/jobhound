let format = require('date-fns/format');

let clistUrl = "https://bakersfield.craigslist.org/search/egr";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".result-row",
  linkSelector: "a.hdrlnk",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "clist-egr",
  source: "clist",
  sourceType: "primary-source",
  baseUrl: "https://bakersfield.craigslist.org",
  tags: "programming,local",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "bakersfield",
  isRemote: "",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-bak-eng-specific properties parser
let clistBakEngPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return itemContainer.data("pid").toString();
  },
  extractCompany: function(itemContainer, linkItem) {
    return "";
  },
  extractDate: function(itemContainer, linkItem) {
    return format(new Date(), 'YYYY-MM-DD');
  }
}

// 2. create a clistBakEngItemParser from the generic newsItemParser in
//    order to assign clist-bak-eng-specific properties to it
let clistBakEngItemParser = Object.create(newsItemParser);
clistBakEngItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistBakEngItemParser object using
//    Object.assign(..)
clistBakEngItemParser = Object.assign(clistBakEngItemParser, clistBakEngPropertiesExtractor)

// 4. create a clistBakEngSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistBakEngSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLBakEngJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistBakEngSiteParser.init(html, clistBakEngItemParser);
      clistBakEngSiteParser.parseCollection();

      res.status(200).json(clistBakEngSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLBakEngJobs;
