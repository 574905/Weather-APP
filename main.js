/*
Verdiene du skal hente ut er:
- Weather - (navnet)
- From
- Description
- Wind speed
- Temperature
*/

"use strict";


//fetching the api as json
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=60.3913&lon=5.3221&appid=b5749e8dbc962119cdcddf66a3040c69&units=metric"
)
  .then((res) => {
    if (res.ok) {
      console.log("Success");
    } else {
      console.log("Fail");
    }
    return res.json();
  })
  .then((data) => {

    // making an array to store the elements, the size is the size of the list in the list in the API
    let weatherForecasts = new Array(data.list.length);

    // finding the city for the weatherforecast
    let title = document.getElementById("headline");
    title.innerHTML = "The weather forecast for: \n" + data.city.name;
    
    // getting the table from the HTML document
    let table = document.getElementById("weatherTable");
    

    for (let i = 0; i < data.list.length; i++) {

      // declaring all the variables we're after
      let dateText = data.list[i].dt_txt;
      let dateTextData = dateText.split(" ");
      let indexData = i;
      let weatherData = data.list[i].weather[0].main;
      let dateData = dateTextData[0];
      let timeData = dateTextData[1];
      let descriptionData = data.list[i].weather[0].description;
      let windspeedData = data.list[i].wind.speed;
      let temperatureData = data.list[i].main.temp;

      // inserting the data to the array
      weatherForecasts[i] = {
        index: indexData,
        weather: weatherData,
        date: dateData,
        time: timeData,
        description: descriptionData,
        windspeed: windspeedData,
        temperature: temperatureData
      };

    }

    let i = 1;
    weatherForecasts.forEach((element) => {
        
        // creating one row for each element
        const tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        
        // creating each cell and add the value
        let index  = tableRow.insertCell();
        index.innerHTML = i;

        let weather = tableRow.insertCell();
        weather.innerHTML = element.weather;

        let date = tableRow.insertCell();
        date.innerHTML = element.date;

        let time = tableRow.insertCell();
        time.innerHTML = element.time;

        let description = tableRow.insertCell();
        description.innerHTML = element.description;
        description.style.textTransform = "capitalize";

        let windspeed = tableRow.insertCell();
        windspeed.innerHTML = element.windspeed + " m/s";

        let temperature = tableRow.insertCell();
        temperature.innerHTML = element.temperature + " &#8451";

        // changing the background color based on the temperature
        if(element.temperature<10){
          temperature.style.backgroundColor = "#45b6fe";
        } else if(element.temperature>15){
          temperature.style.backgroundColor = "#eb5a46";
        }
        
        // increasing the index for each element
        i++;
        
    });

    
  })

  // catching errors and logging them in the console
  .catch((error) => {
    console.log(error);
  });


