const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')
var utils = require("../support/utils");

Given(/^Я перехожу в систему ОПН \((.*)\)$/, function(url) {
    browser.url(url);
  });

When(/^Я авторизовываюсь под логином \"(.*)\" и паролем \"(.*)\"$/, function(login, password){
browser.element('input#username').setValue(login)
       .element('input#password').setValue(password)
       .click('button#enterBtn');
});

/*
* Страница выбора подсистем -- особые элементы меню. Их наличие и проверяется. 
*/
Then(/^Я попадаю на страницу выбора подсистем$/, function(){
  assert.isTrue(browser.isExisting('div.link-container'));
  assert.isTrue(browser.isExisting('a#ip'));
  assert.isTrue(browser.isExisting('a#ts'));
  assert.isTrue(browser.isExisting('a#nmmag'));
  assert.isTrue(browser.isExisting('a#nifl'));
  assert.isTrue(browser.isExisting('a#widget'));
  assert.isTrue(browser.isExisting('a#ipp'));
})

When(/^Я перехожу по ссылке \"(.*)\"$/, function(text){
  browser.click('*=' + text);
});

/*
* Такое решение, потому что browser.waitForVisible('*=' + text, 5000); не работает по непонятным мне причинам.
* Перед сравнением, в строке из cucumber заменяются <something> согласно правилам из utils
*/
Then(/^Я ожидаю, что на странице содержится текст \"(.*)\"$/, function(text){
  browser.waitForVisible('div#waiting-block',15000,true);
  var body = browser.element('body').getText();
  assert.isTrue(body.indexOf(utils.processString(text)) !== -1);
})


/*
* Два разных типа разделов: на однин надо кликать, на второй просто наводить мышку.
* Соответственно и разные действия.
*/
When(/^Я выбираю в меню раздел \"(.*)\"$/, function(text){
  var element =  browser.element('*=' + text);
  if (element.getAttribute('class') == 'arrow-right-bold'){
    element.moveToObject();
  } else {
    element.click();
  }
});

When(/^Я нажимаю кнопку \"Экспорт\"$/, function(){
    browser.click('div.export_tree');
}); 

When(/^Я выбираю вкладку \"(.*)\"$/, function(text){
  browser.click('label='+text);
  browser.waitForVisible('div#waiting-block',15000,true);
});

When(/^Я ввожу в поле \"Период от\" значение \"(.*)\"$/, function(dateFrom){
  browser.element('input#startDateBox').setValue(dateFrom);
});

When(/^Я ввожу в поле \"Период до\" значение \"(.*)\"$/, function(dateTo){
  browser.element('input#endDateBox').setValue(dateTo);
});

When(/^Я нажимаю кнопку \"Показать\"$/, function(){
    browser.click('div.tree_btn-panel');
}); 

/*
* Проверяем, скачался ли файл. Функция isFileDownloaded возвращает ture, если файл есть.
*/
Then(/^Я ожидаю, что происходит скачивание файла$/, function(){
  assert.isTrue(utils.isFileDownloaded('report.zip', 40000));
});