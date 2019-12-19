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

[Demo](https://jsfiddle.net/bahrus/ma2y8ev0/)

<!--
```
<custom-element-demo>
  <template>
    <div>
      <h3>Basic xtal-frappe-chart demo</h3>
      <xtal-insert-json input="[]">
        <script type="application/json">
          [
            {
              "title": "My Awesome Chart",
              "data": {
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
              },
              "type": "bar", 
              "height": 250,
              "isNavigable": true
            }
          ]
        </script>
      </xtal-insert-json>
      <p-d on="merged-prop-changed" prop="data" val="target.value"></p-d>
      <xtal-frappe-chart></xtal-frappe-chart>
      <p-d on="selected-element-changed" prop="input" val="target.value"></p-d>
      <xtal-json-editor options="{}"  height="300px"></xtal-json-editor>
      


    
      <script type="module" src="https://unpkg.com/xtal-json-editor@0.0.39/xtal-json-editor.js?module"></script>
      <script type="module" src="https://unpkg.com/p-et-alia@0.0.47/p-et-alia.js?module"></script>
      <script type="module" src="https://unpkg.com/xtal-json-merge@0.2.37/xtal-json-merge.js?module"></script>
      <script type="module" src="https://unpkg.com/xtal-frappe-chart@0.0.44/xtal-frappe-chart.js?module"></script>
    </div>
  </template>
</custom-element-demo>
```
-->

# [Syntax](https://bahrus.github.io/api-viewer/index.html?npmPackage=xtal-frappe-chart)



## Referencing from CDN:

Optimized:

```html
<script type="module" src="https://cdn.pika.dev/xtal-frappe-chart"></script>
```

or

Easy to debug:

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
