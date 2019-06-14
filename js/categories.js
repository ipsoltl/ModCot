//получение категорий/рубрик
function categoriesAll() {
    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста

    //удаляем кнопки пагинации
    var ell=document.getElementById("paginationPosts");
    ell.style.display="none";

    // Получим категории/рубрики
fetch(  apiURL + '/wp/v2/categories/' )
.then( response => {
    if ( response.status !== 200 ) {
        throw new Error( 'Problem! Status Code: ' + response.status );
    }
    response.json().then( categories => {
        var step;//шаг
        var stepInner;//будет выводится строка с категорией
        var categoriesLength = categories.length;//подсчет категрий
            for (step = 0; step < categoriesLength; step++) {
            // Запускается цикл "categoriesLength" раз, с шагом 1.
            stepInner = '<a href="#" id=' + " " + (categories[step].id) + " " + 'onclick="postContentCategories(this)">' + (categories[step].name) + '</a>' + '<br>';
            postBody.innerHTML += stepInner;
            };
        /* console.log(categories); */
    });
})
.catch(function(err) {
    /* console.log( 'Error: ', err );//тут разработать страницу ошибок */
    postBody.innerHTML = ( 'Error: ', err ) + '<br>';
        errors();
});
};

//выводим записи/статьи из конкретной рубрики
function postContentCategories(ths) {
    var catIdCont = ths.id;//получаем id выбранной категории


    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста
    var locPostNumber;//количество выводимых записей
    var locPagePostsNumber;//номер страницы вывода записей

    //выводим кнопки пагинации
    var ell=document.getElementById("paginationPosts");
    ell.style.display="block";

    //проверяем в localStorage номер страницы вывода записей
    if (localStorage.getItem("paginatPostsNumber") === null) {
        localStorage["paginatPostsNumber"] = 1;
        locPagePostsNumber = localStorage["paginatPostsNumber"];
    } else {
        locPagePostsNumber = localStorage["paginatPostsNumber"];
    };

    //проверяем в localStorage количество записей на странице
    if (localStorage.getItem("sumPostNumber") === null) {
        localStorage["sumPostNumber"] = 5;
        locPostNumber = localStorage["sumPostNumber"];
    } else {
        locPostNumber = localStorage["sumPostNumber"];
    };

    // Получим записи категории
    fetch(  apiURL + '/wp/v2/posts?categories=' + catIdCont + '&page=' + locPagePostsNumber + '&per_page=' + locPostNumber )
    .then( response => {
        if ( response.status !== 200 ) {
            throw new Error( 'Problem! Status Code: ' + response.status );
        }
        response.json().then( posts => {
            var step;//шаг
            var stepInner;//будет выводится строка с записью
                for (step = 0; step < locPostNumber; step++) {
                // Запускается цикл "postNumber" раз, с шагом 1.
                stepInner = '<a href="#" id=' + " " + (posts[step].id) + " " + 'onclick="postContent(this)">' + (posts[step].title.rendered) + '</a>' + '<br>';
                postBody.innerHTML += stepInner;
                };
            /* console.log(posts); */
        });
    })
    .catch(function(err) {
        /* console.log( 'Error: ', err );//тут разработать страницу ошибок */
        postBody.innerHTML = ( 'Error: ', err ) + '<br>';
        errors();
    });
};


