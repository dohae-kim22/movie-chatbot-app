import Component from "../core/component";
import movieStore, { searchMovies } from "../store/movie";

export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
    <input value='${movieStore.state.searchText}' placeholder='Enter movie title...'/>
    <button class="btn">Search!</button>
    `;

    const inputEl = this.el.querySelector("input");
    inputEl?.addEventListener("input", () => {
      movieStore.state.searchText = inputEl.value;
    });
    inputEl?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });

    const btnEl = this.el.querySelector("button");
    btnEl?.addEventListener("click", () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });
  }
}
