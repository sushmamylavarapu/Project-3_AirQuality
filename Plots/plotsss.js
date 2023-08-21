let url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=62.4541&longitude=-114.3725&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust&timezone=America%2FNew_York&past_days=14";

d3.json(url).then(data => console.log(data));


var data = d3.json(url);

function init(ourData) {;
    let dataLength = ourData.hourly.time.length;
    
    let dataset = [];
    let data_keys = Object.keys(ourData.hourly).slice(1);
    let times = ourData.hourly.time;
    for (let i=0; i < data_keys.length; i++) {
        let item = data_keys[i];
       dataset.push( this[item + "_dataset"] = {
            x: times,
            y: ourData.hourly[`${item}`],
            name: data_keys[i]
        });
    }
    console.log(dataset);
    var layout = {
        title: {
          text:'plot',
          font: {
            size: 24
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

data.then(data => init(data));


