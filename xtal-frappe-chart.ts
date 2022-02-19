import { CE } from 'trans-render/lib/CE.js';
import {DefineArgs} from 'trans-render/lib/types';
import {TemplMgmtProps, TemplMgmtActions, TemplMgmt} from 'trans-render/lib/mixins/TemplMgmt.js';
import {html} from 'trans-render/lib/html.js';
import {importJSON} from 'be-loaded/importJSON.js';
import {NotifyMixin, INotifyMixin, INotifyPropInfo} from 'trans-render/lib/mixins/notify.js';
import {XtalFrappeChartProps, XtalFrappeChartActions, ChartOptions, XtalFrappeChartEventNameMap, IAddDataPointParams, SelectedElement, SelectedElementEventDetail} from './types.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from "frappe-charts/dist/frappe-charts.esm.js";



/**
 * 
 * @element xtal-frappe-chart
 * @tag xtal-frappe-chart
 * @event selected-element-changed - fires when user selects chart data element


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
            this.#chart = new Chart(chartContainerParts[0].deref(), chartOptions);
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

const ce = new CE<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo>();

async function register(){
    const config = await importJSON('xtal-frappe-chart/xfc-config.json', 'https://cdn.jsdelivr.net/npm/xtal-frappe-chart/xfc-config.json');
    const def = config.default as DefineArgs<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo>;
    ce.def({
        ...def,    
        mixins: [NotifyMixin, TemplMgmt],
        superclass: XtalFrappeChartCore,
    });
  
}

export const XtalFrappeChart = ce.classDef!;

register();



declare global {
    interface HTMLElementTagNameMap {
        "xtal-frappe-chart": XtalFrappeChartCore,
    }
}

