import "./style.css";
import { handleSections } from "./handleSections.ts";
import type { selectableCategory } from "./interfaces.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h2> Star Wars</h2>
  <h5> Dun dun dun dun dun-dun dun dun-dun</h5>
     <div>Select Category</div>
    
    <select id="category-dropdown">
    <option value="" disabled selected>— Please select an option —</option>
    <option value="films">Films</option>
    <option value="planets">Planets</option>
    <option value="people">Characters</option>
    </select>

    <div id="films"></div>
    <div id="planets"></div>
    <div id="people"></div>
    </div>
`;

const dropdownSelection = document.querySelector<HTMLSelectElement>("#category-dropdown")!;

dropdownSelection.addEventListener("change", (event) => {
  const category = (event.target as HTMLSelectElement).value as selectableCategory;
  document.querySelector<HTMLDivElement>("#films")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#planets")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#people")!.style.display = "none";
  handleSections(category);
});
