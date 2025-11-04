import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { filmsDisplay, planetsDisplay, characterDisplay } from "./pages/displays.ts";

// Fetch and display Star Wars films
async function displayFilms() {
  const hideAllSections = () => {
    document.querySelector<HTMLDivElement>("#films")!.style.display = "none";
    document.querySelector<HTMLDivElement>("#planets")!.style.display = "none";
    document.querySelector<HTMLDivElement>("#characters")!.style.display = "none";
  };

  const dynamicDisplay = (category: string = "") => {
    hideAllSections();

    switch (category) {
      case "":
        return;
      case "films":
        document.querySelector<HTMLDivElement>("#films")!.style.display = "block";
        filmsDisplay("films");
        break;
      case "characters":
        document.querySelector<HTMLDivElement>("#characters")!.style.display = "block";
        characterDisplay("people");
        break;
      case "planets":
        document.querySelector<HTMLDivElement>("#planets")!.style.display = "block";
        planetsDisplay("planets");
        break;
    }
  };

  const dropdownSelection = document.querySelector<HTMLSelectElement>("#category-dropdown")!;

  try {
    dropdownSelection.addEventListener("change", (event) => {
      const selectedCategory = (event.target as HTMLSelectElement).value;
      dynamicDisplay(selectedCategory);
    });
  } catch (error) {
    console.error("Error:", error);
  }

  hideAllSections();
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
    <div>Select Category</div>
    <select id="category-dropdown">
    <option value="">Select</option>
    <option value="films">Films</option>
    <option value="planets">Planets</option>
    <option value="characters">Characters</option>
    </select>

    <div id="films"></div>
    <div id="planets"></div>
    <div id="characters"></div>
    </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
displayFilms();
