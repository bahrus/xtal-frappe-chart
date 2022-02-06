import {DefineArgs} from 'trans-render/lib/types';
import {XtalFrappeChartProps, XtalFrappeChartActions} from '../types';
import {TemplMgmtProps, TemplMgmtActions} from 'trans-render/lib/mixins/TemplMgmt.js';
import {html} from 'may-it-be/html.js';
import {beTransformed} from 'may-it-be/index.js';
import {INotifyMixin, INotifyPropInfo} from 'trans-render/lib/mixins/notify.js';
import {BeLoadedVirtualProps as bl} from 'be-loaded/types';


const config: DefineArgs<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo> = {
    config:{
        tagName: 'xtal-frappe-chart',
        propDefaults:{
            isC: true,
            transform:{},
            isNavigable: false,
            chartTitle: 'frappe-chart',
            type: 'axis-mixed',
            mainTemplate: html`
                <style be-loaded='${{
                    preloadRef: 'xtal-frappe-chart/xtal-frappe-chart.css',
                    fallback: 'https://cdn.jsdelivr.net/npm/xtal-frappe-chart/xtal-frappe-chart.css'
                } as bl}'></style>
                <div id=target part=chart-container></div>
                <be-hive></be-hive>
                <script type=module>
                    import('be-loaded/be-loaded.js');
                </script>
            `,
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
            ...beTransformed,
            createChart:{
                ifAllOf:['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
            
        },
        propChangeMethod: 'onPropChange'
    },
};

console.log(JSON.stringify(config));