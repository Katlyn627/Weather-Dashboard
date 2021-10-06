// Created value of the input
let city = $("#searchTerm").val();
// Stored api key value
const apiKey = "&appid=555a36d1f858be938ee83320ea75e621";
let date = new Date();

$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

  $('#forecastH5').addClass('show');

  // Get value of input from user
  city = $("#searchTerm").val();
  
  // Clear the input box
  $("#searchTerm").val("");  

  // URL call to API
  const queryUrl = "https://home.openweathermap.org/api_keys" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

    console.log(response)

    console.log(response.name)
    console.log(response.weather[0].icon)

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF))

    console.log(response.main.humidity)

    console.log(response.wind.speed)

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });
//   Created make list function for weather list
  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }
// Created get current conditions function
  function getCurrentConditions (response) {

    // Get temp and convert to F
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();
// Create and set the content values for weather stats
const card = $("<div>").addClass("card");
const cardBody = $("<div>").addClass("card-body");
const city = $("<h4>").addClass("card-title").text(response.name);
const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

//Add values to the page
city.append(cityDate, image)
cardBody.append(city, temperature, humidity, wind);
card.append(cardBody);
$("#currentCity").append(card)

}