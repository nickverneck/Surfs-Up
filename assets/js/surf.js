
// let's create a object where holds all the urls needed for the API calls
const surfline = {
    url: "https://services.surfline.com",
    searchUrl: "https://services.surfline.com/search/site?q=",
    forecastWave: "https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=",
    forecastWind: "https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=",
    forecastWeather: "https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=",
    forecastTide: "https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=",
    report: "https://services.surfline.com/kbyg/spots/reports?spotId=",
    nearby: "https://services.surfline.com/kbyg/spots/nearby?spotId=",
    closest: " https://services.surfline.com/kbyg/mapview/spot?" //needs lat & lon

}
var beachLat ;
    var beachLong ;
// lets create a function that will grab the Surf Report data from surfline
function fetchReport(id) {
    fetch(surfline.report + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderReport(data);
        })
}
// this function will render the report values into the main page
// 
function renderReport(data) {
   console.log(data)
    var currentTideT = data.forecast.tide.type;// low, normal or high tide
    var currentTideH = data.forecast.tide.height + ' FT';
    var waterTemp = data.forecast.waterTemp.min + '-' + data.forecast.waterTemp.max + ' F';
    var weatherTemp = data.forecast.weather.temperature+" F";
    var weatherCond = data.forecast.weather.condition;// returns clear, rainy, thunderstorm etc
    var surfCond = data.forecast.conditions.value;  //returns poor(aka not worth going)poor to fair(maybe worth looking at) fair(you should check) good(dude go to the beach)or EPIC (make an excuse at work and wake up 5am to go surfing allday)
    var waveType = data.forecast.waveHeight.humanRelation; // returns waist high, shoulder high , head high or overhead when sh* is going down.
    var waveHeight = data.forecast.waveHeight.min + '-' + data.forecast.waveHeight.max + ' FT';
    var windSpeed = data.forecast.wind.speed+" Knots";
    var windDir = data.forecast.wind.direction;
    var beachName = data.spot.name;
   beachLat = data.spot.lat;
     beachLong = data.spot.long;
     var html = "<h1 class='title is-1'>"+beachName+"</h1><button id='location-btn' class='button is-primary'>Get Directions</button>"+
     '<button class="button is-warning" >Add to Favorites</button>'+
     "<h3 class='title is-5'>Wave Height: "+waveHeight+"</h3>"+
     "<h3 class='title is-5'>Wind Speed: "+windSpeed+"</h3>"+
     "<h3 class='title is-5'>Weather Temperature: "+weatherTemp+"</h3>"+
     "<h3 class='title is-5'>Water Temperature: "+waterTemp+"</h3>"+
     "<h2 class='title is-4'>Surf Condition: " + surfCond + " "+waveType+"</h2>";
     $(".beachInfoDiv").html(html);
    

}

// this one is to fetch data from nearby spots from a certain ID
 function fetchNearby(id) {
    fetch(surfline.nearby + id)
        .then( function (response) {
            return  response.json();
        })
        .then( function (api) {
          renderNearby(api);
          
        })
};

// lets render the data fetched nearbyspots.
// we create a list element

// once we get the data we will limit the length otherwise too many options will appear
// but if the lengh is less than the value we set just use the length
// then with the data we populate the list element
function renderNearby(api) {
 

    var length;
    if (api.data.spots.length >= 5) {
        length = 5;
    }
    else {
        length = api.data.spots.length
    }
    var h2El = document.createElement("h2")
    $(h2El).text("Nearby Beaches");
    $(h2El).attr("class","title is-4")
    var ulEl = document.createElement("Ul")
    $(ulEl).attr("class","menu-list")
    console.log(h2El)
    for (i = 0; i < length; i++) {
        var spotName = api.data.spots[i].name;
        var liEl = document.createElement("li")
        $(liEl).text(spotName);
        ulEl.append(liEl);

    }
    $(".nearbyDiv").html("");
    $(".nearbyDiv").append(h2El);
    $(".nearbyDiv").append(ulEl);
    

}

 
function fetchClosest(id) {
    return fetch(surfline.closest + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
}
