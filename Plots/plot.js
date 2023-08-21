// giving the url with Yellow Knife 

let url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=62.4541&longitude=-114.3725&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust&timezone=America%2FNew_York&past_days=14";
// log our data
d3.json(url).then(data => console.log(data));

// storing our data into a varable called data
var data = d3.json(url);



// creating a function that cxreates the plot at the beginnign of the page
function displayPlot(ourData) {
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
          text: "Yellow Knife Particles",
          font: {
            size: 30,
          }},
          xaxis: {
            title: {
              text: 'past month (hourly)',
              font: {
                size: 23,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'μg/m³',
              font: {
                size: 23,
                color: '#7f7f7f'
              }
            }
          },
          plot_bgcolor : "rgba(0,0,0,0)",
          paper_bgcolor : "rgba(0,0,0,0)"
        };
    Plotly.newPlot("plots", dataset, layout);
} 


data.then(data => displayPlot(data));

let dataSelect = d3.select("#selDataset");
dataSelect.append("option").text("All variables");

data.then(data => displayPlot(data));

