import { XtalFrappeChart } from './xtal-frappe-chart.js';
import { define } from "trans-render/define.js";
import { TabularData, ChartOptions, EventNameMap } from './types.js';

type EventContractMap<K extends keyof EventNameMap> = {
    script: string,
    expectedEventName: K,
    expectedEventDetail: EventNameMap[K],
};
/**
 * @element xtal-frappe-chart-example1
 */
export class XtalFrappeChartExample1 extends XtalFrappeChart {
    static get is() { return 'xtal-frappe-chart-example1'; }
    data = {
        title: "My Awesome Chart",
        data: {
            labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
                "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
            datasets: [
                {
                    name: "Some Data", "color": "light-blue",
                    values: [25, 40, 30, 35, 8, 52, 17, -4]
                },
                {
                    name: "Another Set", "color": "violet",
                    values: [25, 50, -10, 15, 18, 32, 27, 14]
                },
                {
                    name: "Yet Another", "color": "blue",
                    values: [15, 20, -3, -15, 58, 12, -17, 37]
                }
            ]
        } as TabularData,
        type: "bar",
        height: 250,
        isNavigable: true
    } as ChartOptions

    expectation1: EventContractMap<'selected-element-changed'> = {
        script: /* JS */`
        setTimeout(() =>{
            $hell.cd("/xtal-frappe-chart#chart/div#target/div/svg/g[0]/g[2]/rect[2]");
            setTimeout(() =>{
              $hell.$0.dispatchEvent(new Event('click'));
            }, 500);
            
          }, 3000);
        `,
        expectedEventName: 'selected-element-changed',
        expectedEventDetail: {
            value: {
                values: [30, -10, -3],
                label: "6am-9am",
                index: 2,
            }
        },
        
    }


}
define(XtalFrappeChartExample1);