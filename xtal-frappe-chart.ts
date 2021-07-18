import {xc, ReactiveSurface, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {html} from 'xtal-element/lib/html.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from "frappe-charts/dist/frappe-charts.esm.js";

import {ChartOptions, XtalFrappeChartEventNameMap, IAddDataPointParams, SelectedElement, SelectedElementEventDetail, XtalFrappeChartProps} from './types.js';
const mainTemplate = html`
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
<div id=target></div>
`;
const refs = {targetId: ''};

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
    /**
     * @private
     */
    refs = refs;
    /**
     * @private
     */
    self = this;
    /**
     * @private
     */
    propActions = propActions;
    /**
     * @private
     */
    reactor = new xc.Rx(this);
    
    /**
     * @readonly
     */
    value: SelectedElement;
    /**
     * @readonly
     */
    selectedElement: SelectedElement;

    /**
     * @private
     */
    isReallyConnected = false;

    /**
     * @private
     */
    chart: Chart;

    handleDataSelect(e: any){
        this.selectedElement = {
            values: e.values,
            label: e.label,
            index: e.index
        }
    }
    connectedCallback(){
        xc.mergeProps(this, slicedPropDefs);
        this.isReallyConnected = true;
    }
    onPropChange(name: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    /**
     * @private
     */
    mainTemplate = mainTemplate;
}

export interface XtalFrappeChart extends XtalFrappeChartProps{}


export const addDataPoint = ({newDataPoint, chart}: XtalFrappeChart) =>{
    chart.addDataPoint(newDataPoint.label, newDataPoint.valueFromEachDataset, newDataPoint.index);
};
export const removeDataPoint = ({staleDataPoint, chart}: XtalFrappeChart) => {
    if(staleDataPoint === undefined) return;
    chart.removeDataPoint(staleDataPoint);
}
export const linkChart = ({data, chartTitle, height, colors, type, domCache, isReallyConnected, toolTipOptions, self}: XtalFrappeChart) => {
    const chartOptions: ChartOptions = {
        data,
        title: chartTitle,
        colors,
        height,
        type,
        toolTipOptions
    };
    setTimeout(() =>{
        self.chart = new Chart(domCache[refs.targetId], chartOptions);
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

const baseProp: PropDef = {
    dry: true,
    async: true
}

const str1: PropDef = {
    ...baseProp,
    type: String,
}

const num1: PropDef = {
    ...baseProp,
    type: Number,
}

const bool1: PropDef = {
    ...baseProp,
    type: Boolean,
}
const nnBool1: PropDef = {
    ...bool1,
    stopReactionsIfFalsy: true,
}

const obj1: PropDef = {
    type: Object,
    dry: true,
    async: true,
    parse: true,
};
const nnObj1: PropDef = {
    ...obj1,
    stopReactionsIfFalsy: true,
}
const propDefMap: PropDefMap<XtalFrappeChart> = {
    ...xp.props,
    data: nnObj1, newDataPoint: nnObj1,
    isReallyConnected: nnBool1,
    chartTitle: str1,
    height: num1,
    colors: obj1,
    toolTipOptions: obj1,
    type: str1,
    isNavigable: bool1,
    selectedElement: {
        type: Object,
        notify: true,
        echoTo: 'value'
    },
    value: {
        type: Object,
        notify: true,
    },
    staleDataPoint: {
        ...baseProp,
        type: Number,
    }
};

const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFrappeChart, slicedPropDefs, 'onPropChange');
xc.define(XtalFrappeChart);

declare global {
    interface HTMLElementTagNameMap {
        "xtal-frappe-chart": XtalFrappeChart,
    }
}