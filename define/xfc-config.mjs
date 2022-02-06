import { html } from 'may-it-be/html.js';
import { beTransformed } from 'may-it-be/index.js';
const config = {
    config: {
        tagName: 'xtal-frappe-chart',
        propDefaults: {
            isC: true,
            transform: {},
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
                <script type=module>
                    import('be-loaded/be-loaded.js');
                </script>
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
            ...beTransformed,
            createChart: {
                ifAllOf: ['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
        },
        propChangeMethod: 'onPropChange'
    },
};
console.log(JSON.stringify(config));
