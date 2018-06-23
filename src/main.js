#!/usr/bin/env node
const fetch = require("node-fetch");
const { sum, minToDuration, formatOutput } = require("./utils");

const url = show =>
  `https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`;

async function getRuntime(show) {
  const res = await fetch(url(show));
  const {
    name,
    premiered,
    _embedded: { episodes }
  } = await res.json();
  return {
    name,
    premiered,
    runtime: sum(episodes.map(ep => ep.runtime))
  };
}

function showTitle() {
  const [, , ...rest] = process.argv;
  const title = rest.join(" ");
  if (!title) {
    console.error("usage: show-runtime TITLE");
    process.exit(1);
  }
  return title;
}

async function getOutput(show) {
  const { name, premiered, runtime } = await getRuntime(show);
  const year = new Date(premiered).getFullYear();
  const { days, hrs, mins } = minToDuration(runtime);
  return [`${name} (${year})`, formatOutput(days, hrs, mins)].join("\n");
}

(async function main() {
  try {
    const title = showTitle();
    const out = await getOutput(title);
    console.log(out);
  } catch (err) {
    console.error(err);
  }
})();
