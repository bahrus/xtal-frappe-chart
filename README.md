[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-frappe-chart)

# \<xtal-frappe-chart\>

Web component wrapper around the cool [frappé](https://frappe.github.io/charts/) chart library


## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="https://rawgit.com/bahrus/xtal/master/bower_components/polymer/lib/elements/dom-bind.html">
        <link rel="import" href="https://rawgit.com/bahrus/xtal/master/bower_components/polymer/lib/elements/dom-if.html">
    <link rel="import" href="xtal-frappe-chart.html">
    <script async src="https://unpkg.com/xtal-json-merge@0.1.0/json-merge.js"></script>
    <link rel="import" href="https://rawgit.com/bahrus/xtal-json-editor/master/xtal-json-editor.html">
 </template>
         <dom-bind>
          <template>
            <json-merge watch="[]" result="{{example1}}">
              <script type="application/json">
                [
                  {
                    "title": "My Awesome Chart",
                    "data": {
                      "labels": ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
                        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
                  
                      "datasets": [
                        {
                          "title": "Some Data", "color": "light-blue",
                          "values": [25, 40, 30, 35, 8, 52, 17, -4]
                        },
                        {
                          "title": "Another Set", "color": "violet",
                          "values": [25, 50, -10, 15, 18, 32, 27, 14]
                        },
                        {
                          "title": "Yet Another", "color": "blue",
                          "values": [15, 20, -3, -15, 58, 12, -17, 37]
                        }
                      ]
                    },
                    "type": "bar", 
                    "height": 250,
                    "is_navigable": 1
                  }
                ]
              </script>
            </json-merge>
            <xtal-frappe-chart data="[[example1]]"
              selected-element="{{selectedDataPoint}}"
            ></xtal-frappe-chart>
            <xtal-json-editor watch="[[selectedDataPoint]]" height="300px"></xtal-json-editor>
          </template>
        </dom-bind>
</custom-element-demo>
```
-->

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
