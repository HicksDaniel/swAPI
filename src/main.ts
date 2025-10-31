import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import apiFetch from "./swFetch.ts";

// Fetch and display Star Wars films
async function displayFilms() {
  try {
    const films = await apiFetch();
    console.log(films);
    const filmsList = films
      .map(
        (film) =>
          `<div class="film">
        <h3>${film.title}</h3>
        <p>Episode ${film.episode_id}</p>
        <p>Director: ${film.director}</p>
        <ul>
          <li>Characters:</li>
          ${film.characters
            .map((characterUrl) => `<li>${characterUrl}</li>`)
            .join("")}
        </ul>
      </div>`
      )
      .join("");

    document.querySelector("#films")!.innerHTML = filmsList;
  } catch (error) {
    console.error("Error fetching films:", error);
  }
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div id="films"></div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
displayFilms();
