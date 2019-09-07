[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-frappe-chart)

<a href="https://nodei.co/npm/xtal-frappe-chart/"><img src="https://nodei.co/npm/xtal-frappe-chart.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/xtal-frappe-chart">

# \<xtal-frappe-chart\>

Web component wrapper around the cool [Frappe chart](https://frappe.io/charts) library.

Things I like about this chart library:

1)  It is quite small (17kb), yet, unlike chartist, it has nice interactive features.
2)  It supports ES6 Modules (and iffe).
3)  The charts look nice.

**NB** Tooltips [don't](https://github.com/frappe/charts/issues/222) display properly within ShadowDOM.

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


    
        <!--Use experimental import maps -->
        <script defer src="https://cdn.jsdelivr.net/npm/es-module-shims@0.2.7/dist/es-module-shims.js"></script>
        <script type="importmap-shim">
          {
            "imports": {
              "xtal-element/": "https://cdn.jsdelivr.net/npm/xtal-element@0.0.60/",
              "trans-render/": "https://cdn.jsdelivr.net/npm/trans-render@0.0.114/",
              "xtal-json-merge/": "https://cdn.jsdelivr.net/npm/xtal-json-merge@0.2.37/",
              "xtal-json-editor/": "https://cdn.jsdelivr.net/npm/xtal-json-editor@0.0.35/",
              "p-et-alia/": "https://cdn.jsdelivr.net/npm/p-et-alia@0.0.8/",
              "xtal-frappe-chart/": "https://cdn.jsdelivr.net/npm/xtal-frappe-chart@0.0.38/",
              "frappe-charts/": "https://cdn.jsdelivr.net/npm/frappe-charts@1.2.2/"
            }
          }
          </script>
        <script  type="module-shim">
          import 'xtal-frappe-chart/xtal-frappe-chart.js';
          import 'xtal-json-merge/xtal-insert-json.js';
          import 'xtal-json-editor/xtal-json-editor.js';
          import 'p-et-alia/p-d.js';
        </script>
    </div>
  </template>
</custom-element-demo>
```
-->

# Syntax

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info package-name="npm.hypo-link" href="https://unpkg.com/xtal-frappe-chart@0.0.21/html.json"></wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.29/wc-info.js?module"></script>
    </div>
</template>
</custom-element-demo>
```
-->




## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

WIP
