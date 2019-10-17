const express = require('express');
const app = express();
const port = 3000;
const DB_userConnect = require("./connect_db_user");

DB_userConnect.then(()=>{
    console.log('DateBase User is on')
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
