let format = require('date-fns/format');

let clistUrl = "https://fresno.craigslist.org/search/eng";
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

// 1. create clist-fre-eng-specific properties parser
let clistFreEngPropertiesExtractor = {
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

// 2. create a clistFreEngItemParser from the generic newsItemParser in
//    order to assign clist-fre-eng-specific properties to it
let clistFreEngItemParser = Object.create(newsItemParser);
clistFreEngItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistFreEngItemParser object using
//    Object.assign(..)
clistFreEngItemParser = Object.assign(clistFreEngItemParser, clistFreEngPropertiesExtractor)

// 4. create a clistFreEngSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistFreEngSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLFreEngJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistFreEngSiteParser.init(html, clistFreEngItemParser);
      clistFreEngSiteParser.parseCollection();

      res.status(200).json(clistFreEngSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLFreEngJobs;
