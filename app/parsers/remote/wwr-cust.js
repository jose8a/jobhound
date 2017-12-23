let wwr = "https://weworkremotely.com/categories/7-customer-support/jobs"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".jobs ul li",
  linkSelector: "a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "wwr-customer",
  source: "wwr",
  sourceType: "primary-source",
  baseUrl: "https://weworkremotely.com",
  tags: "customer,support,happiness,remote",
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

// 1. create wwr-cust-specific properties parser
let wwrCustPropertiesExtractor = {
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

// 2. create a wwrCustItemParser from the generic newsItemParser in
//    order to assign wwr-cust-specific properties to it
let wwrCustItemParser = Object.create(newsItemParser);
wwrCustItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the wwrCustItemParser object using
//    Object.assign(..)
wwrCustItemParser = Object.assign(wwrCustItemParser, wwrCustPropertiesExtractor)

// 4. create a wwrCustSiteParser to handle and orchestrate the actual parsing
//    on the site
let wwrCustSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchWWRCustJobs = function(req, res) {
  request(wwr, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      wwrCustSiteParser.init(html, wwrCustItemParser);
      wwrCustSiteParser.parseCollection();

      res.status(200).json(wwrCustSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchWWRCustJobs;
