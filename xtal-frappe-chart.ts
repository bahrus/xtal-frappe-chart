import {define} from 'xtal-element/lib/define.js';
import {destructPropInfo, PropAction, ReactiveSurface, PropDef, XtalPattern} from 'xtal-element/types.js';
import {xp} from 'xtal-element/lib/XtalPattern.js';
import {html} from 'xtal-element/lib/html.js';
import {getPropDefs} from 'xtal-element/lib/getPropDefs.js';
import {letThereBeProps} from 'xtal-element/lib/letThereBeProps.js';
import {Reactor} from 'xtal-element/lib/Reactor.js';
import {hydrate} from 'xtal-element/lib/hydrate.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from "frappe-charts/dist/frappe-charts.esm.js";

import {ChartOptions, XtalFrappeChartEventNameMap, IAddDataPointParams, SelectedElement, SelectedElementEventDetail, XtalFrappeChartIfc} from './types.js';
const mainTemplate = html`
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:1;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
<div id=target></div>
`;
const refs = {targetId: ''};
const propDefGetters = [
    xp.props,
    ({data, newDataPoint}: XtalFrappeChart) => ({
        type: Object,
        dry: true,
        async: true,
        parse: true,
    }),
    ({selectedElement}: XtalFrappeChart) => ({
        type: Object,
        notify: true,
        echoTo: 'value'
    }),
    ({value}: XtalFrappeChart) => ({
        type: Object,
        notify: true,
    }),
    ({staleDataPoint}: XtalFrappeChart) => ({
        type: Number,
        stopReactionsIfFalsy: true,
    }),
] as destructPropInfo[];
const propDefs = getPropDefs(propDefGetters);

export const addDataPoint = ({newDataPoint, chart}: XtalFrappeChart) =>{
    chart.addDataPoint(newDataPoint.label, newDataPoint.valueFromEachDataset, newDataPoint.index);
};
export const removeDataPoint = ({staleDataPoint, chart}: XtalFrappeChart) => {
    chart.removeDataPoint(staleDataPoint);
}
export const linkChart = ({data, domCache, self}: XtalFrappeChart) => {
    if(domCache === undefined) return;
    setTimeout(() =>{
        self.chart = new Chart(domCache[refs.targetId], data);
        setTimeout(() => {
            self.chart["parent"].addEventListener("data-select", self.handleDataSelect.bind(this));
        }, 50);
    }, 0);
}

const propActions = [
    xp.manageMainTemplate,
    xp.createShadow,
    linkChart,
    addDataPoint,
    removeDataPoint
] as PropAction[];

/**
 * Web component wrapper around the cool Frappe chart (https://frappe.io/charts) library.
 * @element xtal-frappe-chart
 * @event selected-element-changed - fires when user selects chart data element
 */
export class XtalFrappeChart extends HTMLElement implements ReactiveSurface, XtalPattern{
    /**
     * @private
     */
    static is = 'xtal-frappe-chart';
    refs = refs;
    self = this;
    domCache: any;
    propActions = propActions;
    reactor = new Reactor(this);
    
    /**
     * Data to chart
     */
    data: ChartOptions;
    value: SelectedElement;
    selectedElement: SelectedElement;
    /**
     * Add new data point to chart
     * 
     */
    newDataPoint: IAddDataPointParams;
    /**
     * Remove data point from chart
    */
    staleDataPoint: number;

    chart: Chart;

    handleDataSelect(e: any){
        this.value = {
            values: e.values,
            label: e.label,
            index: e.index
        }
        this.selectedElement = this.value;
    }
    connectedCallback(){
        hydrate<any>(this, propDefs, {});
    }
    onPropChange(name: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    mainTemplate = mainTemplate;
}
letThereBeProps(XtalFrappeChart, propDefs, 'onPropChange');
define(XtalFrappeChart);

declare global {
    interface HTMLElementTagNameMap {
        "xtal-frappe-chart": XtalFrappeChart,
    }
}