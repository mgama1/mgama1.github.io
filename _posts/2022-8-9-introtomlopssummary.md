---
layout:             "post"
title:              "External Javascript in Jekyll-based Github Pages"
add_brython:        "/assets/js/brython.js"
add_brython_stdlib: "/assets/js/brython_stdlib.js"
all_my_py_code:     "piechart/piechart.py"
chart_html:         "piechart/piechart.html"
---


{% include {{ page.chart_html }} %}
<head>

<script src='https://cdn.plot.ly/plotly-2.26.0.min.js'>

    var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'markers',
  type: 'scatter'
};

var trace2 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  mode: 'lines',
  type: 'scatter'
};

var trace3 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines+markers',
  type: 'scatter'
};

var data = [trace1, trace2, trace3];

Plotly.newPlot('myDiv', data);

</script>

</head>
