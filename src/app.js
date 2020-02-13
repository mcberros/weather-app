const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Tu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Tu'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }

      return res.send({
        forecast: forecastData,
        location: location
      })
    })
  })

  // res.send({
  //   forecast: result.forecast,
  //   location: result.location,
  //   address: req.query.address
  // })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found',
    name: 'Tu'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Page not found',
    name: 'Tu'
  })
})

app.listen(3000, () => {
  console.log('Server up')
})
