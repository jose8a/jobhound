let format = require('date-fns/format');

let clistUrl = "https://orangecounty.craigslist.org/search/web?is_telecommuting=1";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".result-row",
  linkSelector: "a.hdrlnk",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "clist-web",
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

// 1. create clist-rem-oc-web-specific properties parser
let clistRemoteOCWebPropertiesExtractor = {
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

// 2. create a clistRemoteOCWebItemParser from the generic newsItemParser in
//    order to assign clist-rem-oc-web-specific properties to it
let clistRemoteOCWebItemParser = Object.create(newsItemParser);
clistRemoteOCWebItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteOCWebItemParser object using
//    Object.assign(..)
clistRemoteOCWebItemParser = Object.assign(clistRemoteOCWebItemParser, clistRemoteOCWebPropertiesExtractor)

// 4. create a clistRemoteOCWebSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteOCWebSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteOCWebJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteOCWebSiteParser.init(html, clistRemoteOCWebItemParser);
      clistRemoteOCWebSiteParser.parseCollection();

      res.status(200).json(clistRemoteOCWebSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteOCWebJobs;
