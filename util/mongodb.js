//MongoDB驱动模块
var mongoose = require ('mongoose');

function init(){
    mongoose.connect('mongodb://127.0.0.1:27017/testdb');

    mongoose.connection.once("open",function(err,result){
        console.log("database has connected !");
    });
}

module.exports =  {
    init:init
};
