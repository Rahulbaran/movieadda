'use strict'

const form = document.querySelector('.search__form');
const searchField = document.querySelector('input[type="text"]');




//event handler for form submission
form.addEventListener('submit', e => {
    e.preventDefault();

    //json to send while making post request
    const movieName = JSON.stringify({movie : searchField.value});


    //making the post request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/getMovie');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    //Check for correct info
    xhr.onreadystatechange = () => {
        if(xhr.status === 200) console.log(xhr.response);
        else console.log('Did not get the expected result');
    };

    xhr.onerror = () => console.log('Connection error');
    xhr.send(movieName);
});