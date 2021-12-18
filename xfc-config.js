import { html } from 'trans-render/lib/html';
import { doInitTransform } from 'trans-render/lib/mixins/doInitTransform';
const config = {
    config: {
        tagName: 'xtal-frappe-chart',
        propDefaults: {
            isC: true,
            initTransform: {},
            isNavigable: false,
            chartTitle: 'frappe-chart',
            type: 'axis-mixed',
            mainTemplate: html `
                <style be-loaded='${{
                preloadRef: 'xtal-frappe-chart/xtal-frappe-chart.css',
                fallback: 'https://cdn.jsdelivr.net/npm/xtal-frappe-chart/xtal-frappe-chart.css'
            }}'></style>
                <div id=target part=chart-container></div>
                <be-hive></be-hive>
            `,
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
            ...doInitTransform,
            createChart: {
                ifAllOf: ['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
        },
        propChangeMethod: 'onPropChange'
    },
};
console.log(JSON.stringify(config));
