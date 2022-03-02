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

module.exports.tableToJson = tableToJson;