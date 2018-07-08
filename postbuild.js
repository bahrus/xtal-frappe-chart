//@ts-check
const jiife = require('jiife');
jiife.addFiles(['node_modules/frappe-charts/dist/frappe-charts.min.iife.js']);
jiife.processFiles(['node_modules/xtal-latx/xtal-latx.js','xtal-frappe-chart.js'], 'xtal-frappe-chart.iife.js');




