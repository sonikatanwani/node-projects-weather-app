/**
 * Created by m252924 on 4/27/20.
 */

const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const hbs = require('hbs');

//setting up  paths for express
const publicPath = path.join('__dirname', '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.use(express.static(publicPath));

// setting view engine, and handlebar template views and  partails,
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req,res) =>{
  res.render('',{header:'weather app ',headerText:'welcome to  weather app' });
})

app.get('/about', (req,res) =>{
  res.render('about',{header:'about',headerText:'about weather app' });
})

app.get('/help', (req,res) =>{
  res.render('help',{header:'help ',headerText:'weather app help',message:'this is a very basic weather app...... type in your city and/or state and it will show the outside actual temperature and apparent temp'});
})



app.get('/weather', (req,res) =>{

  if(!req.query.address){
    return res.send({
      error : 'address is not provided'
    })
  }
    geocode.geocode(req.query.address, (error, geocodeData) =>{
      if(error){
        return res.send({error:error});
      }

      forecast.forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData)=>{
        if (error){
          return res.send({error:error});
        }

        res.send({
          forecast: forecastData,
          address:req.query.address,
          location: geocodeData.location
        })

      });


    })


})


app.get('/help/*', (req,res) =>{
  res.render('404', {header:'404',headerText:'404 page header','404message':'help page not found'});
})



app.get('/*', (req,res) =>{
  res.render('404', {header:'404',headerText:'404 page header','404message':'page not found'});
})


app.listen(3000,()=>{console.log('server running on port 3000')});