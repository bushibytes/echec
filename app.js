var app = require('koa')();
var views = require('co-views');
var less = require('koa-less');
var router = require('koa-router')();
var serve = require('koa-static');

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

var render = views('views', {
  default: 'jade'
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});


// Static files
app.use(less('static/'));
app.use(serve('static/'));

// response

router.get('/', function *(next) {
  this.body = yield render('index');
});

router.get('/goodbye', function *(next) {
  this.body = yield render('goodbye');
});

app.listen(3000);
