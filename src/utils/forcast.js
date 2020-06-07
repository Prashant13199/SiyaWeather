const request = require('request')

const forcast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3b42e45a6ceeb3369dd23f1f8b2f2b56&query='+latitude+','+longitude+'&units=m'

    request({url, json: true},(error, {body}={}) => {
        if(error){
            callback('Not able to establish internet connection',undefined)
        } else if(body.error){
            callback('Not able to find location',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + '%.')
        }
    })
}
module.exports = forcast