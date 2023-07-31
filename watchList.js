let movieDiv = document.querySelector(".results");
const clear = document.getElementById("clear");
let watchlist = localStorage.getItem("watchlist");

document.addEventListener("DOMContentLoaded", () => {
  const movieData = JSON.parse(localStorage.getItem("watchlist"));
  renderMovies(movieData);
});

function renderMovies(data) {
  movieDiv.innerHTML = "";
  data.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.className = "col";

    div.innerHTML = `<div class="movies-container col" id="container">
          <div class="card" style="width: 18rem;">
              <img class="card-img-top" src=${movie.Poster} alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">${movie.Title} <span class="badge bg-secondary">${movie.Year}</span></h5>
                <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${movie.imdbID}')">Add!</a>
              </div>
          </div>`;
    movieDiv.appendChild(div);
    //console.log(movieDiv)
  });
}

function clearWatchList() {
  localStorage.removeItem("watchlist");
}

clear.addEventListener("click", clearWatchList);
