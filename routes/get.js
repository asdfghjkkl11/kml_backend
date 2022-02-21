const express = require('express');
const cheerio = require('cheerio');
const http = require('./http_module');
const config = require('../config');
let router = express.Router();

/* GET home page. */
//param = year,month,quarter
router.get('/ranking', function(req, res, next) {
    let url = config.url + '/ranking.php';
    let query = req.url.split("?")[1];
    if(query !== undefined){
        url += "?"+query;
    }

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);
        let result_data = [];
        let table = $("table[width=100%]");

        table.each(function (){
            let result_tr = [];
            let tr = $(this).find("tr");
            tr.each(function (){
                let result_text = [];
                let div = $(this).find("td div");
                div.each(function (){
                    let text = $(this).text();
                    result_text.push(text);
                });
                result_tr.push(result_text);
            });
            result_data.push(result_tr);
        });

        let header_data = [];
        let header = $("tr[bgcolor='#353f6d'] td strong");
        header.each(function (){
            let text = $(this).text();
            header_data.push(text);
        })
        let result = {};
        for(let i = 0; i < header_data.length; i++){
            result[header_data[i]] = tableToJson(result_data[i]);
        }
        res.send(result);
    }).catch(function(err) {
        // epic fail, handle error here
    });
});

//param = year,month
router.get('/record_list', function(req, res, next) {
    let url = config.url + '/record_list.php';
    let query = req.url.split("?")[1];
    if(query !== undefined){
        url += "?"+query;
    }

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);

        let table = $("table")[2];

        let tr = $(table).find("tr.style7");
        let result_tr = [];
        tr.each(function (){
            let result_text = [];
            let td = $(this).find("td");
            td.each(function (){
                let text = $(this).text();
                result_text.push(text);
            });
            result_tr.push(result_text);
        });

        let result = tableToJson(result_tr);

        res.send(result);
    }).catch(function(err) {
        // epic fail, handle error here
    });
});

module.exports = router;

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