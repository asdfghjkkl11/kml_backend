const http = require('https');
const iconv = require('iconv-lite');

getDataFromHttp = function (url){
    return new Promise( (resolve, reject) => {
        http.get(url, (res) => {
            let body = [];

            res.on('data', function(chunk) {
                body.push(chunk);
            });

            res.on('end', function() {
                let decodeHtml = iconv.decode(Buffer.concat(body), 'euc-kr')

                resolve(decodeHtml);
            });

        }).on('error', reject);
    });
}

module.exports.getDataFromHttp = getDataFromHttp;