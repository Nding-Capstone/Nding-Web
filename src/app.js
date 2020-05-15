var express =require('express');
var http = require('http');
var path = require('path');
var skeleton = require('./modules/extract-skeleton.js');

var app = express();
var router = express.Router();
var static = require('serve-static');
var multer = require('multer');
var cors = require('cors');
const {spawn} = require('child_process');

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

        // run skeleton python
        
        res.on('finish', function(){
            const {spawn} = require('child_process');

            console.log('skeleton 실행됨');
    
            var largeDataSet = [];
            // spawn new child process to call the python script
            // const python = spawn('python', ['test_out/script3.py']);
            const python = spawn('python', ['./models/extract_skeleton_vector.py']);
            
            // collect data from script
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                largeDataSet.push(data);
            });
            
            // in close event we are sure that stream is from child process is closed
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
               
            });
            
        });

        res.redirect('/views/loading.html');

    
        return;

    } catch(err) {
        console.dir(err.stack);
    }
}) // /process/photo

router.get('/views/loading.html', function(req, res){
    console.log('views loading');
})

app.use('/', router);

// app.use('/views/loading.html', router);


http.createServer(app).listen('3000',
function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});