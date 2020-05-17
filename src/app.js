var express = require('express');
var http = require('http');
var path = require('path');
var template = require('./template.js');
var app = express();
var router = express.Router();
var static = require('serve-static');
var multer = require('multer');
var cors = require('cors');
var mysql = require('mysql');
var qs = require('querystring');
var url = require('url');

//추가한 부분
var db = mysql.createConnection({
  host: 'localhost',
  user: 'dancearch',
  password: 'dancearch',
  database: 'dancearch'
});
db.connect();
//추가한 부분

const INPUT_VIDEO_DIRECTORY = 'uploads';
const INPUT_VIDEO_NAME = 'input.mp4';

app.use('/views', static(path.join(__dirname, 'views')));

app.use(cors());


var storage = multer.diskStorage({
  destination: function(req, file, callback) {
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


router.route('/').get(function(req, res, next) {
  console.log('hi');
  res.redirect('/views/home.html');
})

router.route('/process/videoUpload').post(upload.array('video', 1), function(req, res) {

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

  } catch (err) {
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

//추가한 부분 DB
app.get('/manager', function(request, response) {
  db.query(`SELECT * FROM Song`, function(error, Song) {
    var title = 'Dancearh';
    var description = '관리자 화면';
    var list = template.list(Song);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/manager/create">안무 등록</a>`
    );
    response.writeHead(200);
    response.end(html);
  });
});

app.get('/manager/song/:songId', function(request, response) {
  db.query(`SELECT * FROM Song`, function(error, Songs) {
    if (error) {
      throw error;
    }
    db.query(`SELECT * FROM Song WHERE id=?`, [request.params.songId], function(error2, Song) {
      if (error2) {
        throw error2;
      }
      var title = Song[0].title;
      var singer = Song[0].singer;
      var list = template.list(Songs);
      var html = template.HTML(title, list,
        `
      <h2>${Song[0].id}</h2>
      <h2>${title}</h2>
      <h3>${singer}</h3>
      <h3>${Song[0].album} 앨범</h3>
      <h3>${Song[0].link} 링크</h3>`,
        ` <a href="/manager/create">안무 등록</a>
          <a href="/manager/update/${request.params.songId}">안무 수정</a>
          <form action="/manager/delete_process" method="post">
            <input type="hidden" name="id" value="${request.params.songId}">
            <input type="submit" value="안무 삭제">
          </form>`
      );
      response.writeHead(200);
      response.end(html);
    })
  });
});

app.get('/manager/create', function(request, response) {
  db.query(`SELECT * FROM Song`, function(error,Songs){
    var title = 'Create';
    var list = template.list(Songs);
    var html = template.HTML(title, list,
      `
      <form action="/manager/create_process" method="post">
        <p><input type="text" name="id" placeholder="라벨"></p>
        <p><input type="text" name="title" placeholder="제목"></p>
        <p>
          <input type="text" name="singer" placeholder="가수">
        </p>
        <p>
          <input type="text" name="album" placeholder="앨범">
        </p>
        <p>
          <input type="text" name="link" placeholder="링크">
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/manager/create">안무 등록</a>`
    );
    response.writeHead(200);
    response.end(html);
  });
});

app.post('/manager/create_process', function(request, response) {
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query(`
        INSERT INTO Song (id, title, singer, album, link)
          VALUES(? ,?, ?, ?, ?)`,
        [post.id,post.title, post.singer,post.album,post.link],
        function(error, Song){
          if(error){
            throw error;
          }
          response.writeHead(302, {Location: `/manager/?id=${Song.insertId}`});
          response.end();
        }
      )
  });
  });

  app.get('/manager/update/:songId', function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    db.query('SELECT * FROM Song', function(error, Songs){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM Song WHERE id=?`,[request.params.songId], function(error2, Song){
        if(error2){
          throw error2;
        }
        var list = template.list(Songs);
        var html = template.HTML(Song[0].title, list,
          `
          <form action="/manager/update_process" method="post">
            <input type="hidden" name="id" value="${Song[0].id}">
            <p><input type="text" name="title" placeholder="제목" value="${Song[0].title}"></p>
            <p>
              <input type="text" name="singer" placeholder="가수" value="${Song[0].singer}">
            </p>
            <p>
              <input type="text" name="album" placeholder="앨범" value="${Song[0].album}">
            </p>
            <p>
              <input type="text" name="link" placeholder="링크" value="${Song[0].link}">
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/manager/create">안무 등록</a> <a href="/manager/update/${Song[0].id}">안무수정</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
  });
    });

app.post('/manager/update_process', function(request, response) {
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query('UPDATE Song SET title=?, singer=?, album=?, link=?  WHERE id=?', [post.title, post.singer, post.album,post.link,post.id], function(error, result){
        response.writeHead(302, {Location: `/manager/?id=${post.id}`});
        response.end();
      })
  });
});

app.post('/manager/delete_process', function(request, response) {
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query('DELETE FROM Song WHERE id = ?', [post.id], function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/manager/`});
        response.end();
      });
  });
});


//내가 추가한 부분

http.createServer(app).listen('3000',
  function() {
    console.log('Express 서버가 3000번 포트에서 시작됨!!.');
  });
