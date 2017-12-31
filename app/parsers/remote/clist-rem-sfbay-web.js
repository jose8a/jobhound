let format = require('date-fns/format');

let clistUrl = "https://sfbay.craigslist.org/search/web?is_telecommuting=1";
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
  baseUrl: "https://sfbay.craigslist.org",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "sfbay",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-rem-sfbay-web-specific properties parser
let clistRemoteSFBayWebPropertiesExtractor = {
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

// 2. create a clistRemoteSFBayWebItemParser from the generic newsItemParser in
//    order to assign clist-rem-sfbay-web-specific properties to it
let clistRemoteSFBayWebItemParser = Object.create(newsItemParser);
clistRemoteSFBayWebItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteSFBayWebItemParser object using
//    Object.assign(..)
clistRemoteSFBayWebItemParser = Object.assign(clistRemoteSFBayWebItemParser, clistRemoteSFBayWebPropertiesExtractor)

// 4. create a clistRemoteSFBayWebSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteSFBayWebSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteSFBayWebJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteSFBayWebSiteParser.init(html, clistRemoteSFBayWebItemParser);
      clistRemoteSFBayWebSiteParser.parseCollection();

      res.status(200).json(clistRemoteSFBayWebSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteSFBayWebJobs;
