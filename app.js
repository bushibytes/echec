"use strict";

let app = require('koa')();
let views = require('co-views');
const less = require('koa-less');
const router = require('koa-router')();
const serve = require('koa-static');
const json = require('koa-json');


// x-response-time

let render = views('views', {default: 'jade'});

app
  .use(router.routes())
  .use(router.allowedMethods());

// logger

app.use(function *logger(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// koa-json for the backend
app.use(json());


// Static files + using less for our css
app.use(less('static/'));
app.use(serve('static/'));

// response
router.get('/', function *indexRoute() {
  this.body = yield render('index');
});

// API
router.get('/api/echecs', function *echecsApiRoute() {
  let echecs = [
    {id: 31, name: 'Beer fail', image: 'http://www.echec.ca/images/31.jpg'},
    {id: 32, name: 'Justin delete', image: 'http://www.echec.ca/images/32.jpg'},
    {id: 15, name: 'sudo rm *', image: 'http://www.echec.ca/images/15.jpg'},
    {id: 26, name: 'so many stickies', image: 'http://www.echec.ca/images/26.jpg'}
  ];
  this.body = echecs;
});

app.listen(3000);
