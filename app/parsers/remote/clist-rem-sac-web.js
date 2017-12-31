let format = require('date-fns/format');

let clistUrl = "https://sacramento.craigslist.org/search/web?is_telecommuting=1";
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

// 1. create clist-rem-sac-web-specific properties parser
let clistRemoteSacWebPropertiesExtractor = {
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

// 2. create a clistRemoteSacWebItemParser from the generic newsItemParser in
//    order to assign clist-rem-sac-web-specific properties to it
let clistRemoteSacWebItemParser = Object.create(newsItemParser);
clistRemoteSacWebItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteSacWebItemParser object using
//    Object.assign(..)
clistRemoteSacWebItemParser = Object.assign(clistRemoteSacWebItemParser, clistRemoteSacWebPropertiesExtractor)

// 4. create a clistRemoteSacWebSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteSacWebSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteSacWebJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteSacWebSiteParser.init(html, clistRemoteSacWebItemParser);
      clistRemoteSacWebSiteParser.parseCollection();

      res.status(200).json(clistRemoteSacWebSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteSacWebJobs;
