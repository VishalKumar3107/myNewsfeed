const btns = [
    { btn: document.getElementById('headingbtn1'), category: '' },
    { btn: document.getElementById('btn1'), category: 'politics' },
    { btn: document.getElementById('btn2'), category: 'science' },
    { btn: document.getElementById('btn3'), category: 'automobile' },
    { btn: document.getElementById('btn4'), category: 'world' },
    { btn: document.getElementById('btn5'), category: 'sports' },
    { btn: document.getElementById('btn6'), category: 'business' }
];

btns.forEach(({ btn, category }) => {
    btn.addEventListener('click', () => fetchNewsApi(category));
});


async function fetchNewsApi(category) {
    var y = document.querySelector(".new_news_box");
    var x = document.querySelector(".loader");
    var z = document.querySelector(".category_btn");

    x.style.display = "block";

    try {
        let headers = new Headers([
            ['Content-Type', 'application/json'],
            ['Accept', 'application/json']
        ]);

        let request = new Request(`https://inshorts.deta.dev/news?category=${category}`, {
            method: 'GET',
            headers: headers
        });
        let result = await fetch(request);
        let apiResponse = await result.json();
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "block";

        let htmlCode = '';

        apiResponse.data.forEach(val => {
            htmlCode = htmlCode + `<div class="news_box">
            <div class="news_category">
    Category: ${category}</div>
    <div class="news_box_title">
      <h2 id="new_news_title" style="margin:0;">${val.title}</h2>
    </div>
    <div class="news_box_media" style="display:flex;">
      <img id="new_img" src=${val.imageUrl} style="width:30%; height:auto;" />
      <div id="new_news_content" class="news_box_content" style="width:70%; padding:10px;">
        <p id="new_news_content" style="font-weight:bold">${val.content}<a href=${val.url} target="_blank">continue reading...</a></p>
        <button id="save_news" style="margin-top:10px;"><i class="fa-solid fa-heart"></i></button>
      </div>
    </div>
    <hr style="border-top: 1px solid white;">
  </div>`;
        });


        const Newscard = document.querySelector(".new_news_box");
        Newscard.innerHTML = htmlCode;
        console.log(apiResponse)
    } catch (err) {
        console.log(err)
    }

    // const saveNewsButton = document.querySelectorAll('#save_news');

    // for (let i = 0; i < saveNewsButton.length; i++) {
    //     saveNewsButton[i].addEventListener('click', function () {
    //         let newsTitle = this.parentNode.parentNode.querySelector('#new_news_title').textContent;
    //         let newsContent = this.parentNode.parentNode.querySelector('#new_news_content').textContent;
    //         let newsImageUrl = this.parentNode.parentNode.querySelector('#new_img').src;
    //         let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    //         savedNews.push({ title: newsTitle, content: newsContent, imageUrl: newsImageUrl });
    //         localStorage.setItem('savedNews', JSON.stringify(savedNews));
    //     });
    // }

    // const savedNewsPage = document.getElementById('headingbtn2');
    // savedNewsPage.addEventListener('click', function () {
    //     let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    //     let htmlCode = '';
    //     savedNews.forEach(news => {
    //         htmlCode = htmlCode + `<div class="news_box"> <div class="news_box_title"> 
    //         <h2 id="new_news_title" style="margin:0;">${news.title}</h2> </div> 
    //         <div class="news_box_media" style="display:flex;"> 
    //         <img id="new_img" src=${news.imageUrl} style="width:30%; height:auto;" /> 
    //         <div id="new_news_content" class="news_box_content" style="width:70%; padding:10px;"> 
    //         <p id="new_news_content" style="font-weight:bold">${news.content}</p> </div> 
    //         </div> <hr style="border-top: 1px solid white;"> </div>`;
    //     });

    //     const newsContainer = document.querySelector('.new_news_box');
    //     newsContainer.innerHTML = htmlCode;
    // });

    const savedNewsPage = document.getElementById('headingbtn2');
    savedNewsPage.addEventListener('click', function () {
        let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
        let htmlCode = '';
        savedNews.forEach((news, index) => {
            htmlCode = htmlCode + `<div class="news_box"> 
            <div class="news_box_title"> 
              <h2 id="new_news_title_${index}" style="margin:0;">${news.title}</h2> 
            </div> 
            <div class="news_box_media" style="display:flex;"> 
              <img id="new_img_${index}" src=${news.imageUrl} style="width:30%; height:auto;" /> 
              <div id="new_news_content_${index}" class="news_box_content" style="width:70%; padding:10px;"> 
                <p id="new_news_content_${index}" style="font-weight:bold">${news.content}</p>
                <button id="delete_news_${index}" style="margin-top:10px;">Delete News</button>
              </div> 
            </div> 
            <hr style="border-top: 1px solid white;"> 
          </div>`;
        });

        const Newscard = document.querySelector(".new_news_box");
        Newscard.innerHTML = htmlCode;

        const deleteNewsButton = document.querySelectorAll('#delete_news');

        for (let i = 0; i < deleteNewsButton.length; i++) {
            deleteNewsButton[i].addEventListener('click', function () {
                let index = this.id.split('_')[2];
                let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
                savedNews.splice(index, 1);
                localStorage.setItem('savedNews', JSON.stringify(savedNews));
                location.reload();
            });
        }
    });


}
