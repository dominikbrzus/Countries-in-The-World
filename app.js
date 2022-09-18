const area = document.querySelector('.area')
const countryName = document.querySelector('.area__title');
const population = document.querySelector('.area__population');
const capital = document.querySelector('.area__capital');
const continent = document.querySelector('.area__continent');
const currencies = document.querySelector('.area__currencies');
const countryBtn = document.querySelector('.countries__btn');
const selectFilter = document.querySelector('.countries__select')
const countryInput = document.querySelector('.countries__input');
const APIaddress = 'https://restcountries.com/v3.1/all'

async function fetchAPI(API, arrayAPI, limitCountries, nameObj) {
    area.innerHTML = ``
    try {
        const apiURL = API
        const response = await fetch(apiURL);
        const data = await response.json()
        arrayAPI = data

        if (nameObj == 'filterPopulation') {
            arrayAPI.sort((a, b) => {
                return b.population - a.population
            })
        } else if (nameObj == 'filterArea') {
            arrayAPI.sort((a, b) => {
                return b.area - a.area
            })
        }
        for (let i = 0; i < limitCountries; i++) {
            area.innerHTML += `<div class="area__card">
        <img src="${arrayAPI[i].flags.svg}" alt="${arrayAPI[i].name.common}" class="area__flag">
        <h2 class="area__title">${API === APIaddress ? arrayAPI[i].name.common : arrayAPI[i].name}</h2>
        <p class="area__population"><strong>Population:</strong> ${arrayAPI[i].population.toLocaleString('en')}</p>
        <p class="area__capital"><strong>Capital:</strong> ${arrayAPI[i].capital}</p>
        <p class="area__continent"><strong>Continent:</strong> ${arrayAPI[i].region}</p>
        <p class="area__km2"><strong>Area:</strong> ${arrayAPI[i].area.toLocaleString('en')} km2</p>
    </div>`
        }
    } catch {
        area.innerHTML = `<p style="grid-column: 1/4;text-align: center; margin: 2rem auto;">Please enter the valid name of country</p>`
    }
}

function generateAllCountries() {
    let myArr;
    fetchAPI(APIaddress, myArr, 9)
}
generateAllCountries()

function generateCountry() {
    let countryArr;
    fetchAPI(`https://restcountries.com/v2/name/${countryInput.value}`, countryArr, 1)
    countryInput.value = ''
}

function filterCountriesPopulation() {
    let arrName = 'filterPopulation';
    let arrPopulation;
    fetchAPI(APIaddress, arrPopulation, 9, arrName)
}

function filterCountriesArea() {
    let arrName = 'filterArea';
    let arrArea;
    fetchAPI(APIaddress, arrArea, 9, arrName)
}

countryBtn.addEventListener('click', generateCountry)
document.body.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        generateCountry()
    }
})


selectFilter.addEventListener('input', (e) => {
    if (e.target.value === 'Filter by population') filterCountriesPopulation()
    else if (e.target.value === 'Filter by area') filterCountriesArea()
    else if (e.target.value === 'Random countries') generateAllCountries()
    countryInput.value = ''
})