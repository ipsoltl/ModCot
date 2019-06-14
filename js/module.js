//************** */
//модуль ошибок
function errors() {
    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли

    postBody.innerHTML += 
        'Коды состояний:' + '<br>' +
            '200 (OK)' + '<br>' +
            '201 (Created - Создано)' + '<br>' +
            '202 (Accepted - Принято)' + '<br>' +
            '204 (No Content - Нет контента)' + '<br>' +
            '301 (Moved Permanently - Перемещено навсегда)' + '<br>' +
            '302 (Found - Найдено)' + '<br>' +
            '303 (See Other - Смотрите другое)' + '<br>' +
            '304 (Not Modified - Не изменен)' + '<br>' +
            '307 (Temporary Redirect - Временный редирект)' + '<br>' +
            '400 (Bad Request - Плохой запрос)' + '<br>' +
            '401 (Unauthorized - Неавторизован)' + '<br>' +
            '403 (Forbidden - Запрещено)' + '<br>' +
            '404 (Not Found - Не найдено)' + '<br>' +
            '405 (Method Not Allowed - Метод не разрешен)' + '<br>' +
            '406 (Not Acceptable - Неприемлемый)' + '<br>' +
            '412 (Precondition Failed - Предусловие провалено)' + '<br>' +
            '415 (Unsupported Media Type - Неподдерживаемый медиа тип)' + '<br>' +
            '500 (Internal Server Error - Внутренняя ошибка сервера)' + '<br>' +
            '501 (Not Implemented - Не реализован)';
};

//************** */
//модуль пагинации
//увеличиваем номер страницы вывода записей на еденицу
function pagPostsNext() {
    localStorage["paginatPostsNumber"] ++;
    postTen();
};

//уменьшаем номер страницы вывода записей на еденицу
function pagPostsForward() {
    if (localStorage["paginatPostsNumber"] <= 1) {
        postTen();
    } else {
        localStorage["paginatPostsNumber"] --;
        postTen();
    };
};

//************** */
//модуль поиска
function searchPosts() {
    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста

    var searchIdPosts = document.getElementById('searchId').value;
    /* console.log(searchIdPosts); */

    // Получим поисковые записи
    fetch(  apiURL + '/wp/v2/posts?search=' + searchIdPosts )
    .then( response => {
        if ( response.status !== 200 ) {
            throw new Error( 'Problem! Status Code: ' + response.status );
        }
        response.json().then( posts => {
            var step;//шаг
            var stepInner;//будет выводится строка с записью
                for (step = 0; step < 10; step++) {
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