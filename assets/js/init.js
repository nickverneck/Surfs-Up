$(document).ready(function() {

    var userLat;
    var userLon;
    var userCity;
    var cityID;
    var beachName;
    var beachID;
  
    // Gets the coordinates of the user's latitude, longitude, and city then stores them as variables.
    function getLocation() {

        var requestURL = "https://services.surfline.com/geo-target/region";

        fetch(requestURL)
        .then(function(response) {
           
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            userLat = data.location.latitude;
            userLon = data.location.longitude;
            userCity = data.city.name;
    ////////////////////////////////////////////////////////////////////////////////////////////////////

            // Gets the current city id and stores it as a variable for later use.
            var requestURL2 = "https://services.surfline.com/kbyg/mapview/spot?lat=" + userLat + "&lon=" + userLon + "";

            fetch(requestURL2)
            .then(function(response) {
                
                return response.json();
            })
            .then(function (data2) {
                console.log(data2);
                beachID = data2.spot._id;
                console.log(beachID);
                beachName= data2.spot.name;
                fetchReport(beachID);
                fetchNearby(beachID);
            });
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // Test function to check that variables are stored. Automatically called at the end of getLocation()
    function print(){
        console.log(userLat);
        console.log(userLon);
        console.log(userCity);
        console.log(cityID);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    getLocation();

    // Creates a map based on the user's current location
    // let map;

    // function initMap() {
    // map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: userLat, lng: userLon },
    //     zoom: 12,
    // });
    // }
// close modal with mapp
$('.close-modal').on("click", function(){
  $('.modal').removeClass("is-active");

});
// 


    $('.beachInfoDiv').on("click","#location-btn", initMap);
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    // Creates a map centered on the user's location then draws a connecting line to the beach in question.
    // Directions are printed in a panel on the right side
    var directionsService;
    var directionsRenderer;
    var endPoint;

    function initMap() {
    
      $('.modal').attr("class","modal is-active");
        document.getElementById("directionsPanel").innerHTML = "";
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        userLoc = new google.maps.LatLng(userLat, userLon);
        endPoint = new google.maps.LatLng(beachLat, beachLong);
        var mapOptions = {
          zoom: 12,
          center: userLoc
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById('directionsPanel'));
        calcRoute();
      }
      
      function calcRoute() {
        var request = {
          origin: userLoc,
          destination: endPoint,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(result);
          }
         
        });
    }  
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

})
