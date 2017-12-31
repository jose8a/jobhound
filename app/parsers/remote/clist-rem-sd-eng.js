let format = require('date-fns/format');

let clistUrl = "https://sandiego.craigslist.org/search/eng?is_telecommuting=1";
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
  baseUrl: "https://sandiego.craigslist.org",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "sandiego",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-rem-sd-eng-specific properties parser
let clistRemoteSDEngPropertiesExtractor = {
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

// 2. create a clistRemoteSDEngItemParser from the generic newsItemParser in
//    order to assign clist-rem-sd-eng-specific properties to it
let clistRemoteSDEngItemParser = Object.create(newsItemParser);
clistRemoteSDEngItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteSDEngItemParser object using
//    Object.assign(..)
clistRemoteSDEngItemParser = Object.assign(clistRemoteSDEngItemParser, clistRemoteSDEngPropertiesExtractor)

// 4. create a clistRemoteSDEngSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteSDEngSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteSDEngJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteSDEngSiteParser.init(html, clistRemoteSDEngItemParser);
      clistRemoteSDEngSiteParser.parseCollection();

      res.status(200).json(clistRemoteSDEngSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteSDEngJobs;
