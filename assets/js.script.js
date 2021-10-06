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
