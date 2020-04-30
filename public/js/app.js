/**
 * Created by m252924 on 4/28/20.
 */

console.log('hi from app.js');






const weatherForm = document.querySelector('form');

const searchElement = document.querySelector('input');

const message1= document.querySelector('#message1');

const message2= document.querySelector('#message2');


weatherForm.addEventListener('submit',(e)=>{

  e.preventDefault();

  const searchLocation = searchElement.value;

  const url = `http://localhost:3000/weather?address=${searchLocation}`;

  fetch(url).then( (response)=>{
    response.json().then((data)=>{

      if(data.error){
       // console.log(data.error)   // will display on browser console as it is client side
        message1.textContent = data.error;
        message2.textContent = '';

      }else{
        // console.log(data.address);
        // console.log(data.location);
        // console.log(data.forecast);

        message1.textContent = data.location;
        message2.textContent = data.forecast;

      }


    })
  })


})