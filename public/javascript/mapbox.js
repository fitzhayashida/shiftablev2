L.mapbox.accessToken = 'pk.eyJ1IjoidGVyZXNhdG8iLCJhIjoiVWVQcjhJSSJ9.7oafI4-yF63mwYefbm7VkQ';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([40, -74.50], 9);

// Credit Foursquare for their wonderful data
map.attributionControl
    .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');


var CLIENT_ID = 'N5JGWBW3KJR0BVOS5LMQKCUT5X4REH5OO3HGFPTP0VF1P55V';
var CLIENT_SECRET = '234DMM2HV3ZACKCMUH1V5PODND052JR3I2ZTPUQKFDDLLFVB';

// https://developer.foursquare.com/start/search
var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=CLIENT_ID' +
  '&client_secret=CLIENT_SECRET' +
  '&v=20130815' +
  '&ll=LATLON' +
  '&query=coffee' +
  '&callback=?';

// Keep our place markers organized in a nice group.
var foursquarePlaces = L.layerGroup().addTo(map);

// Use jQuery to make an AJAX request to Foursquare to load markers data.
$.getJSON(API_ENDPOINT
    .replace('CLIENT_ID', CLIENT_ID)
    .replace('CLIENT_SECRET', CLIENT_SECRET)
    .replace('LATLON', map.getCenter().lat +
        ',' + map.getCenter().lng), function(result, status) {

    if (status !== 'success') return alert('Request to Foursquare failed');

    // Transform each venue result into a marker on the map.
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#BE9A6B',
            'marker-symbol': 'cafe',
            'marker-size': 'large'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong>')
        .addTo(foursquarePlaces);
    }

});