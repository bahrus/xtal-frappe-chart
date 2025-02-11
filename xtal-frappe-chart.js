// @ts-check
import {Mount} from 'trans-render/Mount.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from 'frappe-charts/dist/frappe-charts.esm.js';
import {config} from './config.js';

/** @import {XtalFrappeChartProps, XtalFrappeChartActions, ChartOptions} from  './ts-refs/xtal-frappe-chart/types' */
/** @import {MntCfg, MountProps, MountActions} from './ts-refs/trans-render/types' */

/**
 * @implements {XtalFrappeChartActions}
 */
export class XtalFrappeChart extends Mount {

    /**
     * @type {Chart}
     */
    #chart;
    /**
     * 
     * @param {XtalFrappeChartProps} self 
     */
    createChart(self) {
        const {
            data, chartTitle, height, colors, type,
            toolTipOptions, isNavigable, chartContainerPart,
            target
        } = self;
        console.log({data, chartTitle, height, colors, type, toolTipOptions, isNavigable, chartContainerPart});
        /**
         * @type {ChartOptions}
         */
        const chartOptions = {
            data,
            title: chartTitle,
            colors,
            height,
            type,
            toolTipOptions,
            isNavigable
        };
        setTimeout(() =>{
            this.#chart = new Chart(target, chartOptions);
            // setTimeout(() => {
            //     console.log({parent: this.#chart["parent"]});
            //     this.#chart["parent"].addEventListener("data-select", this.handleDataSelect);
            // }, 50);
        }, 0);
    }

    /**
     * 
     * @param {Event} e 
     */
    handleDataSelect(e){
        console.log({e})
        // this.selectedElement = {
        //     values: e.values,
        //     label: e.label,
        //     index: e.index
        // }
    }
    /**
     * @type {MntCfg<XtalFrappeChartProps  & MountProps, XtalFrappeChartActions & MountActions>}
     */
    static config = config;

}

await XtalFrappeChart.bootUp();

customElements.define('xtal-frappe-chart', XtalFrappeChart);

export class DataSelectedEvent extends Event{

    static EventName = 'data-selected';
    /**
     * @type {Array<number>}
     */
    values;

    /**
     * @type {string}
     */
    label;

    /**
     * @type {number}
     */
    index;

    constructor(values, label, index){
        super(DataSelectedEvent.EventName);
        this.values = values;
        this.label = label;
        this.index = index;
    }

}