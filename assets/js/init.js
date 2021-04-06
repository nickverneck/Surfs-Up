$(document).ready(function() {

    var userLat;
    var userLon;
    var userCity;
    var cityID;

    function getLocation() {

        var requestURL = "https://services.surfline.com/geo-target/region";

        fetch(requestURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            userLat = data.location.latitude;
            userLon = data.location.longitude;
            userCity = data.city.name;

            var requestURL2 = "https://services.surfline.com/kbyg/mapview/spot?lat=" + userLat + "&lon=" + userLon + "";

            fetch(requestURL2)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function (data2) {
                console.log(data2);
                cityID = data2.spot._id;
                print();
            });
        });
    }

    function print(){
        console.log(userLat);
        console.log(userLon);
        console.log(userCity);
        console.log(cityID);
    }

    getLocation();

})


//     function getLocation() {

//         var requestURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipKey;

//         fetch(requestURL)
//         .then(function(response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             console.log(data.latitude);
//             console.log(data.longitude);
//         });
//     }

//     getLocation();

// })

// WORKING CODE
// function geoFindMe() {
  
//     function success(position) {
//       const latitude  = position.coords.latitude;
//       const longitude = position.coords.longitude;
  
     
//       console.log(latitude);
//       console.log(longitude);
//     }
  
//     function error() {
//       console.log("error");
//     }
  
//     if(!navigator.geolocation) {
//       console.log('Geolocation is not supported by your browser');
//     } else {
//       console.log('Locating…');
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
  
//   }

//   geoFindMe();
