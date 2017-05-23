const fetch = require('node-fetch');

async function getRuntime(show) {
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`;
  const res = await fetch(url);
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

const show = args().join(' ');
getRuntime(show).then(console.log);
