//@ts-check
const jiife = require('jiife');
jiife.addFiles(['node_modules/frappe-charts/dist/frappe-charts.min.iife.js']);
const xl = 'node_modules/xtal-element/';
jiife.processFiles([xl + 'xtal-latx.js', xl + 'define.js', 'xtal-frappe-chart.js'], 'xtal-frappe-chart.iife.js');




