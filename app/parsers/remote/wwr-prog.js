let wwr = "https://weworkremotely.com/categories/2-programming/jobs"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".jobs ul li",
  linkSelector: "a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "wwr-programming",
  source: "wwr",
  sourceType: "primary-source",
  baseUrl: "https://weworkremotely.com",
  tags: "customer,support,happiness",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create wwr-prog-specific properties parser
let wwrProgPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find('.title').text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let relativeUrl = linkItem.attr("href");
    return this.storyProperties.baseUrl + relativeUrl;
  },
  extractId: function(itemContainer, linkItem) {
    let urlFragment = linkItem.attr("href").split('/')[2];
    return urlFragment.split('-')[0];
  },
  extractCompany: function(itemContainer, linkItem) {
    return linkItem.find(".company").text();
  },
  extractDate: function(itemContainer, linkItem) {
    return linkItem.find(".date").text();
  }
}

// 2. create a wwrProgItemParser from the generic newsItemParser in
//    order to assign wwr-prog-specific properties to it
let wwrProgItemParser = Object.create(newsItemParser);
wwrProgItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the wwrProgItemParser object using
//    Object.assign(..)
wwrProgItemParser = Object.assign(wwrProgItemParser, wwrProgPropertiesExtractor)

// 4. create a wwrProgSiteParser to handle and orchestrate the actual parsing
//    on the site
let wwrProgSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchWWRJobs = function(req, res) {
  request(wwr, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      wwrProgSiteParser.init(html, wwrProgItemParser);
      wwrProgSiteParser.parseCollection();

      res.status(200).json(wwrProgSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchWWRJobs;
