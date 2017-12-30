let format = require('date-fns/format');

let clistUrl = "https://orangecounty.craigslist.org/search/eng?is_telecommuting=1";
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
  baseUrl: "https://orangecounty.craigslist.org",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "orange county",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-rem-oc-eng-specific properties parser
let clistRemoteOCEngPropertiesExtractor = {
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

// 2. create a clistRemoteOCEngItemParser from the generic newsItemParser in
//    order to assign clist-rem-oc-eng-specific properties to it
let clistRemoteOCEngItemParser = Object.create(newsItemParser);
clistRemoteOCEngItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteOCEngItemParser object using
//    Object.assign(..)
clistRemoteOCEngItemParser = Object.assign(clistRemoteOCEngItemParser, clistRemoteOCEngPropertiesExtractor)

// 4. create a clistRemoteOCEngSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteOCEngSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteOCEngJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteOCEngSiteParser.init(html, clistRemoteOCEngItemParser);
      clistRemoteOCEngSiteParser.parseCollection();

      res.status(200).json(clistRemoteOCEngSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteOCEngJobs;
