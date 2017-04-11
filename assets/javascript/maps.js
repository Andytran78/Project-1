var map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13,
        mapTypeControl: false
    });

    document.getElementById("zoom-to-area").addEventListener("click", function() {
        zoomToArea();
    });
}

    function zoomToArea() {
      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById("zoom-to-area-text").value;
      if (address === "") {
        window.alert("You must enter an area, or address.")
      } else {
        geocoder.geocode(
          { address: address,
            // componentRestrictions: {locality: "United States"}
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              map.setZoom(15);
              $("#address-field").text(results[0].formatted_address)
            } else {
              window.alert("We cold not find that location.  Try entering a more specific place!");
            }
          });
      }
    }