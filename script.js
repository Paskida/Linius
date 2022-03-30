//to comment later
//'use strict';

// install npm 


const filmsContainer = document.querySelector('.movies__films');
const btnSort = document.querySelector('.movies__btn--sort');

// Operating Sorted with Button
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  getFilmData();
  sorted = !sorted;
});

// The sort by rating is done using vote_average
const renderFilms = function (films, sort = false) {
    filmsContainer.innerHTML = '';
    sorted ? btnSort.innerText =  "Sort by Recommended" : btnSort.innerText = "Sort by rating";
    const data = sort ? films.sort((a, b) => b.vote_average - a.vote_average) : films;

    data.forEach(film => {
        // html template
    const html = `
        <div class="film">
            <img class="film__image" src="https://image.tmdb.org/t/p/w500${film.poster_path}"></img>
            <div class="film__title">${film.title}</div>
            <div class="film__text film__release_date"> <span> Release Date </span> ${film.release_date}</div>
            <div class="film__overview">${film.overview}</div>
            <div class="film__text film__vote_average"> <span> Vote Average </span> ${film.vote_average}</div>
            <div class="film__text film__vote_count"> <span> Vote Count </span> ${film.vote_count}</div>
        </div>
    ` 
    // Insert html into DOM
    filmsContainer.insertAdjacentHTML('beforeend', html);
    })
}

// Fetch the data
const getFilmData = function() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=da121199725440259154d6300c26b14e&language=en-US&page=1')
    .then(response => response.json())
    .then(data => renderFilms(data.results, sorted)) 
    .catch(err => alert(err))
}

getFilmData();

