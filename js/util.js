const iconv = require('iconv-lite');

tableToJson = function (table){
    let json = [];
    if(table.length > 1) {
        for (let i = 1; i < table.length; i++) {
            let object = {};
            for (let j = 0; j < table[i].length; j++) {
                object[table[0][j]] = table[i][j];
            }
            json.push(object);
        }
    }else{
        let object = {};
        for (let i = 0; i < table[0].length; i++) {
            object[table[0][i]] = null;
        }
        json.push(object);
    }

    return json;
}

getFormData = function (object){
    let result = new URLSearchParams();

    for(let key in object){
        result.append(key,object[key]);
    }

    return result;
}

encodeKR = function (str){
    let buf = iconv.encode(str, 'euc-kr');

    let result = '';
    for(let i = 0; i < buf.length; i++){
        result += '%' + buf[i].toString('16');
    }

    result = result.toUpperCase();
    return result;
}

module.exports.tableToJson = tableToJson;
module.exports.getFormData = getFormData;
module.exports.encodeKR = encodeKR;