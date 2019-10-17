function getMarkerIcon(mag) {
  if (mag < 3.5) {
    return L.AwesomeMarkers.icon({
      markerColor: "green"
    });
  } else if (mag < 5) {
    return L.AwesomeMarkers.icon({
      markerColor: "yellow"
    });
  } else if (mag < 6.5) {
    return L.AwesomeMarkers.icon({
      markerColor: "orange"
    });
  } else {
    return L.AwesomeMarkers.icon({
      markerColor: "red"
    });
  }
}

let mymap = L.map("map").setView([47, 18], 4);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.streets"
  }
).addTo(mymap);

let markers = L.markerClusterGroup();

let url =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-09-23&minmagnitude=1";
$.get(url, function(response) {
  let maxMag = 0;
  response.features.forEach(event => {
    let marker = L.marker(
      {
        lat: event.geometry.coordinates[1],
        lng: event.geometry.coordinates[0]
      },
      { icon: getMarkerIcon(event.properties.mag) }
    );

    marker.addTo(markers);
    marker.bindPopup(
      "<p>Magnitude: " +
        event.properties.mag +
        "</p><br><p>Location: " +
        event.properties.place +
        "</p>"
    );
    if (event.properties.mag > maxMag) {
      maxMag = event.properties.mag;
    }
  });
  console.log(maxMag);
});

mymap.addLayer(markers);
