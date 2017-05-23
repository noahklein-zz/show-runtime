const fetch = require('node-fetch');

async function getRuntime(show) {
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${show}&embed=episodes`;
  const res = await fetch(url);
  const json = await res.json();
  const runtimes = json._embedded.episodes.map(ep => ep.runtime);
  return sum(runtimes);
}

function sum(arr) {
  return arr.reduce((acc, next) => acc + next, 0);
}

getRuntime(process.argv[2]).then(minutes => console.log('minutes long: ', minutes))
