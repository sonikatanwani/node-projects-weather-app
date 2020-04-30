// /**
//  * Created by m252924 on 4/26/20.
//  */

const request = require('request');

//
//
//
//
// //good input
// const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic29uaWthNyIsImEiOiJjazlobjZlMmcwd3ZzM2xwaG8wMHQyZmRpIn0.eHdOI_STYyCDkxtZO90TjA&limit=1';
//
//
// //bad input
// //const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1Ijoic29uaWthNyIsImEiOiJjazlobjZlMmcwd3ZzM2xwaG8wMHQyZmRpIn0.eHdOI_STYyCDkxtZO90TjA&limit=1';
//
//
// request({url: urlGeo, json:true}, (error, response)=>{
//
//   if(error){
//     console.log('can not connect to geolocation service');
//   }else if(response.body.features.length === 0){
//     console.log('bad  request input');
//   }else{
//     console.log(response.body.features[0].place_name);
//     console.log(response.body.features[0].center[1], response.body.features[0].center[0]);
//
//   }
//
//
// });


const geocode = (address, callback) =>{

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic29uaWthNyIsImEiOiJjazlobjZlMmcwd3ZzM2xwaG8wMHQyZmRpIn0.eHdOI_STYyCDkxtZO90TjA&limit=1`;


  request({url, json:true}, (error,{body})=>{   // here {body} is destructured property of response object
    if(error){
      callback('can not connect to geocode service');
    }else if(body.features.length === 0){
      callback('bad request input... try another input');
    }else{
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });

    }
  })

}


module.exports = {
  geocode
}