/**
 * Created by m252924 on 4/26/20.
 */

const request = require('request');


// const url = 'http://api.weatherstack.com/current?access_key=b144d53c4daf516f5f168e98b758c8f3&query=37.7749,122.4194';
//
// //bad url
// //const url = 'http://api.weatherstack.com/current?access_key=b144d53c4daf516f5f168e98b758c8f3&query=';
//
// request({ url : url, json:true}, (error, response)=>{
//   if(error){
//     console.log('can not connect to weather service');
//   }else if(response.body.error){
//     console.log('bad  request input');
//   }else{
//     console.log(`it is currently ${response.body.current.temperature} degrees outside but if feels like ${response.body.current.feelslike} degrees`);
//
//   }
// });



//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })


const forecast = (latitude, longitude, callback) =>{

  const url = `http://api.weatherstack.com/current?access_key=b144d53c4daf516f5f168e98b758c8f3&query=${latitude},${longitude}`;


  request({url:url, json:true}, (error,response)=>{
      if(error){
        callback('can not connect to weather service');
      }else if(response.body.error){
        callback('bad request input... try another input');
      }else{
        callback(undefined, `:  it is currently ${response.body.current.temperature} degrees outside but if feels like ${response.body.current.feelslike} degrees. The humidity outside is: ${response.body.current.humidity} `);

  }
  })

}


module.exports = {
   forecast
}