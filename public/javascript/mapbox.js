L.mapbox.accessToken = 'pk.eyJ1IjoidGVyZXNhdG8iLCJhIjoiVWVQcjhJSSJ9.7oafI4-yF63mwYefbm7VkQ';

var map = L.mapbox.map('map', 'examples.map-h67hf2ic', {
  doubleClickZoom: false
})
.setView([49.88, -97.15], 4)
.on('dblclick', function(e) {
  // Zoom exactly to each double-clicked point
  map.setView(e.latlng, map.getZoom() + 1);
});


// Credit Foursquare for their wonderful data
map.attributionControl
    .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');


var CLIENT_ID = 'N5JGWBW3KJR0BVOS5LMQKCUT5X4REH5OO3HGFPTP0VF1P55V';
var CLIENT_SECRET = '234DMM2HV3ZACKCMUH1V5PODND052JR3I2ZTPUQKFDDLLFVB';
var NEAR = "las vegas, nv";
var QUERY = "sushi";

// https://developer.foursquare.com/start/search
var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=CLIENT_ID' +
  '&client_secret=CLIENT_SECRET' +
  '&v=20140806' +
  '&m=foursquare' +
  '&near=NEAR' +
  '&query=QUERY' +
  '&callback=?';

// Keep our place markers organized in a nice group.
var foursquarePlaces = L.layerGroup().addTo(map);

// Use jQuery to make an AJAX request to Foursquare to load markers data.
$.getJSON(API_ENDPOINT
    .replace('CLIENT_ID', CLIENT_ID)
    .replace('CLIENT_SECRET', CLIENT_SECRET)
    .replace('NEAR', NEAR)
    .replace('QUERY', QUERY), function(result, status) {

    if (status !== 'success') return alert('Request to Foursquare failed');
    
    // Transform each venue result into a marker on the map.
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#BE9A6B',
            'marker-symbol': 'marker',
            'marker-size': 'large'
          })
        })
      .bindPopup(
        '<strong><a href="https://foursquare.com/v/' + venue.id + '">' + venue.name + '</a></strong>' +
        '<br><a style="cursor:pointer;" onClick="document.getElementById("address").value="' + venue.location.address +'";">' + venue.location.address + '</a><br>' + venue.location.city +
         " " + venue.location.state )
        .addTo(foursquarePlaces);
    }

});
$(document).ready(function(){
  $('#local-reg').on('show.bs.collapse', function () { map._onResize(); })
})

