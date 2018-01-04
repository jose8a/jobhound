'use strict';

let auth = "https://www.authenticjobs.com/#remote=true"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')
let format = require('date-fns/format');

let parserOptions = {
  listSelector: ".listedJob",
  linkSelector: "a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "auth-programming",
  source: "auth",
  sourceType: "primary-source",
  baseUrl: "https://www.authenticjobs.com",
  tags: "programming,remote",
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

// 1. create auth-rem-specific properties parser
let authRemotePropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find('.details > h3').text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let relativeUrl = linkItem.attr("href");
    return this.storyProperties.baseUrl + relativeUrl;
  },
  extractId: function(itemContainer, linkItem) {
    return "auth-" + itemContainer.data('job-id');
  },
  extractCompany: function(itemContainer, linkItem) {
    return linkItem.find('.details > h4').attr('title').trim();
  },
  extractDate: function(itemContainer, linkItem) {
    return format(new Date(), 'YYYY-MM-DD');
  }
}

// 2. create a authRemoteItemParser from the generic newsItemParser in
//    order to assign auth-rem-specific properties to it
let authRemoteItemParser = Object.create(newsItemParser);
authRemoteItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the authRemoteItemParser object using
//    Object.assign(..)
authRemoteItemParser = Object.assign(authRemoteItemParser, authRemotePropertiesExtractor)

// 4. create a authRemoteSiteParser to handle and orchestrate the actual parsing
//    on the site
let authRemoteSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchAuthJobs = function(req, res) {
  request(auth, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      authRemoteSiteParser.init(html, authRemoteItemParser);
      authRemoteSiteParser.parseCollection();

      res.status(200).json(authRemoteSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchAuthJobs;
