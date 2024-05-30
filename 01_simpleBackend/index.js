require('dotenv').config()
const express = require('express')
// this is used in commonjs  
// import express from 'express'
//this is used in modulejs

const app = express()
//app is a powerfull variable
// now app can use every functionality of express 
const port = 3000
//port is used to run app on specific port

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// this is here an get request

app.get('/twitter', (req, res) => {
    res.send(`<a href="https://twitter.com/AnuragKumar_Dev">Twitter Link Here</a>`)
})

app.get('/youtube', (req, res) => {
    res.send(`<a href="https://www.youtube.com/channel/UC8huBHWP2FMwcHbePod0oeg">Youtube Link Here</a>`)
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
//this here is listen method