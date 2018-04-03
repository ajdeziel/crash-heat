var map;

// Function callback once Google Maps API loads into page
function initMap() {
    // Fetch map div element
    var mapDivElement = $('#map')[0];

    // Initialize map in div
    var victoriaAU = {lat: -37.137593, lng: 144.934220};
    var initZoom = 10;
    map = new google.maps.Map(mapDivElement, {
        mapTypeControl: false,
        zoom: initZoom,
        center: new google.maps.LatLng(-37.137593, 144.934220), // Center on page load
    });

    // Limit map to Victoria (state of Australia).
    // Any attempts to travel beyond will be restricted.
    var mapLimit = new google.maps.LatLngBounds(
        new google.maps.LatLng(-39.308831, 140.943623),
        new google.maps.LatLng(-34.124781, 151.077289));

    // Listen for the dragend event where user goes beyond limits
    google.maps.event.addListener(map, 'dragend', function () {
        if (mapLimit.contains(map.getCenter())) return;
        var center = map.getCenter();
        var x = center.lng();
        var y = center.lat();
        var northeastX = mapLimit.getNorthEast().lng();
        var northeastY = mapLimit.getNorthEast().lat();
        var southwestX = mapLimit.getSouthWest().lng();
        var southwestY = mapLimit.getSouthWest().lat();

        // If user exceeds boundaries, reset coord.
        if (x < southwestX) {
            x = southwestX;
        }

        if (y < southwestY) {
            y = northeastY;
        }

        if (x > northeastX) {
            x = northeastX;
        }

        if (y > northeastY) {
            y = northeastY;
        }

        map.setCenter(new google.maps.LatLng(y, x));
    });

    // Limit the zoom level
    google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.getZoom() < initZoom) map.setZoom(initZoom);
    });
}