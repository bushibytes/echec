var app = require('koa')();
var views = require('co-views');
var less = require('koa-less');
var router = require('koa-router')();
var serve = require('koa-static');
var json = require('koa-json');


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

// koa-json for the backend
app.use(json());


// Static files + using less for our css
app.use(less('static/'));
app.use(serve('static/'));

// response
router.get('/', function *(next) {
  this.body = yield render('index');
});

// API
router.get('/api/echecs', function *(next) {
  var echecs = [
    {id:31, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
    {id:32, name:'Justin delete', image:'http://www.echec.ca/images/32.jpg'},
    {id:15, name:'sudo rm *', image:'http://www.echec.ca/images/15.jpg'},
    {id:26, name:'so many stickies', image:'http://www.echec.ca/images/26.jpg'}
  ];
  this.body = echecs;
});

app.listen(3000);
