// @ts-check
import {Mount} from 'trans-render/Mount.js';
import {
    Chart,
    PercentageChart,
    PieChart,
    Heatmap,
    AxisChart
} from 'frappe-charts/dist/frappe-charts.esm.js';

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
    static config = {
        shadowRootInit:{
            mode: 'open'
        },
        mainTemplate: String.raw `
            <div id=target part=chart-container></div>
        `,
        xform: {
            '# target': {
                m: {
                    on: 'load',
                    s: 'target',
                    toValFrom: '.'
                }
            }
        },
        propDefaults:{
            isC: true,
            isNavigable: false,
            chartTitle: 'frappe-chart',
            
        },
        propInfo: {
            ...super.mntCfgMxn.propInfo,
            data: {
                attrName: 'data',
                parse: true,
                type: 'Object'
            },
            colors:{
                attrName: 'colors',
                parse: true,
                type: 'Object'
            },
            height:{
                attrName: 'height',
                parse: true,
                type: 'Number'
            },
            type:{
                attrName: 'type',
                parse: true,
                type: 'String'
            },
            isNavigable:{
                attrName: 'is-navigable',
                parse: true,
                type: 'Boolean'
            },
            target: {},

        },
        actions:{
            ...super.mntCfgMxn.actions,
            createChart: {
                ifAllOf: ['data', 'target'],
            }
        },

        styles: String.raw `
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
    `
    }

}

await XtalFrappeChart.bootUp();

customElements.define('xtal-frappe-chart', XtalFrappeChart);