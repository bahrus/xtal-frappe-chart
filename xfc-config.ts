import {DefineArgs} from 'trans-render/lib/types';
import {XtalFrappeChartProps, XtalFrappeChartActions} from './types';
//import {tm, TemplMgmtProps, TemplMgmtActions} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import {} from 'trans-render/lib/mixins/TemplMgmt.js';
import {html} from 'may-it-be/html.js';
//import { doInitTransform } from 'trans-render/lib/mixins/doInitTransform.mjs';
import {INotifyMixin, INotifyPropInfo} from 'trans-render/lib/mixins/notify.js';
import {BeLoadedVirtualProps as bl} from 'be-loaded/types';


const config: DefineArgs<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo> = {
    config:{
        tagName: 'xtal-frappe-chart',
        propDefaults:{
            isC: true,
            initTransform:{},
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
            ...doInitTransform,
            createChart:{
                ifAllOf:['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
            
        },
        propChangeMethod: 'onPropChange'
    },
};

console.log(JSON.stringify(config));