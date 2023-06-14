let lati = null;
let longi = null;
const lc = $("#location");
const c_day = $("#c_day");
const c_month = $("#c_month");
const c_year = $("#c_year");

window.onload = function () {

  //Get current  location

  navigator.geolocation.getCurrentPosition((potition) => {
    lati = potition.coords.latitude;
    longi = potition.coords.longitude;

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=0deab009cb7a417381c155910231405&q=${lati},${longi}`,
      {
        method: "GET",
        mode: "cors"
      }
    ).then(
      (res) => {
        return res.json();
      }
    ).then((data) => {
      lc.text(data.location.name + ", " + data.location.country);
      $("#c_temp").text(data.current.temp_c);
      $("#wSpeed").text(data.current.wind_kph);
      $("#c_RH").text(data.current.humidity);
      $("#weatheIcon").attr("src", data.current.condition.icon);

      $(".ht5").text(Math.floor(data.forecast.forecastday[0].hour[4].temp_c));
      $(".hw5").attr("src", data.forecast.forecastday[0].hour[4].condition.icon);

      $(".ht6").text(Math.floor(data.forecast.forecastday[0].hour[5].temp_c));
      $(".hw6").attr("src", data.forecast.forecastday[0].hour[5].condition.icon);

      $(".ht9").text(Math.floor(data.forecast.forecastday[0].hour[8].temp_c));
      $(".hw9").attr("src", data.forecast.forecastday[0].hour[8].condition.icon);

      $(".ht12").text(Math.floor(data.forecast.forecastday[0].hour[11].temp_c));
      $(".hw12").attr("src", data.forecast.forecastday[0].hour[11].condition.icon);

      $(".ht15").text(Math.floor(data.forecast.forecastday[0].hour[14].temp_c));
      $(".hw15").attr("src", data.forecast.forecastday[0].hour[14].condition.icon);

      $(".ht18").text(Math.floor(data.forecast.forecastday[0].hour[17].temp_c));
      $(".hw18").attr("src", data.forecast.forecastday[0].hour[17].condition.icon);

      $(".ht21").text(Math.floor(data.forecast.forecastday[0].hour[20].temp_c));
      $(".hw21").attr("src", data.forecast.forecastday[0].hour[20].condition.icon);

    })


    //Get next 3 day weather data;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    fetch(`http://api.weatherapi.com/v1/forecast.json ?key=0deab009cb7a417381c155910231405&q=${lati},${longi}&days=3`)
      .then(response => response.json())
      .then(data => {
        for (i = 0; i < 3; i++) {
          $("#day" + i).text(daysOfWeek[new Date(data.forecast.forecastday[i].date).getDay()]);
          $("#tempDay" + i).text(data.forecast.forecastday[i].day.avgtemp_c);
          $("#humiDay" + i).text(data.forecast.forecastday[i].day.avghumidity);
          $(".weatherIconDay" + i).attr("src", data.forecast.forecastday[i].day.condition.icon);
        }
      })
      .catch(error => {
        // Handle any errors
      });

    //Historical data
    getDate();



  })

  // Get current date and time
  var currentDate = new Date();
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  c_day.text(currentDate.getDate());
  c_month.text(monthNames[currentDate.getMonth()]);
  c_year.text(currentDate.getFullYear());


}

function getDate(){
  date=$('#dataPicker')
  dt=date.val();
  fetch(
    `http://api.weatherapi.com/v1/history.json ?key=0deab009cb7a417381c155910231405&q=Kegalle&dt=${dt}`
  ).then(response => response.json())
  .then(data => {
    
    $("#histTemp").text(data.forecast.forecastday[0].day.avgtemp_c);
    $(".histWS").text(data.forecast.forecastday[0].day.maxwind_kph);
    $("#histRH").text(data.forecast.forecastday[0].day.avghumidity);
    $(".histWI").attr("src", data.forecast.forecastday[0].day.condition.icon);

    console.log(data.forecast.forecastday[0].hour[4].temp_c)

    $(".hht5").text(Math.floor(data.forecast.forecastday[0].hour[4].temp_c));
      $(".hhw5").attr("src", data.forecast.forecastday[0].hour[4].condition.icon);

      $(".hht6").text(Math.floor(data.forecast.forecastday[0].hour[5].temp_c));
      $(".hhw6").attr("src", data.forecast.forecastday[0].hour[5].condition.icon);

      $(".hht9").text(Math.floor(data.forecast.forecastday[0].hour[8].temp_c));
      $(".hhw9").attr("src", data.forecast.forecastday[0].hour[8].condition.icon);

      $(".hht12").text(Math.floor(data.forecast.forecastday[0].hour[11].temp_c));
      $(".hhw12").attr("src", data.forecast.forecastday[0].hour[11].condition.icon);

      $(".hht15").text(Math.floor(data.forecast.forecastday[0].hour[14].temp_c));
      $(".hhw15").attr("src", data.forecast.forecastday[0].hour[14].condition.icon);

      $(".ht18").text(Math.floor(data.forecast.forecastday[0].hour[17].temp_c));
      $(".hw18").attr("src", data.forecast.forecastday[0].hour[17].condition.icon);

      $(".hht21").text(Math.floor(data.forecast.forecastday[0].hour[20].temp_c));
      $(".hhw21").attr("src", data.forecast.forecastday[0].hour[20].condition.icon);
    
  })

  const options = {
    // Required: API key
    key: 'Y0KYgezyUwpUCgFeRK3FV1nnrJILZcyB', // REPLACE WITH YOUR KEY !!!
  
    // Put additional console output
    verbose: true,
  
    // Optional: Initial state of the map
    lat: lati,
    lon: longi,
    zoom: 10,
  };
  windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff
  
    const { map } = windyAPI;
    // .map is instance of Leaflet map
  
    L.popup()
        .setLatLng([lati, longi])
        .setContent(data.location.name + ", " + data.location.country)
        .openOn(map);
  });
  
}


