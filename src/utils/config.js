const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT,
  forecastKey: process.env.FORECAST_KEY,
  geocodeKey: process.env.GEOCODE_KEY
}