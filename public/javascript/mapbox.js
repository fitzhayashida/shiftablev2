$(function(){
L.mapbox.accessToken = 'pk.eyJ1IjoidGVyZXNhdG8iLCJhIjoiVWVQcjhJSSJ9.7oafI4-yF63mwYefbm7VkQ';

  window.map = L.mapbox.map('map', 'examples.map-h68a1pf7', {
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
window.foursquarePlaces = L.layerGroup().addTo(map);

// Use jQuery to make an AJAX request to Foursquare to load markers data.
function search(near, query) {
  $.getJSON(API_ENDPOINT
    .replace('CLIENT_ID', CLIENT_ID)
    .replace('CLIENT_SECRET', CLIENT_SECRET)
    .replace('NEAR', near)
    .replace('QUERY', query), function(result, status) {

      if (status !== 'success') return alert('Request to Foursquare failed');
      
      //var bounds = L.bounds() //grab two points and keep adding more markers to the bounds (extendWith())
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
          '<br><a style="cursor:pointer;" onClick="document.getElementById(&quot;lat&quot;).value=&quot;' + 
          venue.location.lat +'&quot;, document.getElementById(&quot;lng&quot;).value=&quot;' + 
          venue.location.lng +'&quot;, document.getElementById(&quot;address&quot;).value=&quot;' + 
          venue.location.address +'&quot;;">' + venue.location.address + '</a><br>' + venue.location.city +
           " " + venue.location.state)
        .addTo(foursquarePlaces);
      }

      //set map view to encompass the bounds object (map.fitBounds())
      //map.setView(L.latLng(result.response.venues[0].location.lat, result.response.venues[0].location.lng));
    })
  }


  $('#city').blur(function() {
    search($('#city').val(), $('#company').val());   
  });

  $('#company').blur(function() {
    search($('#city').val(), $('#company').val());   
  });
});


// "document.getElementById(&quot;lat&quot;).value=&quot;' + 
//           venue.location.lat +'&quot;, document.getElementById(&quot;lng&quot;).value=&quot;' + 
//           venue.location.lng +'&quot;, document.getElementById(&quot;address&quot;).value=&quot;' + 
//           venue.location.address +'&quot;;">'