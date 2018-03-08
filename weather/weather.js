const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.forecast.io/forecast/6e44b64739e57f365e5ff8df8dd7542c/${lat},${lng}?units=si`,
        json: true
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log('---------------------------------------------');
          callback(`${body.currently.temperature} | ${body.currently.summary}`);
          callback(`Feels Like: ${body.currently.apparentTemperature} | High: ${body.daily.data[0].temperatureHigh} | Low: ${body.daily.data[0].temperatureLow}`);
          callback(`${body.hourly.summary}`);
          console.log('---------------------------------------------');
        } else {
          console.log('unable to fetch weather')
        }
      });
};

module.exports.getWeather = getWeather;