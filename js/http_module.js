const axios = require('axios');
const iconv = require('iconv-lite');

let config = {
    responseType: 'arraybuffer'
};

getDataFromHttp = function (url){
    if(global.cookie){
        config.headers = {
            cookie: global.cookie
        };
    }

    return axios.get(url, config).then(function (res){
       return iconv.decode(res.data, 'euc-kr');
    });
}

postDataFromHttp = function (url,data){
    if(global.cookie){
        config.headers = {
            cookie: global.cookie
        };
    }

    return axios.post(url, data, config).then(function (res){
        return iconv.decode(res.data, 'euc-kr');
    });
}

module.exports.getDataFromHttp = getDataFromHttp;
module.exports.postDataFromHttp = postDataFromHttp;