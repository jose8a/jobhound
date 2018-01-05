'use strict';

let vue = "https://vuejobs.com/remote-vuejs-jobs"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')
let format = require('date-fns/format');

let parserOptions = {
  listSelector: ".position--genuine",
  linkSelector: ".position__title > a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "vue-programming",
  source: "vuejobs",
  sourceType: "primary-source",
  baseUrl: "https://vuejobs.com",
  tags: "vue,programming,remote",
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

// 1. create vue-rem-specific properties parser
let vueRemotePropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr('href');
  },
  extractId: function(itemContainer, linkItem) {
    let urlIdFragment = linkItem.attr('href').split('/').pop();
    let id = urlIdFragment.split('-')[0];
    return `vue-${id}`;
  },
  extractCompany: function(itemContainer, linkItem) {
    return itemContainer.find('.position__location > a').text().trim();
  },
  extractDate: function(itemContainer, linkItem) {
    return format(new Date(), 'YYYY-MM-DD');
  }
}

// 2. create a vueRemoteItemParser from the generic newsItemParser in
//    order to assign vue-rem-specific properties to it
let vueRemoteItemParser = Object.create(newsItemParser);
vueRemoteItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the vueRemoteItemParser object using
//    Object.assign(..)
vueRemoteItemParser = Object.assign(vueRemoteItemParser, vueRemotePropertiesExtractor)

// 4. create a vueRemoteSiteParser to handle and orchestrate the actual parsing
//    on the site
let vueRemoteSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchVueJobs = function(req, res) {
  request(vue, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      vueRemoteSiteParser.init(html, vueRemoteItemParser);
      vueRemoteSiteParser.parseCollection();

      res.status(200).json(vueRemoteSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchVueJobs;
