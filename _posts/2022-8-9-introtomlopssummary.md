---
layout:             "post"
title:              "External Javascript in Jekyll-based Github Pages"
add_brython:        "/assets/js/brython.js"
add_brython_stdlib: "/assets/js/brython_stdlib.js"
all_my_py_code:     "piechart/piechart.py"
chart_html:         "piechart/piechart.html"
---

{% include {{ page.chart_html }} %}

