'use strict';

// --- let jsp = "https://jobspresso.co/remote-work/"
let jsp = "https://jobspresso.co/jm-ajax/get_listings/";
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

// JSP request is an ajax api that returns JSON with an 'html' property that
// consists of the HTML to be added to the page in the 'jobs' section
let ajaxFormData = {
  lang: "",
  search_keywords: "",
  search_location: "",
  search_categories: [],
  filter_job_type: [
    "designer",
    "developer",
    "devops",
    "marketing",
    "project-mgmt",
    "sales",
    "support",
    "various",
    "writing",
  ],
  per_page: 22,
  orderby: "featured",
  order: "DESC",
  page: 2,
  show_pagination: false
}

let parserOptions = {
  listSelector: ".job_listing",
  linkSelector: "a.job_listing-clickbox",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "jsp-remote",
  source: "jsp",
  sourceType: "primary-source",
  baseUrl: "https://jobspresso.co/",
  tags: "programming,remote",
  description: "",
  rating: "",
  primeRole: "",
  applyState: "inbox",
  isRemote: "true",
  isFulltime: "",
  isFreelance: "",
  location: "remote",
  isTemp: ""
};

// 1. create jsp-specific properties parser
let jspPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return itemContainer.data('title').trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "jsp-" + itemContainer.attr("id").split('-')[1];
  },
  extractCompany: function(itemContainer, linkItem) {
    return itemContainer.find(".job_listing-company > strong").text().trim();
  },
  extractLocation: function(itemContainer, linkItem) {
    return "remote";
  },
  extractDate: function(itemContainer, linkItem) {
    return itemContainer.find("date").text().trim();
  }
}

// 2. create a jspItemParser from the generic newsItemParser in
//    order to assign jsp-specific properties to it
let jspItemParser = Object.create(newsItemParser);
jspItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the jspItemParser object using
//    Object.assign(..)
jspItemParser = Object.assign(jspItemParser, jspPropertiesExtractor)

// 4. create a jspSiteParser to handle and orchestrate the actual parsing
//    on the site
let jspSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchJSPJobs = function(req, res) {
  request.post({url: jsp, form: ajaxFormData, json: true}, function (error, response, body) {
  // --- request(jsp, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // --- jspSiteParser.init(html, jspItemParser);
      jspSiteParser.init(body.html, jspItemParser);
      jspSiteParser.parseCollection();

      res.status(200).json(jspSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchJSPJobs;

