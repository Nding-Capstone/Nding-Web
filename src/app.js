var express =require('express');
var http = require('http');
var path = require('path');

var app = express();
var router = express.Router();
var static = require('serve-static');
var multer = require('multer');
var cors = require('cors');

const INPUT_VIDEO_DIRECTORY = 'uploads';
const INPUT_VIDEO_NAME = 'input.mp4';

app.use('/views', static(path.join(__dirname, 'views')));

app.use(cors());


var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, INPUT_VIDEO_DIRECTORY);
    },
    filename: function(req, file, callback) {
        callback(null, INPUT_VIDEO_NAME);
    }
})

var upload = multer({
    storage: storage,
    limits: {
        files: 1,
    }
})


router.route('/').get(function(req, res, next){
    console.log('hi');
    res.redirect('/views/home.html');
})

router.route('/process/videoUpload').post(upload.array('video', 1), function(req, res){

    console.log('/process/videoUpload 호출');

    try {
        var files = req.files;
        console.dir(req.files[0]);

        var originalname = '';
        var filename = '';
        var mimetype = '';
        var size = 0;

        originalname = files[0].originalname;
        filename = files[0].filename;
        mimetype = files[0].mimetype;
        size = files[0].size;

        //res.redirect('/views/loading.html');

    } catch(err) {
        console.dir(err.stack);
    }
}) // /process/photo

router.route('/views/loading.html').get(function(res, req, next) {
    res.redirect('/process/extractSkeletoneVector');
})

router.route('/process/extractSkeletoneVector').get(function(res, req, next) {
    console.log('/precess/extractSkeletoneVector 호출됨');
})

app.use('/', router);

http.createServer(app).listen('3000',
function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});