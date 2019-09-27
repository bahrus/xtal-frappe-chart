import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import { XtallatX } from "xtal-element/xtal-latx.js";
import { define } from "trans-render/define.js";
import { createTemplate } from "xtal-element/utils.js";
import { hydrate } from "trans-render/hydrate.js";
const data = "data";
const mainTemplate = createTemplate(/* html */ `
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:1;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
<div id=target></div>
`);
/**
 * Web component wrapper around the cool Frappe chart (https://frappe.io/charts) library.
 * @element xtal-frappe-chart
 * @event selected-element-changed - fires when user selects chart data element
 */
export class XtalFrappeChart extends XtallatX(hydrate(HTMLElement)) {
    constructor() {
        super();
        this._pendingNewDataPoints = [];
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(mainTemplate.content.cloneNode(true));
    }
    static get is() {
        return "xtal-frappe-chart";
    }
    get data() {
        return this._data;
    }
    /**
     * Data to chart
     */
    set data(val) {
        this._data = val;
        this.onPropsChange();
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([data]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case data:
                this._data = JSON.parse(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !this._data || typeof this._data !== "object")
            return;
        setTimeout(() => {
            this.loadChart();
        }, 50);
    }
    get selectedElement() {
        return this._selectedElement;
    }
    /**
     * Selected data element from within the chart.
     */
    // set selectedElement(nv){
    //     this._selectedElement = nv;
    //     this.value = nv;
    //     this.de('selected-element', {
    //         value: nv
    //     });
    // }
    loadChart() {
        //this.style.display="block";
        if (this._previousData && this._data === this._previousData)
            return;
        this._previousData = this._data;
        //this._data['parent'] = this;
        const target = this.shadowRoot.querySelector("#target");
        if (typeof Chart !== "undefined") {
            this._chart = new Chart(target, this._data);
        }
        else {
            this._chart = new frappe.Chart(target, this._data);
        }
        setTimeout(() => {
            this._chart["parent"].addEventListener("data-select", e => {
                this.de("selected-element", {
                    value: {
                        values: e.values,
                        label: e.label,
                        index: e.index
                    }
                });
            });
        }, 50);
        this._pendingNewDataPoints.forEach(dp => {
            this._chart.addDataPoint(dp.label, dp.valueFromEachDataset, dp.index);
        });
    }
    get newDataPoint() {
        return this._newDataPoint;
    }
    /**
     * Add new data point to chart
     *
     */
    set newDataPoint(val) {
        this._newDataPoint = val;
        if (this._chart) {
            this._chart.addDataPoint(val.label, val.valueFromEachDataset, val.index);
        }
        else {
            this._pendingNewDataPoints.push(val);
        }
    }
    get staleDataPoint() {
        return this._staleDataPoint;
    }
    /**
     * Remove data point from chart
     */
    set staleDataPoint(val) {
        this._staleDataPoint = val;
        this._chart.removeDataPoint(val);
    }
    get updateData() {
        return this._updateData;
    }
    /**
     * Update Data
     */
    set updateData(val) {
        this._updateData = val;
        this._chart.update(val);
    }
    connectedCallback() {
        this.propUp([
            data,
            "newDataPoint",
            "staleDataPoint",
            "updateData",
            "selectedElement"
        ]);
        this._connected = true;
        this.onPropsChange();
    }
}
define(XtalFrappeChart);
