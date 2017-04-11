var map;
var markers = [];
var placeMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13,
        mapTypeControl: false
    });

    var zoomAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById("zoom-to-area-text"));
    var searchBox = new google.maps.places.SearchBox(
      document.getElementById("buttonSearch"));
    searchBox.setBounds(map.getBounds());
    document.getElementById("zoom-to-area").addEventListener("click", function() {
        zoomToArea();
    });
    document.getElementById("grocery").addEventListener("click", grocerySearch);
    document.getElementById("restaurant").addEventListener("click", restaurantSearch);
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

function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function searchBoxPlaces(searchBox) {
  var bounds = map.getBounds();
  hideMarkers(placeMarkers);
  var places = searchBox.getPlaces();
  createMarkersForPlaces(places);
  if (places.length === 0) {
    window.alert("We did not find any places matching that search!");
  }
}

function grocerySearch() {
  var bounds = map.getBounds();
  hideMarkers(placeMarkers);
  var placesService = new google.maps.places.PlacesService(map);
  placesService.textSearch({
    query: "grocery store",
    bounds: bounds
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkersForPlaces(results);
    }
  });
}

function restaurantSearch() {
  var bounds = map.getBounds();
  hideMarkers(placeMarkers);
  var placesService = new google.maps.places.PlacesService(map);
  placesService.textSearch({
    query: "restaurant",
    bounds: bounds
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkersForPlaces(results);
    }
  });
}

function createMarkersForPlaces(places) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var icon = {
        url: place.icon,
        size: new google.maps.Size(35, 35),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
        id: place.place_id
      });
      var placeInfoWindow = new google.maps.InfoWindow();
      marker.addListener("click",function() {
        if (placeInfoWindow.marker == this) {
          console.log("this infowindow already is on this marker!");
        } else {
        getPlacesDetails(this, placeInfoWindow);
          }
      });

      placeMarkers.push(marker);
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }
    map.fitBounds(bounds);
  }

function getPlacesDetails(marker, infowindow) {
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: marker.id
      }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          infowindow.marker = marker;
          var innerHTML = "<div>";
          if (place.name) {
            innerHTML += "<strong>" + place.name + "</strong>";
          }
          if (place.formatted_address) {
            innerHTML += "<br>" + place.formatted_address;
          }
          if (place.formatted_phone_number) {
            innerHTML += "<br>" + place.formatted_phone_number;
          }
          if (place.opening_hours) {
            innerHTML += "<br><br><strong>Hours:</strong><br>" +
              place.opening_hours.weekday_text[0] + "<br>" +
              place.opening_hours.weekday_text[1] + "<br>" +
              place.opening_hours.weekday_text[2] + "<br>" +
              place.opening_hours.weekday_text[3] + "<br>" +
              place.opening_hours.weekday_text[4] + "<br>" +
              place.opening_hours.weekday_text[5] + "<br>" +
              place.opening_hours.weekday_text[6];
          }
          if (place.photos) {
            innerHTML += '<br><br><img src="' + place.photos[1].getUrl(
                {maxHeight: 100, maxWidth: 200}) + '">';
          }
          innerHTML += "</div>";
          infowindow.setContent(innerHTML);
          infowindow.open(map, marker);
          infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
          });

        }
      });
}