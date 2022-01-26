// Extracts the search query from the URL and populates the search
// results.
import lunr from 'js/modules/lunr/lunr.js';
import * as lunrTypes from 'lunr';

function populateSearchBar(s: string) {
  const input = document.getElementById("header-search-input") as HTMLInputElement;
  const clear = document.getElementById("header-search-clear");
  input.classList.replace("w-0", "w-80");
  input.classList.replace("m-0", "ml-2");
  clear.classList.remove("hidden");
  clear.classList.remove("invisible");

  input.value = s;
}

type JsonDoc = {
  uri: string,
  title: string,
  content: string,
  categories: string,
  description: string,
  time: string,
};

function retrieveIndex(): Promise<Array<JsonDoc>> {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("GET", "/search.json");
    request.responseType = "json";
    request.onload = function () {
      if (this.status == 0 || (this.status >= 200 && this.status < 400)) {
        resolve(request.response);
      } else {
        reject({
          status: this.status,
          statusText: this.statusText
        });
      }
    };
    request.send();
  });
}

function buildIndex(docs: Array<JsonDoc>): { index: lunrTypes.Index, lookup: { [uri: string]: JsonDoc } } {
  let lookup = {};
  const index = lunr(function () {
    this.ref("uri");

    this.field("title");
    this.field("content");
    this.field("description");
    this.field("categories");

    for (const doc of docs) {
      this.add(doc);
      lookup[doc.uri] = doc;
    }
  }, this);
  return { index, lookup }
}

function populateResults(results: Array<lunrTypes.Index.Result>, lookup?: { [uri: string]: JsonDoc }) {
  const resultContainer = document.getElementById("search-result-container");

  // Show "No Results Found"
  if (results.length === 0) {
    resultContainer.textContent = "No Results Found.";
    return;
  }

  const resultTemplate = document.getElementById("search-result-template") as HTMLTemplateElement;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const doc = lookup[result.ref];

    let resultElement = resultTemplate.content.cloneNode(true) as HTMLElement;

    const resultTime = resultElement.querySelector(".sr-time");
    const date = new Date(doc.time);
    resultTime.setAttribute("datetime", date.toISOString());
    resultTime.textContent = date.toISOString().split("T")[0];

    const resultTitleLink = resultElement.querySelector(".sr-titlelink") as HTMLLinkElement;
    resultTitleLink.href = doc.uri;
    resultTitleLink.textContent = doc.title;

    const resultSummary = resultElement.querySelector(".sr-summary");
    resultSummary.textContent = truncate(doc.content, 70);

    resultContainer.appendChild(resultElement);

    if (i < results.length - 1) {
      const hrElement = document.createElement("hr");
      resultContainer.appendChild(hrElement);
    }
  }
}

// This matches Hugo's own summary logic:
// https://github.com/gohugoio/hugo/blob/b5f39d23b8/helpers/content.go#L543
function truncate(text: string, length: number) {
  let wordCount = 0;
  let lastWordIndex = -1;

  for (let i = 0; i < text.length; ++i) {
    const whitespaceRegex = /\s/;
    if (whitespaceRegex.test(text[i])) {
      wordCount++;
      lastWordIndex = i;
      if (wordCount >= length) {
        break;
      }
    }
  }

  if (lastWordIndex == -1) {
    return text;
  }

  let endIndex = -1;

  for (let i = lastWordIndex; i < text.length; ++i) {
    const endOfSentenceRegex = /[.?!"\n]/;
    if (endOfSentenceRegex.test(text[i])) {
      endIndex = i;
      break;
    }
  }

  if (endIndex == -1) {
    return text;
  }

  return text.substring(0, endIndex).trim();
}

window.addEventListener("DOMContentLoaded", function (event) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const queryParamKey = "q";
  const searchTerm = params[queryParamKey];

  populateSearchBar(searchTerm);
  retrieveIndex().then(function (response) {
    const { index, lookup } = buildIndex(response);
    const results = index.search(searchTerm);
    populateResults(results, lookup);
  }).catch(function (err) {
    populateResults([]);
  });
});
