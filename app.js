const Koa = require('koa');
const app = new Koa();

const bodyparser = require('koa-bodyparser');
const session = require('koa-session2');
const router = require('./routes/index');

app.use(bodyparser());
app.use(session({
    maxAge: 1000 * 60 * 60
},app));
app.use(router.routes());

const mongoDB = require("./util/mongodb.js");
mongoDB.init();

app.listen(3000);
console.log("service listen 3000")
