import{Chart}from"./node_modules/frappe-charts/dist/frappe-charts.esm.js";import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";import{define}from"./node_modules/xtal-latx/define.js";const data="data";function loadCss(url){const link=document.createElement("link");link.rel="stylesheet";link.href=url;link.addEventListener("load",()=>{init()});document.head.appendChild(link)}class XtalFrappeChart extends XtallatX(HTMLElement){constructor(){super();this._pendingNewDataPoints=[];this.style.display="block"}static get is(){return"xtal-frappe-chart"}get data(){return this._data}set data(val){this._data=val;this.onPropsChange()}static get observedAttributes(){return super.observedAttributes.concat([data])}attributeChangedCallback(name,oldValue,newValue){switch(name){case data:this._data=JSON.parse(newValue);break;}super.attributeChangedCallback(name,oldValue,newValue);this.onPropsChange()}onPropsChange(){if(this._disabled||!this._data||"object"!==typeof this._data)return;setTimeout(()=>{this.loadChart()},50)}loadChart(){if(this._previousData&&this._data===this._previousData)return;this._previousData=this._data;if("undefined"!==typeof Chart){this._chart=new Chart(this,this._data)}else{this._chart=new frappe.Chart(this,this._data)}setTimeout(()=>{this._chart.parent.addEventListener("data-select",e=>{const selectedData=[];this._data.data.datasets.forEach(dataSet=>{selectedData.push(dataSet.values[e.index])});this.selectedElement=selectedData;this.value=selectedData;this.de("selected-element",{value:selectedData})})},50);this._pendingNewDataPoints.forEach(dp=>{this._chart.addDataPoint(dp.label,dp.valueFromEachDataset,dp.index)})}get newDataPoint(){return this._newDataPoint}set newDataPoint(val){this._newDataPoint=val;if(this._chart){this._chart.addDataPoint(val.label,val.valueFromEachDataset,val.index)}else{this._pendingNewDataPoints.push(val)}}get staleDataPoint(){return this._staleDataPoint}set staleDataPoint(val){this._staleDataPoint=val;this._chart.removeDataPoint(val)}get updateData(){return this._updateData}set updateData(val){this._updateData=val;this._chart.update(val)}connectedCallback(){this._upgradeProperties([data,"newDataPoint","staleDataPoint","updateData"]);this._connected=!0;this.onPropsChange()}}function init(){define(XtalFrappeChart)}const link=self["xtal_frappe-chart_css"];if(link){if("stylesheet"!==link.rel){loadCss(link.href)}else{init()}}else{loadCss("https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.css")}