let url = "{1e30794b23820c8ed156da30fb6044a3}";
d3.json(url).then(data=>console.log(data.hourly));

var data = [
    {
      x: ['2023-05-11 22:23:00', '2023-08-14 22:23:00'],
      y: [1, 3, 6],
      type: 'scatter'
    }
  ];
  
  Plotly.newPlot('myDiv', data);

  d3.csv("/Project-3_AirQuality/air-quality.csv", function(err, rows){
    console.log(data);
  });

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var trace1 = {
  type: "scatter",
  mode: "lines",
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.High'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.Low'),
  line: {color: '#7F7F7F'}
}

var data = [trace1,trace2];

var layout = {
  title: 'Custom Range',
  xaxis: {
    range: ['2023-05-01', '2023-08-14'],
    type: 'date'
  }
  yaxis: {
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear'
  }
};

Plotly.newPlot('plots', data, layout);



