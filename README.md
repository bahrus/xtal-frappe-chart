[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-frappe-chart)

<a href="https://nodei.co/npm/xtal-frappe-chart/"><img src="https://nodei.co/npm/xtal-frappe-chart.png"></a>

<img src="http://img.badgesize.io/https://unpkg.com/xtal-frappe-chart@0.0.16/build/ES6/xtal-frappe-chart.iife.js?compression=gzip"> (includes frappe-chart code)

# \<xtal-frappe-chart\>

Web component wrapper around the cool [Frappe chart](https://frappe.io/charts) library.

Things I like about this chart library:

1)  It is quite small (17kb), yet, unlike chartist, it has nice interactive features.
2)  It supports ES6 Modules (and iffe).
3)  The charts look nice.

xtal-frappe-charts follows suit and provides an ES6 Module (xtal-frappe-chart.js) and an iife one (xtal-frape-chart.iife.js);

<!--
```
<custom-element-demo>
  <template>
    <div data-pd>
        <link id="xtal_frappe-chart_css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0/dist/frappe-charts.min.css">
      <pass-down></pass-down>
      <h3>Basic xtal-frappe-chart demo</h3>
      <xtal-insert-json input="[]"
        data-on="merged-prop-changed: pass-to-next:{data:target.value}"
      >
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
      <xtal-frappe-chart
        data-on="selected-element-changed: pass-to-next:{input:target.value}"
      ></xtal-frappe-chart>
      <xtal-json-editor options="{}"  height="300px"></xtal-json-editor>

      <!-- Polyfills Needed for retro browsers -->
      <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

      <!-- Cutting edge (subject to change) package maps -->
      <script defer src="https://cdn.jsdelivr.net/npm/es-module-shims@0.1.15/dist/es-module-shims.js"></script>
      <script type="packagemap-shim">
        {
          "packages": {
            "xtal-latx":{
              "path": "https://cdn.jsdelivr.net/npm/xtal-latx@0.0.44"
            },
            "frappe-charts":{
              "path": "https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0"
            }

          }
        }
        </script>
        
      <script  type="module-shim">
        import 'https://cdn.jsdelivr.net/npm/xtal-frappe-chart@0.0.18/xtal-frappe-chart.js';
        import 'https://cdn.jsdelivr.net/npm/xtal-json-merge@0.2.32/xtal-insert-json.js';
        import 'https://cdn.jsdelivr.net/npm/xtal-json-editor@0.0.29/xtal-json-editor.esm.js';
        import 'https://cdn.jsdelivr.net/npm/pass-down@0.0.10/pass-down.js';
      </script>
    </div>
  </template>
</custom-element-demo>
```
-->

## Selected Element




## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

WIP
