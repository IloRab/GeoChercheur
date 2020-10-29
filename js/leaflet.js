
function leaflet() {
  let coord_iut = [48.84197804895268,2.267719848410252];

  let map = L.map('minimap').setView(coord_iut, 13);
  let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });
  // new L.StamenTileLayer("toner").addTo(map);
  layer.addTo(map);

  // var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  //   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //  subdomains: 'abcd',
  //  minZoom: 0,
  //  maxZoom: 20,
  //  ext: 'png'
  // });
  // map.addLayer(Stamen_Toner);
}
