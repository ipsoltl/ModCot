function settingsPage() {
    var postBody = document.getElementById('content-body');//получаем в переменную контент из консоли
    postBody.innerHTML = '';//очищаем от текста

    postBody.innerHTML =
    '<div class="input-group input-group-sm mb-3"><div class="input-group-prepend"><span class="input-group-text" id="inputGroup-sizing-sm">Введите адрес сайта</span></div><input type="text" placeholder="https://yourdomain.net" id="yourDomainId" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="yourDomain()" title="Сохранить">Сохранить</button></div>' + 
    'Ниже идут переключатели' +
    '<div class="custom-control custom-switch">' +
    '<input type="checkbox" class="custom-control-input" id="customSwitch1">' +
    '<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>' +
    '</div>' +
    '<div class="custom-control custom-switch">' +
    '<input type="checkbox" class="custom-control-input" disabled id="customSwitch2">' +
    '<label class="custom-control-label" for="customSwitch2">Disabled switch element</label>' +
    '</div>' +
    'Ниже идут переключатели' +
    '<div class="custom-control custom-checkbox">' +
    '<input type="checkbox" class="custom-control-input" id="customCheck1">' +
    '<label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>' +
    '</div>'

    //вывод домена в строке "Введите адрес сайта"
    //проверка localStorage чтобы undefined не выводилось в данной строке
    if (localStorage["yourDomain"] == undefined) {
        var domLocYuor = document.getElementById('yourDomainId');
        domLocYuor.placeholder = "https://yourdomain.net";
    } else {
        var domLocYuor = document.getElementById('yourDomainId');
        domLocYuor.value = localStorage["yourDomain"];
    }
};

//сохраним название домена для подключения
function yourDomain() {
    //переменная для записи домена
    var locYourDomain = document.getElementById('yourDomainId').value;
    localStorage["yourDomain"] = locYourDomain;
}
