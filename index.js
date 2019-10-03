let mymap = L.map("map").setView([51.505, -0.09], 13);

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
$.get(url, data => {
  data.features.forEach(event => {
    L.marker({
      lat: event.geometry.coordinates[1],
      lng: event.geometry.coordinates[0]
    }).addTo(markers);
  });
});

mymap.addLayer(markers);
