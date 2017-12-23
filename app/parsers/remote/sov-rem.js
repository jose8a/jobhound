'use strict';

let sov = "https://stackoverflow.com/jobs?sort=p&q=javascript&l=Remote&d=20&u=Miles&r=true"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: "div.-job-item",
  linkSelector: "h2 > a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "sov-javascript",
  source: "sov",
  sourceType: "primary-source",
  baseUrl: "https://stackoverflow.com",
  tags: "programming,javascript,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  location: "",
  isTemp: ""
};

// 1. create sov-js-specific properties parser
let sovRemPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.attr('title').trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let relativeUrl = linkItem.attr("href").split('?')[0];
    return this.storyProperties.baseUrl + relativeUrl;
  },
  extractId: function(itemContainer, linkItem) {
    return itemContainer.data("jobid");
  },
  extractCompany: function(itemContainer, linkItem) {
    return itemContainer.find("li.employer").text().trim();
  },
  extractLocation: function(itemContainer, linkItem) {
    return itemContainer.find(".location").text().trim();
  },
  extractDate: function(itemContainer, linkItem) {
    return itemContainer.find(".-posted-date").text().trim();
  }
}

// 2. create a sovRemItemParser from the generic newsItemParser in
//    order to assign sov-js-specific properties to it
let sovRemItemParser = Object.create(newsItemParser);
sovRemItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the sovRemItemParser object using
//    Object.assign(..)
sovRemItemParser = Object.assign(sovRemItemParser, sovRemPropertiesExtractor)

// 4. create a sovRemSiteParser to handle and orchestrate the actual parsing
//    on the site
let sovRemSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchSOVJSJobs = function(req, res) {
  request(sov, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      sovRemSiteParser.init(html, sovRemItemParser);
      sovRemSiteParser.parseCollection();

      res.status(200).json(sovRemSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchSOVJSJobs;
