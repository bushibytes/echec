var app = require('koa')();
var views = require('co-views');
var router = require('koa-router')();

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

// response

router.get('/', function *(next) {
  this.body = yield render('hello');
});

router.get('/goodbye', function *(next) {
  this.body = yield render('goodbye');
});

app.listen(3000);
