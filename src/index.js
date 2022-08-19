import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetch';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list'),
    infoEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));


function onInputSearch(e){
    cleanMarkup()
    const nameCountry = e.target.value.trim().toLowerCase();

    if(nameCountry === "") {
      cleanMarkup()
      return;
    }  
    fetchCountries(nameCountry)
      .then(countries => {
        insertMarkup(countries);
      }).catch(error => {if(error === "Error 404") {
      Notiflix.Notify.failure("Oops, there is no country with that name")
    }})
}



const createFullMarkup = item => `
  <li class="markup-item full-card">
    <img class="flag-icon" src="${item.flags.svg}" width=70px>
    <p class = "country-name"> ${item.name.official}</p>
    <ul class="country-info-board">
      <li class = "country-info-board-item">Capital: ${item.capital}</li>
      <li class = "country-info-board-item">Population: ${item.population}</li>
      <li class = "country-info-board-item">Languages: ${Object.values(item.languages)}</li>
    <ul>
  </li>
`;

const createOverwiewMarkup = item => `
  <li class="markup-item">
    <img class="flag-icon-preview" src="${item.flags.svg}" width=70px>
    <p class="country-name-preview"> ${item.name.official}</p>
  </li>
`;


function generateMarkup(array) {
    if(array.length > 10) {
        Notiflix.Notify.warning(
          "Too many matches found. Please enter a more specific name.")
    } 

    else if(array.length >= 2 && array.length <= 10){            
        return array.reduce((acc, item) => acc + createOverwiewMarkup(item), "")}

     else if(array.length === 1) {
        return array.reduce((acc, item) => acc + createFullMarkup(item), "") 
    } 
}


function insertMarkup(array) {
    const result = generateMarkup(array);
    refs.listEl.insertAdjacentHTML('beforeend', result);
}

function cleanMarkup(){
    refs.listEl.innerHTML = "";
    refs.infoEl.innerHTML = "";
}