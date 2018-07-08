[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-frappe-chart)

<a href="https://nodei.co/npm/xtal-frappe-chart/"><img src="https://nodei.co/npm/xtal-frappe-chart.png"></a>

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
    <div class="vertical-section-container centered">
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
        <script type="module" src="https://unpkg.com/xtal-json-merge@0.2.24/json-merge.js"></script>
        <script type="module" src="https://unpkg.com/p-d.p-u@0.0.42/p-d.p-u.js"></script>
        <script type="module" src="https://unpkg.com/xtal-frappe-chart@0.0.13/xtal-frappe-chart.iife.js"></script>
        <script  src="https://unpkg.com/xtal-json-editor@0.0.19/xtal-json-editor.js"></script>
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
      <p-d on="merged-prop-changed" to="{data}"></p-d>
      <xtal-frappe-chart></xtal-frappe-chart>
      <p-d on="selected-element-changed" to="{input}"></p-d>
      <xtal-json-editor options="{}"  height="300px"></xtal-json-editor>
      <p-d on="selected-element-changed" to="{input}"></p-d>
      <xtal-json-editor options="{}"  height="300px"></xtal-json-editor>
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

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
