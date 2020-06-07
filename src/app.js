const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Siya-Weather',
        name: 'Prashant'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Prashant'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'Help window',
        title: 'Help',
        name: 'Prashant'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must provide an Address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }else{
            forcast(latitude, longitude, (error, forcastData) => {
                if(error){
                    return res.send({error})
                }else{
                    res.send({
                        forcast: forcastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        msg: 'Help content not found',
        title: '404 Page',
        name: 'Prashant'
    })
})

app.get('*', (req,res) => {
    res.render('404page', {
        title: '404 Page',
        msg: "Page Not Found",
        name: 'Prashant'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})