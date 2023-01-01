let longalea 
let latitalea 
let coord_alea 
let bboxalea 
let map
let propositionj 
let bt_valider 
var ligne 
let reponse

window.addEventListener("load", jeu_init);

function jeu_init(){
     //latitalea = Math.random()*360-180;
    //longalea = Math.random()*180-90;
    longalea = 2.2692497022078 ;
    latitalea = 48.843070851028 ;
    coord_alea = [latitalea,longalea];
    bboxalea = [longalea-0.0000000005,latitalea-0.00000005,longalea+0.0000005,latitalea-0.00000005];
    leaflet(coord_alea);
    mapilary(bboxalea);
    bt_valider = document.getElementById('validation');
    bt_valider.addEventListener("click",valider);
    document.getElementById("minimap").addEventListener("click",poser);
    
}

function leaflet(coord) {
    //let coord_iut = [48.84197804895268,2.267719848410252];
    map = L.map('minimap').setView(coord, 13);
    let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxBoundsViscosity: 1.0,
      noWrap: true,  
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    layer.addTo(map);
    
}

function mapilary(bboxalea){
    const token = 'MLY|6161088313914883|a3929d3b3b588f2cac8c7a7af3c1f6a1'
    const image_id = '169979785061521';
    const api_url = 'https://graph.mapillary.com/images?fields=id,value,created_at&access_token=' + token +'&bbox='+ bboxalea[0]+','+bboxalea[1]+','+bboxalea[2]+','+bboxalea[3];
    /* or instead of adding it to the url, add the token in headers (strongly recommended for user tokens)*/
    fetch(api_url, {headers: {'Authorization' : 'OAuth ' + token} })
    .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => { 
        let src = "https://www.mapillary.com/embed?map_style=Mapillary%20streets&image_key="+json["data"][0]["id"]+"&style=photo";
        let i = document.createElement("iframe");
        i.className = "streetview";
        i.id = "streetview";
        i.src = src;
        i.frameborder = "0";
        document.getElementById("street").appendChild(i);
    })                                                                                                                      
    .catch(function (e) {
       console.log("Some error jus happened with the fect request for " + e )
    })
  }

function poser(e){
  var coord = map.mouseEventToLatLng(e);
  var lat = coord.lat;
  var lng = coord.lng;
  if (propositionj) 
    map.removeLayer(propositionj);
  propositionj = L.marker([lat,lng]).addTo(map);
}

function valider(){
  console.log("ok");

  reponse = L.marker([latitalea,longalea]).addTo(map);
  ligne = L.polyline([reponse._latlng,propositionj._latlng], {color:'red'}).addTo(map);
  document.getElementById("minimap").removeEventListener("click",poser)
}
