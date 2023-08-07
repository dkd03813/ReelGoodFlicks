const movieDiv = document.querySelector(".results");
const paginationDivTop = document.querySelector(".pagination"); // Updated this line
const searchForm = document.getElementById("search-form");
const searchInput = searchForm.elements[0];
const clear = document.getElementById("clear");
let currentPage = 1;
let currentSearchTerm = 'batman';

async function fetchMovies(searchTerm, page) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=12b05d9e&s=${searchTerm}&page=${page}`
    );
    const data = await response.json();
    renderMovies(data.Search);
    renderPagination(data.totalResults, searchTerm, page);
  } catch (error) {
    console.log("error", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies(currentSearchTerm, currentPage);
});

function renderMovies(data) {
  movieDiv.innerHTML = "";
  data.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "col"; // Only one 'col' class
    div.innerHTML = `<div class="movies-container" id="container"> 
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${movie.Poster} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${movie.Title} <span class="badge bg-secondary">${movie.Year}</span></h5>
              <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${movie.imdbID}')">Add!</a>
            </div>
        </div>`;
    movieDiv.appendChild(div);
  });
}

function renderPagination(totalResults, searchTerm, page) {
  const totalPages = Math.ceil(totalResults / 10);
  paginationDivTop.innerHTML = ''; // Removed reference to paginationDivBottom

  if (totalPages > 1) {
    if (page > 1) {
      const prevButton = createPaginationButton('Prev', true, () => {
        fetchMovies(searchTerm, page - 1);
      });
      paginationDivTop.appendChild(prevButton);
    }

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = createPaginationButton(i.toString(), true, () => {
        fetchMovies(searchTerm, i);
      });
      if (i === page) pageButton.classList.add('active');
      paginationDivTop.appendChild(pageButton);
    }

    if (page < totalPages) {
      const nextButton = createPaginationButton('Next', true, () => {
        fetchMovies(searchTerm, page + 1);
      });
      paginationDivTop.appendChild(nextButton);
    }
  }
}


function createPaginationButton(text, enabled, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.disabled = !enabled;
  button.className = 'page-button';
  button.addEventListener('click', onClick);
  return button;
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearchTerm = encodeURIComponent(searchInput.value);
  currentPage = 1;
  fetchMovies(currentSearchTerm, currentPage);
});

async function saveToWatchlist(id) {
  console.log("ID is ", id);
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=12b05d9e&s`
  );
  const data = await response.json();
  console.log(data);
  const movie = data;
  console.log(movie, "saved to watchlist");

  const watchlistJSON = localStorage.getItem('watchlist');
  let watchlist;
  console.log(watchlistJSON);

  if (watchlistJSON == null) {
    watchlist = [];
    watchlist.push(movie);
  } else {
    watchlist = JSON.parse(watchlistJSON);
    watchlist.push(movie);
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function clearWatchList(e) {
  e.preventDefault();
  localStorage.removeItem("watchlist");
}

clear.addEventListener("click", clearWatchList);
