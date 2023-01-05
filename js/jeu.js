let long 
let lati  
let coord 
let bbox
let map
let propositionj 
let bt_valider 
var ligne 
let reponse

window.addEventListener("load", jeu_init);

function jeu_init(){
    let rep = get_question_actuel()
    let taille_bbox = 0.0000000005
    lati = Number(rep["lat"]);
    long = Number(rep["lon"]) ;
    coord = [lati,long];
    bbox = [long-taille_bbox,lati-taille_bbox ,long+taille_bbox,lati+taille_bbox];
    leaflet(coord);
    mapilary(bbox);
    bt_valider = document.getElementById('validation');
    bt_valider.addEventListener("click",valider);
    document.getElementById("minimap").addEventListener("click",poser);
    
}

function get_question_actuel(){
    let questions = JSON.parse(Cookies.get('question'))
    let idquestionactuel = Cookies.get('question_actuelle')
    let question = questions[idquestionactuel]
    
    return question

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
    
    fetch(api_url, {headers: {'Authorization' : 'OAuth ' + token} })
    .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => { 
        
        let src = "https://www.mapillary.com/embed?map_style=Mapillary%20streets&image_key="+json["data"][0]["id"]+"&x="+0.5+"&y="+0.5+"&style=photo";
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
  reponse = L.marker([lati,long]).addTo(map);
  ligne = L.polyline([reponse._latlng,propositionj._latlng], {color:'red'}).addTo(map);
  document.getElementById("minimap").removeEventListener("click",poser) 
  let idquestionactuel = Number(Cookies.get('question_actuelle'))
  console.log(idquestionactuel)
  Cookies.set('question_actuelle',idquestionactuel+1)
  location.reload()
}
