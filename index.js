const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { redirect } = require('react-router-dom')
app.set('view engine' ,'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname ,'public')));

app.get('/' ,(req,res)=>{
    fs.readdir(`./files` ,(err , files)=>{
      res.render('index',{files: files})
    })
})
app.get('/file/:username' ,(req,res)=>{
    fs.readFile(`./files/${req.params.username}`,"utf-8" ,(err, fileData)=>{
      res.render('show' ,{filename: req.params.username,
        fileData : fileData})
    })
})
app.get('/file/delete/:filename' ,(req,res)=>{
  fs.unlink(`files/${req.params.filename}` ,(err)=>{
    if(err) throw err;
    res.redirect("/")
  })
 
})
app.post('/create' ,(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , (err)=>{
       res.redirect("/")
    }) 
})


app.listen(3000)