import "./style.css";

import { renderFilms } from "./films/film-renderer.ts";
import { renderPlanets } from "./planets/planet-renderer.ts";
import { characterRender } from "./characters/character-renderer.ts";
import { login, initAuth0 } from "./Login/Auth0.ts";

const auth0Client = await initAuth0();
if (
  !(await auth0Client.isAuthenticated()) &&
  !window.location.search.includes("code=")
) {
  login();
} else {
  const user = await auth0Client.getUser();
  debugger;
  console.log(user);
}

const dropdownSelection =
  document.querySelector<HTMLSelectElement>("#category-dropdown")!;
const contentSection = document.querySelector<HTMLDivElement>("#content")!;

dropdownSelection.addEventListener("change", async (event) => {
  const category = (event.target as HTMLSelectElement).value;
  contentSection.innerHTML = "";

  switch (category) {
    case "films":
      const filmHtml = await renderFilms(auth0Client);
      contentSection.innerHTML = filmHtml;
      break;
    case "planets":
      const planetHtml = await renderPlanets();
      contentSection.innerHTML = planetHtml;
      break;
    case "people":
      const characterHtml = await characterRender();
      contentSection.innerHTML = characterHtml;
      break;
  }
});
