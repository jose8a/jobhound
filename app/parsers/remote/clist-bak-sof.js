let format = require('date-fns/format');

let clistUrl = "https://bakersfield.craigslist.org/search/sof";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".result-row",
  linkSelector: "a.hdrlnk",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "clist-egr",
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

// 1. create clist-bak-sof-specific properties parser
let clistBakSofPropertiesExtractor = {
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

// 2. create a clistBakSofItemParser from the generic newsItemParser in
//    order to assign clist-bak-sof-specific properties to it
let clistBakSofItemParser = Object.create(newsItemParser);
clistBakSofItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the clistBakSofItemParser object using
//    Object.assign(..)
clistBakSofItemParser = Object.assign(clistBakSofItemParser, clistBakSofPropertiesExtractor)

// 4. create a clistBakSofSiteParser to handle and orchestrate the actual parsing
//    on the site
let clistBakSofSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCLBakSofJobs = function(req, res) {
  request(clistUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      clistBakSofSiteParser.init(html, clistBakSofItemParser);
      clistBakSofSiteParser.parseCollection();

      res.status(200).json(clistBakSofSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCLBakSofJobs;
