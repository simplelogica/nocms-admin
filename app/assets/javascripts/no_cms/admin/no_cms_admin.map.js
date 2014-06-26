
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

  // Initilizing elements
  init: function () {

    var center = new google.maps.LatLng("40.4191486", "-3.7031865");

    $('.address_map').each(function(i, address_map) {
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


      google.maps.event.addListener(marker, "dragend", function() {
        $(address_map).siblings('.latitude').val(marker.getPosition().lat());
        $(address_map).siblings('.longitude').val(marker.getPosition().lng());
      });
    })

  },

};
