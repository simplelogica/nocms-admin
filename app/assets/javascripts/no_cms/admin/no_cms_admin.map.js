
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

    var that = this;

    var lat = $(address_map).siblings('.latitude').val();
    lat = (lat == '') ? "40.4191486" : lat
    var lng = $(address_map).siblings('.longitude').val();
    lng = (lng == '') ? "-3.7031865" : lng

    var center = new google.maps.LatLng(lat, lng);

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

    google.maps.event.addListener(marker, "dragend", function(){
      that.saveCoords(map, this.getPosition());
    });

    var geocoder = new google.maps.Geocoder();

    $(address_map).siblings('.search.btn').click(function(e){
      e.preventDefault();
      that.searchCoords($(this).siblings('.address').val(), map, marker);
    });

  },

  saveCoords: function(map, position) {
    $(map.getDiv()).siblings('.latitude').val(position.lat());
    $(map.getDiv()).siblings('.longitude').val(position.lng());
  },

  searchCoords: function(address, map, marker) {
    var geocoder = new google.maps.Geocoder();
    var that = this;

    geocoder.geocode({'address': address }, function(results) {
    if (results.length > 0) {
      point = results[0];

      that.saveCoords(map, point.geometry.location);
      map.setCenter(point.geometry.location);
      map.setZoom(15);
      marker.setPosition(point.geometry.location);
    }
    else
    {
      $(map.getDiv()).
      $("#map_log")[0].innerHTML = "<div class='flashmsg error'>No se ha podido localizar la tienda. Por favor, cambie los datos para volver a intentarlo</div>"
      window.setTimeout("$('#map_log')[0].innerHTML = ''", 5000)
    }
    });
  }
};
