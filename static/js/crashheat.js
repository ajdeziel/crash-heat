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
    gradient: [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(186, 9, 9, 1)',
        'rgba(186, 9, 9, 1)',
        'rgba(186, 9, 9, 1)'
        ],
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
    gradient: [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(219, 8, 8, 1)',
        'rgba(186, 9, 9, 1)',
        'rgba(186, 9, 9, 1)',
        'rgba(186, 9, 9, 1)'
        ],
  });
};

const daysOfWeek = {
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6,
  'sunday': 7
};

const sortByDayOfWeek = function sortByDayOfWeek(data) {
  data.sort( (day1, day2) => {
    day1 = day1.toLowerCase();
    day2 = day2.toLowerCase();
    return daysOfWeek[day1] > daysOfWeek[day2];
  });
};

const sortBySpeedLimit = function sortBySpeedLimit(data) {
  data.sort( (speed1, speed2) => {
    speed1 = parseInt(speed1);
    speed2 = parseInt(speed2);
    return speed1 > speed2;
  });
};

