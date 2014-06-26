
// If not exists create empty object
var NoCMS = NoCMS || {};

// If not exists create empty object
NoCMS.Admin = NoCMS.Admin || {};

//
// All the UI functionallity
//
NoCMS.Admin.Map = {

  // Here will cache the DOM elements
  'DOM': { },
  async_init: function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=NoCMS.Admin.Map.init";
    document.body.appendChild(script);
  },

  // Initilizing elements
  init: function () {

    var that = this;

    $('.address_map').each(function(){
      that.loadMap(this);
    })

  },

  loadMap: function(address_map) {

    var center = new google.maps.LatLng("40.4191486", "-3.7031865");

    var map = new google.maps.Map(address_map, {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var marker = new google.maps.Marker({
      position:  center,
      icon: "/assets/no_cms/admin/map-marker.png",
      draggable: true,
      map: map
    });

    google.maps.event.addListener(marker, "dragend", this.saveCoords);

  },
  saveCoords: function(e) {
    $(this.getMap().getDiv()).siblings('.latitude').val(this.getPosition().lat());
    $(this.getMap().getDiv()).siblings('.longitude').val(this.getPosition().lng());
  }


};
