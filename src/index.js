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

    const button = document.createElement('button')
    button.id = 'edit-beer'
    button.className = 'btn btn-info'
    button.innerText = 'Save'
    button.dataset.id = beerObj.id

    beerDetailDiv.append(h1, img, h3, textarea, button)
}

beerDetailDiv.addEventListener('click', (e) => {
    if (e.target.matches("button")) {
        const bodyObj = {
            description: e.target.previousElementSibling.value
        }

        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(bodyObj)
        }

        fetch(beersURL+e.target.dataset.id, reqObj)
            .then(resp => resp.json())
            .then(updatedBeerObj => {
                alert(`${updatedBeerObj.name}'s beer description was updated!`)
                renderBeer(updatedBeerObj)
            })
    }    
})



main()