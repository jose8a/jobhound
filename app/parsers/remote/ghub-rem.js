let ghub = "https://jobs.github.com/positions?description=&location=remote"
let request = require('request');
let newsItemParser = require('../newsItemParser');
let collectionParser = require('../siteParser')

let parserOptions = {
  listSelector: ".positionlist tr",
  linkSelector: "h4 > a",
  linkType: "inner"
};

let jobProperties = {
  siteCategory: "ghub-remote",
  source: "ghub",
  sourceType: "primary-source",
  baseUrl: "https://jobs.github.com",
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

// 1. create ghub-rem-specific properties parser
let ghubRemotesPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let relativeUrl = linkItem.attr("href");
    return this.storyProperties.baseUrl + relativeUrl;
  },
  extractId: function(itemContainer, linkItem) {
    let urlIDFragment = linkItem.attr("href").split('/')[2];
    return urlIDFragment;
  },
  extractCompany: function(itemContainer, linkItem) {
    // --- item.company = $(this).find(".company").text();

    return itemContainer.find(".company").text();
  },
  extractDate: function(itemContainer, linkItem) {
    // --- item.date_posted = $(this).find(".when").text();

    return itemContainer.find(".when").text().split(' ')[0];
  }
}

// 2. create a ghubRemotesItemParser from the generic newsItemParser in
//    order to assign ghub-rem-specific properties to it
let ghubRemotesItemParser = Object.create(newsItemParser);
ghubRemotesItemParser.init(parserOptions, jobProperties);

// 3. merge both objects into the ghubRemotesItemParser object using
//    Object.assign(..)
ghubRemotesItemParser = Object.assign(ghubRemotesItemParser, ghubRemotesPropertiesExtractor)

// 4. create a ghubRemotesSiteParser to handle and orchestrate the actual parsing
//    on the site
let ghubRemotesSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchGHRemoteJobs = function(req, res) {
  request(ghub, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      ghubRemotesSiteParser.init(html, ghubRemotesItemParser);
      ghubRemotesSiteParser.parseCollection();

      res.status(200).json(ghubRemotesSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchGHRemoteJobs;
