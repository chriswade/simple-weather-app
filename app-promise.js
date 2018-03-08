// REUQIRE STATMENTS
const yargs = require('yargs');
const axios = require('axios');
//----------------------//


// INPUT OPTIONS FOR APP //
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
//--------------------//


var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAyGPM2WOMSCJsdAbFsMJAvaclUA_mwRRw`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/6e44b64739e57f365e5ff8df8dd7542c/${lat},${lng}?units=si`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var icon = response.data.currently.icon;
  console.log(icon);
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;
  var high = response.data.daily.data[0].temperatureHigh;
  var low = response.data.daily.data[0].temperatureLow;
  var dailySummary = response.data.hourly.summary;

  var iconEmojies = {
    'partly-cloudy-day': '🌥 ',
    'clear-day': '☀️ ',
    'clear-night': '🌙 ',
    'rain': '🌧 ',
    'snow': '🌨 ',
    'wind': '💨 ',
    'fog': '🌫 ',
    'cloudy': '☁️ '
  };
  
  console.log('------------------------------------------');
  console.log(`${iconEmojies[icon]} ${temperature} ${summary}.`)
  console.log(`Feels like: ${apparentTemperature} | Low: ${low} | High: ${high}`);
  console.log(dailySummary);
  console.log('------------------------------------------');
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API service')
  } else {
    console.log(e.message);
  }
});