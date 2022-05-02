const http = require('./http_module');
const config = require('./config');

let cookie = 'b906cc9cdd8eebc89ea2100586f82d69';
let url = config.url + '/login.php';

let data = new URLSearchParams();
data.append('mstat96', cookie);
data.append('passwd', config.password);

http.postDataFromHttp(url,data);

module.exports = 'mstat96=' + cookie + ';'