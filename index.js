

const movieDiv = document.querySelector(".results");
const searchForm = document.getElementById("search-form");
const searchInput = searchForm.elements[0]; 
const clear = document.getElementById("clear");
// console.dir(movieDiv);
document.addEventListener("DOMContentLoaded", async () => {
  //use fetch to get an array of movies from OMDB

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=12b05d9e&s=batman`
    );
    const data = await response.json();
    console.log(data);
    renderMovies(data.Search);
  } catch (error) {
    console.log("error", error);
  }
});

function renderMovies(data) {
  movieDiv.innerHTML = "";
  data.forEach((movie) => {
    //  console.log(movie);
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
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Search");

//Event listener on the search form, waiting for the user to input a valid input

//we selected searchInput (the input tag), letting searchTerm equal whatever the user has put into the field

  let searchTerm = encodeURIComponent(searchInput.value);
  console.log(searchTerm);


  //Now, we fetch and call the api and await for it to respond with the data
  try {
    const response = await fetch(
      //the above try catch is almost like a landing page, always displaying anime movies

      //This one allows the users to choose the movies they want to display by appending the search term to the back of the url
      //changing url here to help git pages load the api call
      `https://www.omdbapi.com/?apikey=12b05d9e&s=${searchTerm}`
    );
    //once we have our response data, set a variable data to the request so that we can use it
    const data = await response.json();
  
    console.log(data);
    renderMovies(data.Search);
    
  } catch (error) {
    console.log("error",error)
  }


});

async function saveToWatchlist(id) {

  console.log("ID is ", id)
  const response = await fetch (
    `https://www.omdbapi.com/?i=${id}&apikey=12b05d9e&s`
  );
const data = await response.json();
console.log(data);
const movie = data;
console.log(movie, "saved to watchlist")

const watchlistJSON = localStorage.getItem('watchlist');
let watchlist;
console.log(watchlistJSON);

 // watchlistJSON will be null if its the very first item in the watchlist
  if (watchlistJSON == null) {
    // watchlist becomes an empty array
    watchlist = [];
    //pushing movie onto that array
    watchlist.push(movie);
  } else {
    //watchlist becomes whatever is stored in local storage if it is not null
    watchlist = JSON.parse(watchlistJSON);
    watchlist.push(movie);
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));


}

function clearWatchList(e) {
  e.preventDefault()
  localStorage.removeItem("watchlist");
}


clear.addEventListener("click", clearWatchList)