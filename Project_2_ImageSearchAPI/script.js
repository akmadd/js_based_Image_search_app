
const apikey = "kIkCrylOJh7joLZkI3bDEdSBbujL7cl4DKzlhQFVqzO0t42Z5RNv3168";

const searchinput = document.querySelector(".search");
const photos = document.querySelector(".photoss");
const form = document.querySelector("form");
const more = document.querySelector(".more"); // Added 'document' before querySelector

let searchTerm;
let page = 1;
let link;
let currentSearch;

searchinput.addEventListener("input", updateValue);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchphotos(searchTerm);
    currentSearch = searchTerm; // Assign searchTerm to currentSearch
});

function updateValue(e) {
    if (e && e.target && e.target.value) {
        searchTerm = e.target.value;
        console.log(searchTerm);
    }
}

async function curated() {
    link = "https://api.pexels.com/v1/curated?page=2&per_page=15";
    const response = await fetch(link, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey
        }
    });
    const data = await response.json();
    console.log(data);
    photos.innerHTML = ""; // Clear previous search results
    
    data.photos.forEach(images => {
        const image = document.createElement("div");
        image.classList.add("photos");
        image.innerHTML = `<img src="${images.src.large}"></img> 
            <p>${images.photographer}</p>
            <a href="${images.src.original}">Download</a>`; // Fixed missing closing </a> tag
        photos.appendChild(image);
    });
}

async function searchphotos(term) {
    link = `https://api.pexels.com/v1/search?query=${term}&per_page=15`;
    const response = await fetch(link, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey
        }
    });
    const data = await response.json();
    console.log(data);
    photos.innerHTML = ""; // Clear previous search results
    searchinput.value = "";
    data.photos.forEach(images => {
        const image = document.createElement("div");
        image.classList.add("photos");
        image.innerHTML = `<img src="${images.src.large}"></img> 
            <p>${images.photographer}</p>
            <a href="${images.src.original}">Download</a>`;
        photos.appendChild(image);
    });
}

more.addEventListener("click", load);
async function load() {
    page++;
    if (currentSearch) {
        link = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`; // Fixed link assignment
    } else {
        link = `https://api.pexels.com/v1/curated?page=2&per_page=15&page=${page}`; // Fixed link assignment
    }

    const response = await fetch(link, { // Make a new request to get the next page data
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey
        }
    });
    const data = await response.json();
    console.log(data);
    photos.innerHTML = ""; // Clear previous search results

    data.photos.forEach(images => {
        const image = document.createElement("div");
        image.classList.add("photos");
        image.innerHTML = `
        <div class = "jsphoto">
        <img src="${images.src.large}"></img> 
            <p>${images.photographer}</p>
            <a href="${images.src.original}">Download</a>
        </div>
            `;
        photos.appendChild(image);
    });
}

// Call curated() to load curated photos initially
curated();
