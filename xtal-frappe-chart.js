import { CE } from 'trans-render/lib/CE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import 'be-loaded/be-loaded.js';
import { NotifyMixin } from 'trans-render/lib/mixins/notify.js';
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
const mainTemplate = tm.html `
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
                this.#chart["parent"].addEventListener("data-select", this.handleDataSelect);
            }, 50);
        }, 0);
    }
    handleDataSelect = (e) => {
        this.selectedElement = {
            values: e.values,
            label: e.label,
            index: e.index
        };
    };
}
const ce = new CE({
    config: {
        tagName: 'xtal-frappe-chart',
        propDefaults: {
            isC: true,
            initTransform: {},
            isNavigable: false,
            chartTitle: 'frappe-chart',
            type: 'axis-mixed',
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
