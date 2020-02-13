const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  forecastKey: process.env.FORECAST_KEY,
  geocodeKey: process.env.GEOCODE_KEY
}