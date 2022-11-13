const express = require('express');
const cheerio = require('cheerio');
const http = require('../js/http_module');
const config = require('../js/config');
const util = require('../js/util');
let router = express.Router();

/* GET */
//param = year,month,quarter
router.get('/ranking', function(req, res, next) {
    let body = req.body;
    let url = config.url + body.statID + '/ranking.php';
    let query = req.url.split('?')[1];

    if(query !== undefined){
        url += '?'+query;
    }

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);
        let result_data = [];
        let table = $('table[width=100%]');

        table.each(function (){
            let result_tr = [];
            let tr = $(this).find('tr');

            tr.each(function (){
                let result_text = [];
                let div = $(this).find('td div');

                div.each(function (){
                    let text = $(this).text().trim();

                    result_text.push(text);
                });

                result_tr.push(result_text);
            });

            result_data.push(result_tr);
        });

        let header_data = [];
        let header = $('tr[bgcolor="#353f6d"] td strong');

        header.each(function (){
            let text = $(this).text().trim();
            header_data.push(text);
        })

        let result = {};

        for(let i = 0; i < header_data.length; i++){
            result[header_data[i]] = util.tableToJson(result_data[i]);
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param = year,month
router.get('/record_list', function(req, res, next) {
    let body = req.body;
    let url = config.url + body.statID + '/record_list.php';
    let query = req.url.split('?')[1];

    if(query !== undefined){
        url += '?'+query;
    }

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');

        let $ = cheerio.load(data);
        let table = $('table')[2];
        let tr = $(table).find('tr.style7');
        let result_tr = [];

        tr.each(function (){
            let result_text = [];
            let td = $(this).find('td');

            td.each(function (){
                let text = $(this).text().trim();

                result_text.push(text);
            });

            result_tr.push(result_text);
        });

        let result = util.tableToJson(result_tr);

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param id
router.get('/record_per', function(req, res, next) {
    let body = req.body;
    let url = config.url + body.statID + '/record_per.php';
    let query = req.url.split('?')[1];

    http.postDataFromHttp(url,query).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');

        let $ = cheerio.load(data);
        let result_data = [];
        let table = $('table[cellspacing="1"]');

        table.each(function (){
            let result_tr = [];
            let tr = $(this).find('tr');

            tr.each(function (){
                let result_text = [];
                let div = $(this).find('td');

                div.each(function (){
                    let text = $(this).text().trim();
                    result_text.push(text);
                });

                result_tr.push(result_text);
            });

            result_data.push(result_tr);
        });

        let temp_data = [];

        for(let i = 0; i < result_data[6].length; i++){
            if(i%2 == 0){
                temp_data.push(result_data[6][i]);
            }
        }

        result_data[6]= temp_data;

        let header_data = ['동장 성적','남장 성적','월간 성적','주간 성적','요일별 성적','시간대별 성적','전체 기록'];
        let result = {};

        for(let i = 0; i < header_data.length; i++){
            result[header_data[i]] = util.tableToJson(result_data[i]);
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param id0 id1
router.get('/record_versus_res', function(req, res, next) {
    let body = req.body;
    let url = config.url + body.statID + '/record_versus_res.php';
    let query = req.url.split('?')[1];

    http.postDataFromHttp(url,query).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');

        let $ = cheerio.load(data);
        let result_data = [];
        let table = $('table[cellspacing="1"]');

        table.each(function (){
            let result_tr = [];
            let tr = $(this).find('tr');

            tr.each(function (){
                let result_text = [];
                let div = $(this).find('td');

                div.each(function (){
                    let text = $(this).text().trim();

                    result_text.push(text);
                });

                result_tr.push(result_text);
            });

            result_data.push(result_tr);
        });

        let temp_data = [];

        for(let i = 0; i < result_data[4].length; i++){
            if(i%2 == 0){
                temp_data.push(result_data[4][i]);
            }
        }

        result_data[4]= temp_data;

        let header_data = ['A 동장 성적','A 남장 성적','B 동장 성적','B 남장 성적','전체 기록'];
        let result = {};

        for(let i = 0; i < header_data.length; i++){
            result[header_data[i]] = util.tableToJson(result_data[i]);
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});


//param = year,month,quarter
router.get('/player', function(req, res, next) {
    let body = req.body;
    let url = config.url + body.statID + '/record_per_list.php';

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);
        let result = [];
        let option = $('option');

        option.each(function (){
            let text = $(this).text().trim();
            let id = $(this).val();

            result.push({
              id: id,
              name: text
            });
        });

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

module.exports = router;
