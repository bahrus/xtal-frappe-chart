import { CE } from 'trans-render/lib/CE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import { NotifyMixin } from 'trans-render/lib/mixins/notify.js';
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
const mainTemplate = tm.html `
<style>
:host{display:block;}
.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}
</style>
<div id=target part=chart-container></div>
`;
/**
 * Web component wrapper around the cool Frappe chart (https://frappe.io/charts) library.
 * @element xtal-frappe-chart
 * @tag xtal-frappe-chart
 * @event selected-element-changed - fires when user selects chart data element
 */
export class XtalFrappeChartCore extends HTMLElement {
    #chart;
    createChart({ data, chartTitle, height, colors, type, domCache, toolTipOptions, isNavigable, chartContainerParts }) {
        const chartOptions = {
            data,
            title: chartTitle,
            colors,
            height,
            type,
            toolTipOptions,
            isNavigable
        };
        setTimeout(() => {
            this.#chart = new Chart(chartContainerParts[0], chartOptions);
            setTimeout(() => {
                this.#chart["parent"].addEventListener("data-select", this.handleDataSelect.bind(this));
            }, 50);
        }, 0);
    }
    handleDataSelect(e) {
        this.selectedElement = {
            values: e.values,
            label: e.label,
            index: e.index
        };
    }
}
const ce = new CE({
    config: {
        tagName: 'xtal-frappe-chart',
        propDefaults: {
            isC: true,
            initTransform: {},
            isNavigable: false,
        },
        propInfo: {
            chartContainerParts: {
                isRef: true,
            },
            selectedElement: {
                notify: {
                    dispatch: true,
                    echoTo: 'value'
                }
            },
            value: {
                notify: { dispatch: true, }
            }
        },
        actions: {
            ...tm.doInitTransform,
            createChart: {
                ifAllOf: ['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
        },
        propChangeMethod: 'onPropChange'
    },
    complexPropDefaults: {
        mainTemplate,
    },
    mixins: [NotifyMixin, tm.TemplMgmtMixin],
    superclass: XtalFrappeChartCore,
});
export const XtalFrappeChart = ce.classDef;
