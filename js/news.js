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
loadNews('Breaking News');

let displayNews = value => {
    let allNews = document.getElementById('all-news')
    value.forEach(getNews => {
        console.log(getNews);
        let createNewsDiv = document.createElement('div');
        createNewsDiv.innerHTML = `
        <p class="color">${getNews.category_name}</p> 
    `;
        allNews.appendChild(createNewsDiv);
    })
}
