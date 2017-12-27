let format = require('date-fns/format');

let clistUrl = "https://fresno.craigslist.org/search/web";
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
  baseUrl: "https://fresno.craigslist.org",
  tags: "programming,local",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "fresno",
  isRemote: "",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-fre-web-specific properties parser
let clistFreWebPropertiesExtractor = {
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

// 2. create a clistFreWebItemParser from the generic newsItemParser in
//    order to assign clist-fre-web-specific properties to it
let clistFreWebItemParser = Object.create(newsItemParser);
clistFreWebItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistFreWebItemParser object using
//    Object.assign(..)
clistFreWebItemParser = Object.assign(clistFreWebItemParser, clistFreWebPropertiesExtractor)

// 4. create a clistFreWebSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistFreWebSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLFreWebJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistFreWebSiteParser.init(html, clistFreWebItemParser);
      clistFreWebSiteParser.parseCollection();

      res.status(200).json(clistFreWebSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLFreWebJobs;
