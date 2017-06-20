const fetch = require('node-fetch');

const url = show =>
  `https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`;

async function getRuntime(show) {
  const res = await fetch(url(show));
  const json = await res.json();
  const { episodes } = json._embedded;
  return sum(episodes.map(ep => ep.runtime));
}

function sum(arr) {
  return arr.reduce((acc, next) => acc + next, 0);
}

function args() {
  const [_, __, ...rest] = process.argv;
  return rest;
}

const minutesToHours = min => Math.round(min / 60);

const show = args().join(' ');
getRuntime(show).then(minutesToHours).then(console.log);
