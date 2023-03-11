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
              <div class="col-md-8 d-flex align-items-center">
                <div class="card-body">
                  <h5 class="card-title">${array.title ? array.title : "No title"}</h5>
                  <p class="card-text">${array.details.slice(0, 200)}</p>
                  <p class="card-text"><small class="text-muted">Category_id: ${array.category_id ? array.category_id : "No category"}
                  </small></p>
                    <div class = "d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center justify-content-center ">
                            <p class = "pe-3">
                                <img style="
                                margin: auto;
                                width: 8vh;
                                height: 8vh;
                                border-radius: 50%;
                                " src="${array.author.img}" alt="Logo" width="30" height="24"
                                class="d-inline-block align-text-top">
                            </p>
                            <div>
                                <h6>${array.author.name ? array.author.name : 'Sorry not found author name'}</h6>
                                <small>${array.published_date ? array.published_date : "Not find published data"}</small>
                            </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-eye"></i>
                        <h6 class = "ps-3">${array.total_view}</h6>
                        </div>

                        <div class="d-flex align-items-center justify-content-center">
                        <div> 
                        <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa fa-light fa-star"></i>  
                            <i class="fa fa-light fa-star"></i>  
                            <i class="fa fa-light fa-star"></i>  
                            <i class="fa fa-light fa-star"></i>    
                        </div>
                        <div>
                            <h6 class = "ps-3">${array.rating.number ? array.rating.number : 'no ratings yet'}</h6>
                        </div>
                        </div>

                        <div>
                            <button onclick = "loadSpecificDetails('${array._id}')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#specificDetailsModal">see more..</button>
                        </div>

                    </div>
                </div>
              </div>
            </div>
        </div>
            `
        newsContainer.appendChild(createNewsContainerDiv);
    })
}


let loadSpecificDetails = (news_id) =>{
    let url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(response => response.json())
    .then(news => displaySpecificDetails(news.data[0]))
}

let displaySpecificDetails = value =>{
    let modalTitle = document.getElementById('specificDetailsModalLabel');
        modalTitle.innerHTML = `
        <p>Title: ${value.title ? value.title : 'No title found'} </p>
        <h6>Published Date: ${value.author.published_date ? value.author.published_date : "Not yet"
        }</h6>
        <h6>Name: ${value.author.name ? value.author.name : 'No name found'} </h6>
        <h6>Total_View: ${value.total_view ? value.total_view : 'No view'} </h6>
        `;        
}

loadSpecificDetails();
