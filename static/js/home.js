'use strict'

const form = document.querySelector('.search__form');
const searchField = document.querySelector('input[type="text"]');
const cardsContainer = document.querySelector('.movie__cards');
const cards = document.querySelectorAll('.movie__card');



//setting focus when page loads first time
searchField.focus();


const jsonFetch = function () {

    const options = { method : "GET" };

    const promise = new Promise((resolve, reject) => {
        fetch("/getGenres", options)
        .then( res => {
            if(res.status === 200) {
                resolve(res.json())
            }
            else {
                reject(res.statusText)
            }
        })
        .catch(error => reject(error));
    })
    return promise;
};





//event handler for form submission
form.addEventListener('submit', e => {
    e.preventDefault();

    //removing all the earlier results
    while(cardsContainer.lastChild) {
        cardsContainer.lastChild.remove();
    }

    //json to send while making post request
    const movieName = JSON.stringify({movie : searchField.value});


    //making the post request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/getMovie');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    //Check for correct info
    xhr.onload = () => {
        if(xhr.status === 200) {

            const allMovies = xhr.response["results"];

            allMovies.forEach(movie => {

                if (movie.poster_path !== null && movie.vote_average > 1) {

                    let genres = [];
                    jsonFetch().then(res => {
                        movie.genre_ids.forEach(id => {
                            genres.push(res[`${id}`]);
                        })
                        const movieInfo = `<div class="movie__card"><div class="movie__card__header">
                        <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="${movie.title}" class="movie__poster">
                        <p class="movie__vote">${(movie.vote_average*10).toFixed(0)}%</p><h3>Movie Title</h3><span>${movie.title}</span></div><div class="movie__card__footer"><div class="movie__release__date">
                        <h3>Release Date</h3><span>${movie.release_date}</span></div><div class="movie__genre"><h3>Genre</h3>
                        <span>${genres.join(', ')}</span></div><div class="movie__overview"><h3>Overview</h3><p>${movie.overview}</p>
                        </div></div></div>`;

                        cardsContainer.insertAdjacentHTML('beforeend', movieInfo);
                    });
                }
                
            })
        }
        else console.log('Did not get the expected result');
    };
    xhr.onerror = () => console.log('Connection error');
    xhr.send(movieName);
});





//when user hovers on the movie card
cardsContainer.addEventListener('mouseover', e => {
    
    if(e.target.parentNode.classList.contains('movie__card__header')) {
        const footer = e.target.parentNode.nextElementSibling;
        const yValue = getComputedStyle(footer).getPropertyValue("--y");
        
        if(yValue === "100%") footer.style.setProperty("--y", 0);
    }
});




//When user leaves the card
cardsContainer.addEventListener('mouseout', e => {

    try {
        if(e.target.parentNode.lastChild.classList.contains('movie__card__footer') || e.target.parentNode.parentNode.lastChild.classList.contains('movie__card__footer')) {
            const footer = e.target.parentNode.lastChild || e.target.parentNode.parentNode.lastChild;
            const yValue = getComputedStyle(footer).getPropertyValue("--y");
            if(yValue === "0") footer.style.setProperty("--y", "100%");
        }
    } 
    catch {
        return null;
    } 
});









