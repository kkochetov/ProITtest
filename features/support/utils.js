var fs = require('fs');

var replaceHash = {
    'текущая дата': function(){
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        return dd + '.' + mm + '.' + yyyy; 
    }
}

function checkIfFileExist(path){
    if (fs.existsSync(path)) return true;
    return false;
}

function sleep(ms){
    var waitTill = new Date(new Date().getTime() + ms);
    while(waitTill > new Date()){}
}

/**
* Проверяет, появился ли файл за указанный таймаут.
* Если есть -- удаляет его и возвращает true.
* @param {string} file - Имя файла.
* @param {number} timeout - Таймаут в ms.
* @return {boolean} результат проверки файла.
*/
exports.isFileDownloaded = function(file, timeout){
    var time = 0;
    var filePath = process.cwd() + '\\download\\' + file;
    while(time < timeout){
        if (checkIfFileExist(filePath)){
            fs.unlinkSync(filePath);
            return true;
        }
        sleep(50);
        time += 50;
    }
    return false;
}

/**
* Заменяет <something> в строке согласно ключам из replaceHash.
* @param {string} str - Входная строка.
* @return {string} Обработанная сторка.
*/
exports.processString = function(str){
    for (var key in replaceHash) {
        str = str.replace('<'+key+'>', replaceHash[key]());
    }
    return str;
}