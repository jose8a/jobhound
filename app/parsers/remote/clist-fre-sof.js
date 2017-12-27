let format = require('date-fns/format');

let clistUrl = "https://fresno.craigslist.org/search/sof";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".result-row",
  linkSelector: "a.hdrlnk",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "clist-sof",
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

// 1. create clist-fre-sof-specific properties parser
let clistFreSofPropertiesExtractor = {
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

// 2. create a clistFreSofItemParser from the generic newsItemParser in
//    order to assign clist-fre-sof-specific properties to it
let clistFreSofItemParser = Object.create(newsItemParser);
clistFreSofItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistFreSofItemParser object using
//    Object.assign(..)
clistFreSofItemParser = Object.assign(clistFreSofItemParser, clistFreSofPropertiesExtractor)

// 4. create a clistFreSofSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistFreSofSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLFreSofJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistFreSofSiteParser.init(html, clistFreSofItemParser);
      clistFreSofSiteParser.parseCollection();

      res.status(200).json(clistFreSofSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLFreSofJobs;
