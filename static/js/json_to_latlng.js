// Get the array of google.maps.LatLng object based on the JSON retrieved from URL.
// Returns a promise with data.
const getLatLngs = function getLatLngs(apiUrl) {
  const latLngs = [];

  // Convert JSON to array of google.maps.LatLng objects.
  const jsonToLatLng = function jsonToLatLng(jsonExample) {
    const { features } = jsonExample;

    $.each(features, (index, jsonObject) => {
      const { attributes } = jsonObject;
      const lat = parseFloat(attributes.LATITUDE.toFixed(4));
      const lng = parseFloat(attributes.LONGITUDE.toFixed(4));

      const latLng = new google.maps.LatLng({ lat, lng });

      latLngs.push(latLng);
    });
  };

  return $.getJSON(apiUrl, jsonToLatLng).then(() => latLngs);
};
