let format = require('date-fns/format');

let clistUrl = "https://bakersfield.craigslist.org/search/web";
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

// 1. create clist-bak-web-specific properties parser
let clistBakWebPropertiesExtractor = {
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

// 2. create a clistBakWebItemParser from the generic newsItemParser in
//    order to assign clist-bak-web-specific properties to it
let clistBakWebItemParser = Object.create(newsItemParser);
clistBakWebItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistBakWebItemParser object using
//    Object.assign(..)
clistBakWebItemParser = Object.assign(clistBakWebItemParser, clistBakWebPropertiesExtractor)

// 4. create a clistBakWebSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistBakWebSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLBakWebJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistBakWebSiteParser.init(html, clistBakWebItemParser);
      clistBakWebSiteParser.parseCollection();

      res.status(200).json(clistBakWebSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLBakWebJobs;
