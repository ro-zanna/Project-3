// Create an empty map
let myMap = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 12
});

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(myMap);

// An array containing each city's name and location
let cities = [
  {
    name: "San Francisco",
    location: [37.7749, -122.4194]
   
  },
  {
    name: "Oakland",
    location: [37.8044, -122.2712]

  },
  {
    name: "Los Angeles",
    location: [34.0522, -118.2437]
    
  },
  {
    name: "Sacramento",
    location: [38.5816, -121.4944]
 
  },
  {
    name: "San Jose",
    location: [37.3387, -121.8853]

  },
  {
    name: "Berkeley",
    location: [33.1261, -80.0088]
 
  }
];

// Function to add charging station markers to the map
function addChargingStations(city) {
  let latitude = city.location[0];
  let longitude = city.location[1];

  // Make a request to the Open Charge Map API to retrieve charging stations
  let url = 'https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&latitude=' + latitude + '&longitude=' + longitude + '&distance=10&distanceunit=KM&maxresults=5&compact=true';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Loop through the charging stations and add markers to the map
      data.forEach(function(station) {
        let marker = L.marker([station.AddressInfo.Latitude, station.AddressInfo.Longitude])
          .bindPopup('<h3>' + station.AddressInfo.Title + '</h3><p>' + station.AddressInfo.AddressLine1 + ', ' + station.AddressInfo.Town + ', ' + station.AddressInfo.Postcode + '</p>')
          .addTo(myMap);
      });
    })
    .catch(function(error) {
      console.log('Error fetching charging stations:', error);
    });
}

// Loop through the cities array
cities.forEach(function(city) {
  // Add city marker to the map
  L.marker(city.location)
    .bindPopup('<h1>' + city.name + '</h1>')
    .addTo(myMap);

  // Call the function to add charging stations for each city
  addChargingStations(city);
});