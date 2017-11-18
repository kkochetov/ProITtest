# ProITtest

Тесты по сценарию "Авторизация в ОПН, просмотр главной страницы, переход в ТС, Экспорт отчета о состоянии обхода на дату"

Настройки, которые берутся из переменных среды:
browserName -- браузер для тестов. По умолчанию chrome.
seleniumHub -- адрес selenium сервера. По умолчанию localhost:4444. 

Развертывание:
git clone https://github.com/kkochetov/TKNOTests.git
nmp install
./node_modules/.bin/wdio

Отчет allure в папке ./allure-results

Для локального просомтра(используя allure-commandline):
npm install -g allure-commandline
allure generate 
allure open

Для просмотра в CI нужен соответствующий плагин.