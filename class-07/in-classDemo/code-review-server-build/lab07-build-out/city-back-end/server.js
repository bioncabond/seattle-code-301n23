'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
// Like REACT: import weather from './data/weather.json'

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

//Setup your routes
app.get('/', (request, response) => response.status(200).send('This is the root.  Nothing exciting here'));

app.get('/weather', handleWeather);

//At the end if no routes match
app.get('*', (request, response) => {
  response.status(404).send('Page not found.  Try something else');

});

function handleWeather(request, response) {
  console.log('query params:', request.query);

  let { lat, lon, s } = request.query;

  //console.log(lat, lon, s);
  let foundCity = weather.find(element => element.city_name.toLowerCase() === s.toLowerCase());
  //console.log('foundCity:', foundCity);
  //console.log('weatherForecast:', foundCity.data);
  try {
    const weatherArray = foundCity.data.map(day => new Forecast(day));

    console.log(weatherArray);
    response.status(200).send(weatherArray);
  }
  catch (error) {
    console.log('Cannot find city');
    response.status(404).send('Unable to locate city');
  }


  //let lat = request.query.lat;
  //console.log(lat);
  //response.status(200).send('Weather here');
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
  }
}
//Listen on the port for requests from the client

app.listen(PORT, () => console.log('Listening on Port', PORT));