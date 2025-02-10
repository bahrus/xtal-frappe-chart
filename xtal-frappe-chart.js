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
            setTimeout(() => {
                this.#chart["parent"].addEventListener("data-select", this.handleDataSelect);
            }, 50);
        }, 0);
    }
    /**
     * @type {MntCfg<XtalFrappeChartProps  & MountProps, XtalFrappeChartActions & MountActions>}
     */
    static config = config;

}

await XtalFrappeChart.bootUp();

customElements.define('xtal-frappe-chart', XtalFrappeChart);

export class DataSelectedEvent extends Event{
    /**
     * @type {Array<number>}
     */
    values;

    /**
     * 
     */
    label;

}