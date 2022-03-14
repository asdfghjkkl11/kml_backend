const http = require('./http_module');
const config = require('./config');

let cookie = 'b906cc9cdd8eebc89ea2100586f82d69';
let url = config.url + '/login.php';
let query = {
    'mstat96': cookie,
    'passwd': config.password
};

http.postDataFromHttp(url,query);

module.exports = 'mstat96=' + cookie + ';'