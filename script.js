//const endpoint = "https://gist.githubusercontent.com/Igor-ifrs/305a948967774524a7642c29445a5e5b/raw/ae0a34a0560a970179a31e48f6a10e287b62c778/linhas.json";
const endpoint = "/BD_linhas.json";
const request = (url) => {
  const busLines = [];
  const req = fetch(url);
  req
    .then((r) => r.json())
    .then((r) => busLines.push(...r))
    .catch((e) => console.log(`Erro na requisição! ${e}`));
  return busLines;
};
const busLines = request(endpoint);

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.nome.match(regex) || place.codigo.match(regex);
  });
}

//const numberWithCommas = (x) => {
//    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "!");
//}

function displayMatches() {
  const matchArray = findMatches(this.value, busLines);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.nome.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.codigo.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population"><a href="#">${place.id}</a></span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
