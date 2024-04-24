const loading = document.querySelector(".loading")
const seeMore = document.querySelector(".btn__see-more")
const wrapper = document.querySelector(".wrapper")
let limitCount = 8
let count = 1

const API__URL = "https://fakestoreapi.com"

createLoadingItem(limitCount)
async function fetchData(api) {
    const data = await fetch(`${api}/products?limit=${limitCount * count}`, {
        method: "GET"
    })

    data 
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(()=>{
            loading.style.display = "none"
            seeMore.innerHTML = "See more"
            seeMore.removeAttribute("disabled")
        })
}

fetchData(API__URL)

seeMore.addEventListener("click", ()=>{ 
    count++
    fetchData(API__URL)
    seeMore.innerHTML = "Loading..."
    seeMore.setAttribute("disabled", true)
})

function createCard(data) {
    let cards = ""
    
    data.forEach(product => {
        cards += `
        <div class="card">
        <img class="card__image" data-id=${product.id} src="${product.image}" alt="">
            <div class="rating">
                <h3>${product.rating.rate}</h3>
            </div>
    <div class="n">
        <h3 class="card__title">${product.title}</h3>
        <p class="card__price">${product.price}$</p>
    </div>

           
            <button class="card__btn">Buy now</button>
        </div>

        `
    }); 
    wrapper.innerHTML = cards
}

wrapper.addEventListener("click", (e)=>{
    if(e.target.className === "card__image"){
        let id = e.target.dataset.id
        window.open(`./pages/products.html?id=${id}`, "_self")
    }
})



function createLoadingItem(count) {
        let loadingItems = ""
        for(let i =0; i < count; i++){
            loadingItems += `
            <div class="loading__item">
                <div class="loading__image bg__animation"></div>
                <div class="loading__title bg__animation"></div>
                <div class="loading__title bg__animation"></div>
            </div>
            `
        }
        loading.innerHTML = loadingItems
}

createLoadingItem(8)

