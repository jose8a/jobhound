let format = require('date-fns/format');

let clistUrl = "https://losangeles.craigslist.org/search/sof?is_telecommuting=1";
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
  baseUrl: "https://losangeles.craigslist.org",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "losangeles",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create clist-rem-la-sof-specific properties parser
let clistRemoteLASofPropertiesExtractor = {
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

// 2. create a clistRemoteLASofItemParser from the generic newsItemParser in
//    order to assign clist-rem-la-sof-specific properties to it
let clistRemoteLASofItemParser = Object.create(newsItemParser);
clistRemoteLASofItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistRemoteLASofItemParser object using
//    Object.assign(..)
clistRemoteLASofItemParser = Object.assign(clistRemoteLASofItemParser, clistRemoteLASofPropertiesExtractor)

// 4. create a clistRemoteLASofSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistRemoteLASofSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLRemoteLASofJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistRemoteLASofSiteParser.init(html, clistRemoteLASofItemParser);
      clistRemoteLASofSiteParser.parseCollection();

      res.status(200).json(clistRemoteLASofSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLRemoteLASofJobs;
