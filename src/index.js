document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

fetchBeers();


});

function fetchBeers(){

    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(beersJson => iterateBeers(beersJson))
}

function iterateBeers(beersArray){

    beersArray.forEach(beer => {
        // debugger
        listBeer(beer)
        // renderBeer(beer)
    });
}



function listBeer(beer){
// debugger
    const ul = document.getElementById('list-group')
    const li = document.createElement('li')

    li.setAttribute('class', 'list-group-item')
    li.innerText = beer.name
    ul.append(li)

    li.addEventListener('click', function(e){
        //when clicked displays information for single beer
        renderBeer(beer)
    })

}

function renderBeer(beer){
// debugger
    const beersDetailDiv = document.getElementById('beer-detail')
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const textarea = document.createElement('textarea')
    const editBtn = document.createElement('button')

    //clear previous beer
    beersDetailDiv.innerHTML = ''

    div.id = beer.id
    h1.innerText = beer.name
    img.src = beer.image_url
    h3.innerText = beer.tagline
    textarea.innerText = beer.description
    editBtn.id = 'edit-beer'
    editBtn.class = 'btn btn-info'
    editBtn.innerText = 'Save'

    beersDetailDiv.append(div, h1, img, h3, textarea, editBtn)

    saveDesc(editBtn, textarea, beer)

// <h1>Beer Name</h1>
// <img src="<add beer img url here>">
// <h3>Beer Tagline</h3>
// <textarea>Beer Description</textarea>
// <button id="edit-beer" class="btn btn-info">
//   Save
// </button>
}

function saveDesc(editBtn, textarea, beer){
    // debugger
    editBtn.addEventListener('click', function(e){
        const newDesc = textarea.value
        textarea.innerText = newDesc

    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        body: JSON.stringify({description: newDesc})
    })
    .then(res => res.json())
    .then(descNew => console.log(descNew))
    })
}