// creating a function that cxreates the plot at the beginnign of the page
function displayPlot(ourData, cityname) {
    let dataLength = ourData.hourly.time.length;
    let dataset = [];
    var data_keys = Object.keys(ourData.hourly).slice(1);
    let times = ourData.hourly.time;
    for (let i=0; i < data_keys.length; i++) {
        let item = data_keys[i];
       dataset.push(this[item + "_dataset"] = {
            x: times,
            y: ourData.hourly[`${item}`],
            name: data_keys[i]
        });
    }
    var layout = {
        title: {
          text: `Particle Amount Charts (${cityname})`,
          font: {
            size: 35,
          }},
          xaxis: {
            title: {
              text: 'past three months (hourly)',
              font: {
                size: 23,
                color: 'black'
              }
            },
          },
          yaxis: {
            title: {
              text: 'μg/m³',
              font: {
                size: 23,
                color: 'black'
              }
            }
          },
          plot_bgcolor : "rgba(0,0,0,0)",
          paper_bgcolor : "rgba(0,0,0,0)"
        };
    Plotly.newPlot("plots", dataset, layout);
} 
// storing our cities and their coord in two lists
var cities = ["Toronto, Ontario", "Halifax, Nova Scotia",
"Quebec city, Quebec", "Ottawa, Canada" , "Victoria, British Columbia",
"YellowKnife, Northwest Territories"];

var coordinates = [[43.7001, -79.4163], [44.6464, -63.5729], [46.8298, -71.25], [45.4112, -75.6981],
                   [48.4359, -123.3516], [62.4541, -114.3725]];

// adding our cities name into options in our selected menu
let dropdownMenu = d3.selectAll("#selDataset");
for (let i=0; i < cities.length; i++) {
  let row = dropdownMenu.append('option');
  let option = row.append(`dataset${i}`).text(`${cities[i]}`);
  d3.select(`dataset${i}`).attr("value", `Dataset${i}`);
}


// our base url
var baseURL = "https://air-quality-api.open-meteo.com/v1/air-quality?";
var extraQuery = "&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust&timezone=America%2FNew_York&past_days=92"
let url = baseURL + `latitude=${coordinates[3][0]}&longitude=${coordinates[3][1]}` + extraQuery;

// creating the init() function that shows Toronto when page is loaded
function init() {
  // give Toronto's coor to show whenthe page is open
  let url = baseURL + `latitude=${coordinates[0][0]}&longitude=${coordinates[0][1]}` + extraQuery;
  let city = cities[0];
  d3.json(url).then(data => displayPlot(data, city));
}

// creating the function the changes the url api query with the chosen coordinates and updates the plot
function changePlot() {
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");
  let newCoor = null;
  let city = null;
  for(let i=0; i <cities.length; i++) {
    if (cities[i] == dataset) {
      newCoor = coordinates[i];
      city = cities[i]
    }
  }
  let newURL = baseURL + `latitude=${newCoor[0]}&longitude=${newCoor[1]}` + extraQuery;
  d3.json(newURL).then(data => displayPlot(data, city));
}

init();