window.addEventListener("load", jeu_init);

function jeu_init(){
    let latitalea = Math.random()*360-180;
    let longalea = Math.random()*180-90;
    //let longalea = 2.2692497022078 ;
    //let latitalea = 48.843070851028 ;
    let coord_alea = [latitalea,longalea];
    let bboxalea = [longalea-0.0000000005,latitalea-0.00000005,longalea+0.0000005,latitalea-0.00000005]
    leaflet(coord_alea);
    mapilary(bboxalea);
}

function leaflet(coord) {
    //let coord_iut = [48.84197804895268,2.267719848410252];
    let map = L.map('minimap').setView(coord, 13);
    let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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