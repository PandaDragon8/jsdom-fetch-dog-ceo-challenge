console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json=>{
        const parent = document.getElementById('dog-image-container')
        json.message.forEach(imgSrc => {
        const elem = document.createElement('img')
        elem.src = imgSrc
        parent.appendChild(elem)

        })
    })

    const breedUrl = 'https://dog.ceo/api/breeds/list/all'


    let breeds = {}
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => { 
        //first step
        message = json.message

        //second step = render
        renderBreeds(message)

    })
const dropdown = document.getElementById('breed-dropdown')
dropdown.addEventListener('change', e => {
    
    renderBreeds(message, dropdown.value)
})
})

function renderBreeds(message, startsWith=''){
    const parent = document.getElementById('dog-breeds')
    while (parent.firstChild){
        parent.removeChild(parent.lastChild)
    }
    Object.keys(message).forEach(breed => {
        if (message[breed].length !== 0){
            if (startsWith !== '' && startsWith === breed[0]){
                return
            } 
            const BreedElem = document.createElement('li')
            BreedElem.textContent = breed
            parent.appendChild(BreedElem)

        const ul = document.createElement('ul')
        message[breed].forEach(subBreed => {
            const subElem = document.createElement('li')
            subElem.textContent = subBreed
            ul.appendChild(subElem)

            subElem.addEventListener('click', e => {
                subElem.style.color = 'green'
            })
        })
        BreedElem.appendChild(ul)

        } else {
        if (startsWith !== '' && startsWith === breed[0]){
            return
        }    
        const elem = document.createElement('li')
        elem.textContent = breed
        parent.appendChild(elem)

        elem.addEventListener('click', e => {
            elem.style.color = 'green'
        })

        }
    })
    
}