var appUrl = localStorage["yourDomain"];
var apiURL = appUrl + 'wp-json';


function postTen() {
    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста
    postBody.innerHTML = 'Загрузка';//выводим текст
    var locPostNumber;//количество выводимых записей
    var locPagePostsNumber;//номер страницы вывода записей

    //запускаем прелоадер
    /* preloader(); */

    //удаляем кнопки пагинации
    var ell=document.getElementById("paginationPosts");
    ell.style.display="none";
    //выводим кнопки пагинации
    /* var ell=document.getElementById("paginationPosts");
    ell.style.display="block"; */

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

    // Получим последние записи
    fetch(  apiURL + '/wp/v2/posts?page=' + locPagePostsNumber + '&per_page=' + locPostNumber )
    .then( response => {
        if ( response.status !== 200 ) {
            throw new Error( 'Problem! Status Code: ' + response.status );
        }
        response.json().then( posts => {
            setTimeout (function() {
            var step;//шаг
            var stepInner;//будет выводится строка с записью
            var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
            postBody.innerHTML = '';//очищаем от текста
                        for (step = 0; step < locPostNumber; step++) {
                            // Запускается цикл "postNumber" раз, с шагом 1.
                            stepInner = '<a href="#" id=' + " " + (posts[step].id) + " " + 'onclick="postContent(this)">' + (posts[step].title.rendered) + '</a>' + '<br>';
                            postBody.innerHTML += stepInner;
                        };
                        //выводим кнопки пагинации
                        var ell=document.getElementById("paginationPosts");
                        ell.style.display="block";
            }, 3000);
            /* console.log(posts); */
        });
    })
    .catch(function(err) {
        /* console.log( 'Error: ', err );//тут разработать страницу ошибок */
        postBody.innerHTML = ( 'Error: ', err ) + '<br>';
        errors();
    });
};

//просмотр записи/статьи
function postContent(ths) {
    
    var postIdCont = ths.id;//получаем id выбранной записи

    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста

    //удаляем кнопки пагинации
    var ell=document.getElementById("paginationPosts");
    ell.style.display="none";

    fetch(  apiURL + '/wp/v2/posts/' + postIdCont )
        .then( response => {
            if ( response.status !== 200 ) {
                throw new Error( 'Problem! Status Code: ' + response.status );
            }
            response.json().then( post => {
                postBody.innerHTML = '<h3>' + (post.title.rendered) + '</h3>' + '<br>' + (post.content.rendered) + '<br>';
            });
        })
        .catch(function(err) {
            /* console.log( 'Error: ', err );//тут разработать страницу ошибок */
            postBody.innerHTML = ( 'Error: ', err ) + '<br>';
            errors();
        });
};