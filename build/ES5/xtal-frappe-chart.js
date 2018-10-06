import{Chart}from"./node_modules/frappe-charts/dist/frappe-charts.esm.js";import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";import{define}from"./node_modules/xtal-latx/define.js";var data="data",link=self["xtal_frappe-chart_css"];if(link){if("stylesheet"!==link.rel){loadCss(link.href)}else{init()}}else{loadCss("https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.css")}function loadCss(url){var link=document.createElement("link");link.rel="stylesheet";link.href=url;link.addEventListener("load",function(){init()});document.head.appendChild(link)}var XtalFrappeChart=function(_XtallatX){babelHelpers.inherits(XtalFrappeChart,_XtallatX);function XtalFrappeChart(){var _this;babelHelpers.classCallCheck(this,XtalFrappeChart);_this=babelHelpers.possibleConstructorReturn(this,(XtalFrappeChart.__proto__||Object.getPrototypeOf(XtalFrappeChart)).call(this));_this._pendingNewDataPoints=[];_this.style.display="block";return _this}babelHelpers.createClass(XtalFrappeChart,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){switch(name){case data:this._data=JSON.parse(newValue);break;}babelHelpers.get(XtalFrappeChart.prototype.__proto__||Object.getPrototypeOf(XtalFrappeChart.prototype),"attributeChangedCallback",this).call(this,name,oldValue,newValue);this.onPropsChange()}},{key:"onPropsChange",value:function onPropsChange(){var _this2=this;if(this._disabled||!this._data||"object"!==babelHelpers.typeof(this._data))return;setTimeout(function(){_this2.loadChart()},50)}},{key:"loadChart",value:function loadChart(){var _this3=this;if(this._previousData&&this._data===this._previousData)return;this._previousData=this._data;if("undefined"!==typeof Chart){this._chart=new Chart(this,this._data)}else{this._chart=new frappe.Chart(this,this._data)}setTimeout(function(){_this3._chart.parent.addEventListener("data-select",function(e){var selectedData=[];_this3._data.data.datasets.forEach(function(dataSet){selectedData.push(dataSet.values[e.index])});_this3.selectedElement=selectedData;_this3.value=selectedData;_this3.de("selected-element",{value:selectedData})})},50);this._pendingNewDataPoints.forEach(function(dp){_this3._chart.addDataPoint(dp.label,dp.valueFromEachDataset,dp.index)})}},{key:"connectedCallback",value:function connectedCallback(){this._upgradeProperties([data,"newDataPoint","staleDataPoint","updateData"]);this._connected=!0;this.onPropsChange()}},{key:"data",get:function get(){return this._data},set:function set(val){this._data=val;this.onPropsChange()}},{key:"newDataPoint",get:function get(){return this._newDataPoint},set:function set(val){this._newDataPoint=val;if(this._chart){this._chart.addDataPoint(val.label,val.valueFromEachDataset,val.index)}else{this._pendingNewDataPoints.push(val)}}},{key:"staleDataPoint",get:function get(){return this._staleDataPoint},set:function set(val){this._staleDataPoint=val;this._chart.removeDataPoint(val)}},{key:"updateData",get:function get(){return this._updateData},set:function set(val){this._updateData=val;this._chart.update(val)}}],[{key:"is",get:function get(){return"xtal-frappe-chart"}},{key:"observedAttributes",get:function get(){return babelHelpers.get(XtalFrappeChart.__proto__||Object.getPrototypeOf(XtalFrappeChart),"observedAttributes",this).concat([data])}}]);return XtalFrappeChart}(XtallatX(HTMLElement));function init(){define(XtalFrappeChart)}