const API__URL = "https://fakestoreapi.com"
const sC = document.querySelector(".single__content")


async function fetchData(api) {
    let pram = new URLSearchParams(window.location.search)
    let id = pram.get("id")

    const data = await fetch(`${api}/products/${id}`)
    data
        .json()
        .then(res => createContent  (res))
        .then(err => console.log(err))

    
}

fetchData(API__URL)


function createContent(data) {
    console.log("ok");

    console.log(data);

    sC.innerHTML = `
    <div class="">
        <img src=${data.image} alt="">
    </div>
    <div class="">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <button>Buy now</button>
    </div>
    `
}