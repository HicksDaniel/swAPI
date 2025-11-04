import "./style.css";
import { displayFilms } from "./handleSections.ts";

let i_needed_to_change_something_to_create_a_pull_requests;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h2> Star Wars</h2>
  <h5> Dun dun dun dun dun-dun dun dun-dun</h5>
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

displayFilms();
