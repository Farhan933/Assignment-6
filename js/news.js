//                       Navigation part 
// FAQ.. 
let loadFAQ = (isClicked) => {
    let findAccordian = document.getElementById('display-accordian');
    if (isClicked) {
        findAccordian.classList.remove('d-none');
    }
    else {
        findAccordian.classList.add('d-none');
    }
};

loadFAQ();


// All news 
let loadNews = (category_id) => {
    let url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(response => response.json())
        .then(news => displayNews(news.data.news_category))
}
loadNews();

let displayNews = value => {
    let allNews = document.getElementById('all-news')
    value.forEach(getNews => {
        // console.log(getNews);
        let createNewsDiv = document.createElement('div');
        createNewsDiv.innerHTML = `
        <p onclick = "loadDifferentCategoryNews('${getNews.category_id}')" class="color">${getNews.category_name}</p> 
    `;
        allNews.appendChild(createNewsDiv);
    })
}

// Load Different Categories News 
let loadDifferentCategoryNews = (id) => {
    let url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        fetch(url)
        .then(response => response.json())
        .then(news => displayDifferentCategoryNews(news.data))
};
loadDifferentCategoryNews();

let displayDifferentCategoryNews = value => {
    let newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ``;

    value.forEach(array => {
        console.log(array)
        let createNewsContainerDiv = document.createElement('div');
        createNewsContainerDiv.innerHTML = `
            <div class="card mb-4">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${array.thumbnail_url ? array.thumbnail_url : "No thumbnail image"}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${array.title ? array.title : "No title"}</h5>
                  <p class="card-text">${array.details.slice(0, 200)}</p>
                  <p class="card-text"><small class="text-muted">Category_id: ${array.category_id ? array. category_id : "No category"}
                  </small></p>
                </div>
              </div>
            </div>
        </div>
            `
        newsContainer.appendChild(createNewsContainerDiv);
    })
}
