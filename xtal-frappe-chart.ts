import { CE } from 'trans-render/lib/CE.js';
import {tm, TemplMgmtProps, TemplMgmtActions} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import 'be-loaded/be-loaded.js';
import {NotifyMixin, INotifyMixin, INotifyPropInfo} from 'trans-render/lib/mixins/notify.js';
import {XtalFrappeChartProps, XtalFrappeChartActions, ChartOptions, XtalFrappeChartEventNameMap, IAddDataPointParams, SelectedElement, SelectedElementEventDetail} from './types.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from "frappe-charts/dist/frappe-charts.esm.js";


const mainTemplate = tm.html`
<style be-loaded='{
    "preloadRef": "xtal-frappe-chart/xtal-frappe-chart.css",
    "fallback": "https://cdn.jsdelivr.net/npm/xtal-frappe-chart/xtal-frappe-chart.css"
}'></style>
<div id=target part=chart-container></div>
<be-hive></be-hive>
`;

/**
 * Web component wrapper around the cool Frappe chart (https://frappe.io/charts) library.
 * @element xtal-frappe-chart
 * @tag xtal-frappe-chart
 * @event selected-element-changed - fires when user selects chart data element
 * @property {string} [chartTitle] - title of chart
 * @attrib {string} [chart-title] - title of chart
 * @property {HeatMapData | TabularData} [data] - data to be displayed in chart
 * @attrib {string} [data] - data to be displayed in chart (JSON string)
 * @property {'axis-mixed' | 'bar' | 'line' | 'scatter' | 'pie' | 'percentage'} [type] - type of chart to be displayed
 * @attrib {string} [type] - type of chart
 * @property {boolean} [isNavigable] - whether or not chart is navigable
 * @attrib {string} [is-navigable] - whether or not chart is navigable
 * @property {IAddDataPointParams} [newDataPoint] - add new data point to chart
 * @attrib {string} [new-data-point] - add new data point to chart
 * @property {number} [staleDataPoint] - remove data point from chart
 * @attrib {number} [stale-data-point] - remove data point from chart
 * @property {number} [height] - height of chart
 * @attrib {number} [height] - height of chart
 * @property {string[]} [colors] - colors to be used in chart
 * @attrib {string} [colors] - colors to be used in chart (JSON string)
 */
export class XtalFrappeChartCore extends HTMLElement implements XtalFrappeChartActions{

    #chart: Chart;
    createChart({data, chartTitle, height, colors, type, domCache, toolTipOptions, isNavigable, chartContainerParts}: this){
        const chartOptions: ChartOptions = {
            data,
            title: chartTitle,
            colors,
            height,
            type,
            toolTipOptions,
            isNavigable
        };
        setTimeout(() =>{
            this.#chart = new Chart(chartContainerParts[0], chartOptions);
            setTimeout(() => {
                this.#chart["parent"].addEventListener("data-select", this.handleDataSelect);
            }, 50);
        }, 0);
    }

    handleDataSelect = (e: any) => {
        this.selectedElement = {
            values: e.values,
            label: e.label,
            index: e.index
        }
    }
}

export interface XtalFrappeChartCore extends XtalFrappeChartProps{}

const ce = new CE<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo>({
    config:{
        tagName: 'xtal-frappe-chart',
        propDefaults:{
            isC: true,
            initTransform:{},
            isNavigable: false,
            chartTitle: 'frappe-chart',
            type: 'axis-mixed',
        },
        propInfo:{
            chartContainerParts:{
                isRef: true,
            },
            selectedElement:{
                notify:{
                    dispatch: true,
                    echoTo: 'value'
                }
            },
            value:{
                notify:{dispatch: true,}
            }
        },
        actions:{
            ...tm.doInitTransform,
            createChart:{
                ifAllOf:['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
            
        },
        propChangeMethod: 'onPropChange'
    },
    complexPropDefaults:{
        mainTemplate,
    },

    mixins: [NotifyMixin, tm.TemplMgmtMixin],
    superclass: XtalFrappeChartCore,
});



export const XtalFrappeChart = ce.classDef!;

declare global {
    interface HTMLElementTagNameMap {
        "xtal-frappe-chart": XtalFrappeChartCore,
    }
}

