[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-frappe-chart)

<a href="https://nodei.co/npm/xtal-frappe-chart/"><img src="https://nodei.co/npm/xtal-frappe-chart.png"></a>

[![Actions Status](https://github.com/bahrus/xtal-frappe-chart/workflows/CI/badge.svg)](https://github.com/bahrus/xtal-frappe-chart/actions?query=workflow%3ACI)

<img src="https://badgen.net/bundlephobia/minzip/xtal-frappe-chart">

# \<xtal-frappe-chart\>

Web component wrapper around the cool [Frappe chart](https://frappe.io/charts) library.

Things I like about this chart library:

1)  It is quite small (17kb), yet it has nice interactive features.
2)  It supports ES6 Modules.
3)  The charts look nice.

[Demo](https://codepen.io/bahrus/pen/dyRqxQq)

<!--
```
<custom-element-demo>
  <template>
    <h3>Basic xtal-frappe-chart demo</h3>
    <xtal-frappe-chart chart-title="My Awesome Chart" type=bar height=250 is-navigable data='
    {
      "labels": ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
  
      "datasets": [
        {
          "name": "Some Data", "color": "light-blue",
          "values": [25, 40, 30, 35, 8, 52, 17, -4]
        },
        {
          "name": "Another Set", "color": "violet",
          "values": [25, 50, -10, 15, 18, 32, 27, 14]
        },
        {
          "name": "Yet Another", "color": "blue",
          "values": [15, 20, -3, -15, 58, 12, -17, 37]
        }
      ]
    }
    '></xtal-frappe-chart>
      <script  type=module>
        import 'https://cdn.skypack.dev/xtal-frappe-chart';
      </script>
  </template>
</custom-element-demo>
```
-->

# [API Reference](https://cf-sw.bahrus.workers.dev/?href=https%3A%2F%2Fcdn.skypack.dev%2Fxtal-frappe-chart%2Fcustom-elements.json&stylesheet=https%3A%2F%2Funpkg.com%2Fwc-info%2Fsimple-ce-style.css&embedded=false&tags=&ts=0.0.106&tocXSLT=https%3A%2F%2Funpkg.com%2Fwc-info%2Ftoc.xsl)

# [Syntax](https://bahrus.github.io/api-viewer/index.html?npmPackage=xtal-frappe-chart&jsPath=xtal-frappe-chart-example1.js&jsonPath=custom-elements-example1.json)

<!--
```
<custom-element-demo>
  <template>
      <div>
        <api-viewer src="https://unpkg.com/xtal-frappe-chart@0.0.51/custom-elements.json"></api-viewer>
        <script type=module src=https://unpkg.com/api-viewer-element@0.3.3/lib/api-viewer.js?module></script>
        <script type=module src=https://unpkg.com/xtal-frappe-chart/xtal-frappe-chart.js?module></script>
    </div>
  </template>
</custom-element-demo>
```
-->


## Referencing from CDN:

<!--
Optimized:

```html
<script type="module" src="https://cdn.pika.dev/xtal-frappe-chart"></script>
```

or

Easy to debug:
-->

```html
<script type="module" src="https://unpkg.com/xtal-frappe-chart/xtal-frappe-chart.js?module"></script>
```


## Viewing Your Element Locally

```
$ npm install
$ npm run serve
```

## Running Tests

WIP
