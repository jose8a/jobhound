let format = require('date-fns/format');

let clistUrl = "https://sacramento.craigslist.org/search/eng?is_telecommuting=1";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".result-row",
  linkSelector: "a.hdrlnk",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "clist-eng",
  source: "clist",
  sourceType: "primary-source",
  baseUrl: "https://sacramento.craigslist.org",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "sacramento",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-rem-la-eng-specific properties parser
let clistRemoteSacEngPropertiesExtractor = {
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

// 2. create a clistRemoteSacEngItemParser from the generic newsItemParser in
//    order to assign clist-rem-la-eng-specific properties to it
let clistRemoteSacEngItemParser = Object.create(newsItemParser);
clistRemoteSacEngItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteSacEngItemParser object using
//    Object.assign(..)
clistRemoteSacEngItemParser = Object.assign(clistRemoteSacEngItemParser, clistRemoteSacEngPropertiesExtractor)

// 4. create a clistRemoteSacEngSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteSacEngSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteSacEngJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteSacEngSiteParser.init(html, clistRemoteSacEngItemParser);
      clistRemoteSacEngSiteParser.parseCollection();

      res.status(200).json(clistRemoteSacEngSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteSacEngJobs;
