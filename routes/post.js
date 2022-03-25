const express = require('express');
const cheerio = require('cheerio');
const http = require('../js/http_module');
const config = require('../js/config');
const util = require('../js/util');
let router = express.Router();

/* POST */
//param
// game_length: 1
// wind[0]: 0
// nickname:
// nick0: 1
// point[0]: 0
// wind[1]: 1
// nickname1:
// nick1: 2
// point[1]: 0
// wind[2]: 2
// nickname2:
// nick2: 3
// point[2]: 0
// wind[3]: 3
// nickname3:
// nick3: 4
// point[3]: 0
// common_point: 0
router.post('/record_ok', function(req, res, next) {
    let url = config.url + '/record_ok.php';
    let body = util.getFormData(req.body);

    http.postDataFromHttp(url,body).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);
        let a = $('a');
        let id = a[1].attribs.href.split('?id=')[1];
        let result = {
            id: id
        };

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param
// modify_id: 90
// game_length: 1
// wind[0]: 0
// nick[0]: 1
// point[0]: 0
// wind[1]: 1
// nick[1]: 2
// point[1]: 0
// wind[2]: 2
// nick[2]: 3
// point[2]: 0
// wind[3]: 3
// nick[3]: 4
// point[3]: 0
// common_point: 0
router.post('/record_modify_ok', function(req, res, next) {
    let url = config.url + '/record_modify_ok.php';
    let body = util.getFormData(req.body);

    http.postDataFromHttp(url,body).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let $ = cheerio.load(data);
        let a = $('a');
        let id = a[1].attribs.href.split('?id=')[1];
        let result = {
            id: id
        };

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param = id
router.post('/record_del', function(req, res, next) {
    let body = req.body;
    let url = config.url + '/record_del.php?id=' + body.id;

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let result = {
            result: 'fail'
        };

        if(data.indexOf(body.id + ' 번 기록이 삭제 되었습니다.') !== -1){
            result = {
                result: 'success'
            }
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param = id
router.post('/record_res', function(req, res, next) {
    let body = req.body;
    let url = config.url + '/record_res.php?id=' + body.id;

    http.getDataFromHttp(url).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let result = {
            result: 'fail'
        };

        if(data.indexOf(body.id + ' 번 기록이 복원 되었습니다.') !== -1){
            result = {
                result: 'success'
            }
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

//param
// nick
router.post('/registid_ok', function(req, res, next) {
    let url = config.url + '/registid_ok.php';
    let body = req.body;
    let data = 'nick=' + util.encodeKR(body.nick);

    http.postDataFromHttp(url,data).then(function(data) {
        data = data.replaceAll('\n','').replaceAll('\t','');
        let result = {
            result: 'fail'
        };

        if(data.indexOf(body.nick + ' 님이 등록 되셨습니다.') !== -1){
            result = {
                result: 'success'
            }
        }

        res.send({'code':200, 'data':result});
    }).catch(function(err) {
        res.send({'code':500, 'error':err.message});
    });
});

module.exports = router;
