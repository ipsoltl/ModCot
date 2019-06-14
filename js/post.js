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