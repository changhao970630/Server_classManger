const express = require('express');
const app = express();
const port = 3000;
const userRouter  = require('./routes/user');
const DB_userConnect = require("./connect_db_user");
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use(express.urlencoded({extends:true}));
DB_userConnect.then(()=>{
    console.log('DateBase User is on');
    app.use(userRouter)
}).catch((err)=>{
    console.log(err)
});

!(async ()=>{
   let connection = await app.listen(port)
    if(connection){
        console.log('Server is On')
    }else{
        console.log('Server is Bad')
    }
})()
