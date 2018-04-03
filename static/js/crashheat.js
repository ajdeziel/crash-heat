// Preprocess.
const getUniques = function getUniques(value, index, self) {
  return self.indexOf(value) === index;
};

const getYearData = function getYearData(crashes) {
  const yearData = {};

  yearData.years = ((crashes.map(crash => crash.YEAR)).filter(getUniques)).sort();
  [yearData.minYear] = yearData.years;
  yearData.maxYear = yearData.years[yearData.years.length - 1];

  return yearData;
};

const getFilterData = function getFilterData(crashes, filter) {
  let filterData = [];

  filterData = ((crashes.map(crash => crash[filter])).filter(getUniques)).sort();

  return filterData;
};

const applyFilters = function applyFilters(crashes, filters) {
  let filteredCrashes = crashes;

  // filters -> { name: 'Ivan', year: 23, ... }
  $.each(filters, (key, value) => {
    filteredCrashes = filteredCrashes.filter(crash => crash[key] === value);
  });

  return filteredCrashes;
};

const initHeatmap = function initHeatmap(map) {
  // const latLngs = crashes.map(crash => crash.LAT_LNG);
  return new google.maps.visualization.HeatmapLayer({
    map,
    radius: 20,
    maxIntensity: 30,
  });
};

const updateHeatmap = function updateHeatmap(heatmap, crashes) {
  const latLngs = crashes.map(crash => crash.LAT_LNG);
  const { map } = heatmap;
  heatmap.setMap(null);
  return new google.maps.visualization.HeatmapLayer({
    map,
    radius: 20,
    maxIntensity: 30,
    data: latLngs,
  });
};
