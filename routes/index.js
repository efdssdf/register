const router = require('koa-router')();
const passport = require ('passport');
const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    "_id":String,
    "password":String
}, {
    versionKey: false
})
const User =  mongoose.model('users', userSchema)

router.post('/signup', async function (ctx,next) {
    let name = ctx.request.body.name || "";
    let password = ctx.request.body.password || "";

    if(name && password){
        let doc = await User.findById(name);
        if (doc) {
            ctx.body = "signup fail"
        } else {
            await new User({_id: name, password: password}).save();
            ctx.session.user = name;
            ctx.body = "signup success"
        }
    }else{
        ctx.body = "param error"
    }
})

router.post('/login', async function (ctx,next) {
    let name = ctx.request.body.name || "";
    let password = ctx.request.body.password || "";

    let doc = await User.find({"_id":name,"password":password});
    if(doc){
        ctx.session.user = name;
        ctx.body = "login success"
    }else{
        ctx.body = "login fail"
    }
})

router.get('/list', async function (ctx,next) {
    let doc = await User.find();
    ctx.body = doc;
})

router.get('/logout', function (ctx,next) {
    ctx.session.name = "";
    ctx.body = "logout success";
})

module.exports = router
