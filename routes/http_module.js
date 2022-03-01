const axios = require('axios');
const iconv = require('iconv-lite');

getDataFromHttp = function (url){
    return axios.get(url, { responseType: 'arraybuffer'}).then(function (res){
       return iconv.decode(res.data, 'euc-kr');
    });
}

postDataFromHttp = function (url,data){
    return axios.post(url, data, { responseType: 'arraybuffer'}).then(function (res){
        return iconv.decode(res.data, 'euc-kr');
    });
}
module.exports.getDataFromHttp = getDataFromHttp;
module.exports.postDataFromHttp = postDataFromHttp;