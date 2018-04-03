// Get the array of google.maps.LatLng object based on the JSON retrieved from URL.
// Returns a promise with data.
const getCrashes = function getCrashes(apiUrl) {
  const crashes = [];

  // Convert JSON to array of JavaScript objects.
  const jsonTojsObj = function jsonTojsObj(jsonData) {
    const { features } = jsonData;

    $.each(features, (index, jsonObject) => {
      const crash = jsonObject.attributes;
      const lat = parseFloat(crash.LATITUDE.toFixed(4));
      const lng = parseFloat(crash.LONGITUDE.toFixed(4));

      crash.YEAR = new Date(crash.ACCIDENT_DATE).getFullYear();
      crash.LAT_LNG = new google.maps.LatLng({ lat, lng });

      crashes.push(crash);
    });
  };

  return $.getJSON(apiUrl, jsonTojsObj).then(() => crashes);
};
