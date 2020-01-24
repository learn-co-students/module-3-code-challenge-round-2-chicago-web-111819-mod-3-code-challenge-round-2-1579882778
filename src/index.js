const beersURL = 'http://localhost:3000/beers/'
const masterListBeers = document.querySelector('ul#list-group')
const beerDetailDiv = document.querySelector('div#beer-detail')

function main () {
    document.addEventListener('DOMContentLoaded', () => {

        getBeers()
    })
}

function getBeers () {
    fetch(beersURL)
        .then(resp => resp.json())
        .then(beerObjs => renderBeers(beerObjs))
}

function renderBeers(beerObjs) {
    beerObjs.forEach(beerObj => renderBeer(beerObj))
}

function renderBeer(beerObj) {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = beerObj.name
    li.dataset.id = beerObj.id

    masterListBeers.append(li)
}

masterListBeers.addEventListener('click', (e) => {
    fetch(beersURL+e.target.dataset.id)
        .then(resp => resp.json())
        .then(beerObj => displayBeerDetails(beerObj))
})

function displayBeerDetails(beerObj) {
    while (beerDetailDiv.firstElementChild) {
        beerDetailDiv.removeChild(beerDetailDiv.firstElementChild)
    }

    const h1 = document.createElement('h1')
    h1.innerText = beerObj.name

    const img = document.createElement('img')
    img.src = beerObj.image_url

    const h3 = document.createElement('h3')
    h3.innerText = beerObj.tagline

    const textarea = document.createElement('textarea')
    textarea.innerText = beerObj.description 

    const button = document.createElement('buttton')
    button.id = 'edit-beer'
    button.className = 'btn btn-info'
    button.innerText = 'Save'

    beerDetailDiv.append(h1, img, h3, textarea, button)
}


main()