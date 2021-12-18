import {DefineArgs} from 'trans-render/lib/types';
import {XtalFrappeChartProps, XtalFrappeChartActions} from './types';
import {INotifyMixin, INotifyPropInfo} from 'trans-render/lib/mixins/notify.js';

const config: DefineArgs<XtalFrappeChartProps & TemplMgmtProps, XtalFrappeChartActions & TemplMgmtActions & INotifyMixin, INotifyPropInfo> = {
    config:{
        tagName: 'xtal-frappe-chart',
        propDefaults:{
            isC: true,
            initTransform:{},
            isNavigable: false,
            chartTitle: 'frappe-chart',
            type: 'axis-mixed',
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
            cloneTemplate: {
                ifAllOf: ['mainTemplate'],
                ifKeyIn: ['noshadow', 'waitToInit']
            },
            doInitTransform: {
                ifAllOf: ['clonedTemplate'],
            },
            createChart:{
                ifAllOf:['isC', 'data', 'chartContainerParts'],
                ifKeyIn: ['chartTitle', 'height', 'colors', 'type', 'toolTipOptions', 'isNavigable']
            },
            
        },
        propChangeMethod: 'onPropChange'
    },
};

console.log(JSON.stringify(config));