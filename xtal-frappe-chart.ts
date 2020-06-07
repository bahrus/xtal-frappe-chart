import {XtalElement, define} from 'xtal-element/XtalElement.js';
import {de} from 'trans-render/hydrate.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from "frappe-charts/dist/frappe-charts.esm.js";
import { createTemplate } from "trans-render/createTemplate.js";
import {ChartOptions, XtalFrappeChartEventNameMap, IAddDataPointParams, SelectedElement, SelectedElementEventDetail, XtalFrappeChartIfc} from './types.js';
import { PESettings } from 'trans-render/types.js';
import {AttributeProps} from 'xtal-element/types.d.js';

const mainTemplate = createTemplate(/* html */ `
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:1;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
<div id=target></div>
`);


export class XtalFrappeChart extends XtalElement{

    static is = 'xtal-frappe-chart';
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

    readyToInit = true;

    readyToRender = true;

    mainTemplate = mainTemplate;

    static attributeProps: any = ({data, value, selectedElement, newDataPoint, staleDataPoint}: XtalFrappeChart) => ({
        obj: [data, value, selectedElement, newDataPoint],
        num: [staleDataPoint],
        notify: [selectedElement]
    }) as AttributeProps;


    chart: Chart;
    initTransform = {};

    handleDataSelect(e: any){
        this.value = {
            values: e.values,
            label: e.label,
            index: e.index
        }
        this.selectedElement = this.value;
    }

    updateTransforms = [
        ({data}: XtalFrappeChart) =>({
            '#target': ({target}) => {
                this.chart = new Chart(target, data);
                setTimeout(() => {
                    this.chart["parent"].addEventListener("data-select", this.handleDataSelect.bind(this));
                }, 50);
            }
        })
    ];

    propActions = [
        ({newDataPoint, self}: XtalFrappeChart) =>{
            self.chart.addDataPoint(newDataPoint.label, newDataPoint.valueFromEachDataset, newDataPoint.index);
        },
        ({staleDataPoint, self}: XtalFrappeChart) => {
            self.chart.removeDataPoint(staleDataPoint);
        }
    ]
}

define(XtalFrappeChart);