const express = require('express');

const app= express();
app.use((req,res)=> {
    res.json({message: 'Your requete is recieve'});
});
module.exports=app;