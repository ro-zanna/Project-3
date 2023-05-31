// Creating our Map
let myMap = L.map("map", {
  center: [38.5816, -121.4944],
  zoom: 12
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// An array containing each city's name and location
let cities = [{
  name: "Los Angeles",
  location: [34.0522, -118.2437]
},
{
  name: "San Diego",
  location: [32.7157, -117.1611]
},
{
  name: "San Jose",
  location: [37.3387, -121.8853]
},
{
  name: "San Francisco",
  location: [37.7749, -122.4194]
},
{
  name: "Fresno",
  location: [36.7378, -119.7871]
},
{
  name: "Sacramento",
  location: [38.5816, -121.4944]
},
{
  name: " Long Beach",
  location: [33.7701, -118.1937]
},
{
  name: "Oakland",
  location: [37.8044, -122.2712]
},
{
  name: "Bakersfield",
  location: [35.3733, -119.0187]
},
{
  name: "Anaheim",
  location: [33.8366, -117.9143]
},
{
  name: "Stockton",
  location: [37.9577, -121.2908]
},
{
  name: "Riverside",
  location: [33.9806, -117.3755]
},
{
  name: "Santa Ana",
  location: [33.7455, -117.8677]
},
{
  name: "Irvine",
  location: [33.6846, -117.8265]

}];

// Loop through the cities array and add markers for each city
for (let i = 0; i < cities.length; i++) {
  let city = cities[i];
  L.marker(city.location).addTo(myMap).bindPopup(city.name);
}


// An object to store city layer groups
const cityLayerGroups = {};

// Loop through the cities array and create a layer group for each city
cities.forEach(city => {
  const { name } = city;
  cityLayerGroups[name] = L.layerGroup().addTo(myMap);
});

// API key obtained from the AFDC API
const apiKey = 'gFPqFYkxsrsqaruOsCUZyYhcSK4YtDlzRerQhbwc';

// Make a request to the AFDC API for electric vehicle charging stations
fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${apiKey}&fuel_type=ELEC`)
  .then(response => response.json())
  .then(data => {
    // Process the received data and create markers on the map for each charging station
    data.fuel_stations.forEach(station => {
      const { latitude, longitude, station_name, street_address, city } = station;
      const popupContent = `<b>${station_name}</b><br>${street_address}`;
      
      // Check if the city layer group exists
      if (cityLayerGroups.hasOwnProperty(city)) {
        // Add the marker to the city layer group
        const marker = L.marker([latitude, longitude]).bindPopup(popupContent);
        cityLayerGroups[city].addLayer(marker);
      }
    });

    // Create a layer control and add the city layer groups to it
    L.control.layers(null, cityLayerGroups).addTo(myMap);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to pan the map to a specific city when the search button is clicked
function searchCity(cityName) {
  const city = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
  if (city) {
    myMap.panTo(city.location);
  }
}

// Event listener for the search button click
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const cityName = prompt('Enter a city name:');
  if (cityName) {
    searchCity(cityName);
  }
});