'use strict';

let wfh = "https://www.wfh.io/latest-remote-jobs"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: "tbody > tr",
  linkSelector: "td > a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "wfh-all",
  source: "wfh",
  sourceType: "primary-source",
  baseUrl: "https://www.wfh.io",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  location: "remote",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  isTemp: ""
};

// 1. create wfh-all-specific properties parser
let wfhAllPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let relativeUrl = linkItem.attr("href");
    return this.storyProperties.baseUrl + relativeUrl;
  },
  extractId: function(itemContainer, linkItem) {
    let urlIDFragment = linkItem.attr("href").split('/')[2];
    return "wfh-" + urlIDFragment.split('-')[0];
  },
  extractCompany: function(itemContainer, linkItem) {
    return itemContainer.find("td > strong").text();
  },
  extractDate: function(itemContainer, linkItem) {
    return itemContainer.find("td").first().text();
  }
}

// 2. create a wfhAllItemParser from the generic newsItemParser in
//    order to assign wfh-all-specific properties to it
let wfhAllItemParser = Object.create(newsItemParser);
wfhAllItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the wfhAllItemParser object using
//    Object.assign(..)
wfhAllItemParser = Object.assign(wfhAllItemParser, wfhAllPropertiesExtractor)

// 4. create a wfhAllSiteParser to handle and orchestrate the actual parsing
//    on the site
let wfhAllSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchWFHJobs = function(req, res) {
  request(wfh, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      wfhAllSiteParser.init(html, wfhAllItemParser);
      wfhAllSiteParser.parseCollection();

      res.status(200).json(wfhAllSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchWFHJobs;
