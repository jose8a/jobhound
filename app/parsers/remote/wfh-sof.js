'use strict';

let wfh = "https://www.wfh.io/categories/1-remote-software-development/jobs"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: "tbody > tr",
  linkSelector: "td > a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "wfh-software",
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

// 1. create wfh-sof-specific properties parser
let wfhSofPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    console.log("container ---- " + itemContainer.find('a').text());
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

// 2. create a wfhSofItemParser from the generic newsItemParser in
//    order to assign wfh-sof-specific properties to it
let wfhSofItemParser = Object.create(newsItemParser);
wfhSofItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the wfhSofItemParser object using
//    Object.assign(..)
wfhSofItemParser = Object.assign(wfhSofItemParser, wfhSofPropertiesExtractor)

// 4. create a wfhSofSiteParser to handle and orchestrate the actual parsing
//    on the site
let wfhSofSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchWFHJobs = function(req, res) {
  request(wfh, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      wfhSofSiteParser.init(html, wfhSofItemParser);
      wfhSofSiteParser.parseCollection();

      res.status(200).json(wfhSofSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchWFHJobs;
