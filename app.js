"use strict";

let app = require('koa')();
let views = require('co-views');
const less = require('koa-less');
const router = require('koa-router')();
const serve = require('koa-static');
const json = require('koa-json');
const assert = require('assert');
const rethink = require('rethinkdb')

// x-response-time
let render = views('views', {default: 'jade'});


// logger
app.use(function *logger(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// Get DB connection
app.use(createConnection);

// koa-json for the backend
app.use(json());


// Static files + using less for our css
app.use(less('static/'));
app.use(serve('static/'));


app
  .use(router.routes())
  .use(router.allowedMethods())

// response
router
  .get('/', function *indexRoute() {
    this.body = yield render('index');
  })
  .get('/api/echecs', getEchecs)
  .post('/api/echecs/:id/vote', voteEchec)
  .post('/api/echecs', createEchec);

function* voteEchec(next) {
  let id = this.params.id;
  let votes = 2;
  try{
    var cursor = yield rethink.db('echecs').table('echecs').filter({id: id}).update({votes: rethink.row("votes").add(1)}).run(this.db);
    var result = yield cursor.toArray();
    this.body.result
  }
  catch(e) {
    this.status = 500;
    this.body = e.message || http.STATUS_CODES[this.status];
  }
  yield next;
}

function* createEchec(next) {
}

function* getEchecs(next) {
  try{
    var cursor = yield rethink.db('echecs').table('echecs').run(this.db);
    var result = yield cursor.toArray();
    this.body = result;
  }
  catch(e) {
    this.status = 500;
    this.body = e.message || http.STATUS_CODES[this.status];
  }
  yield next;
}


// Close db connection
app.use(closeConnection);

function* createConnection(next) {
  try{
    var conn = yield rethink.connect({ host: 'localhost', port: 28015 });
    this.db = conn;
  }
  catch(e) {
    this.status = 500;
    this.body = e.message || http.STATUS_CODES[this.status];
  }
  yield next;
}

function* closeConnection(next) {
  this.db.close();
}

app.listen(3000);
