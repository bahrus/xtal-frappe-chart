import { XtalFrappeChart } from './xtal-frappe-chart.js';
import { define } from "trans-render/define.js";
/**
 * @element xtal-frappe-chart-example1
 */
export class XtalFrappeChartExample1 extends XtalFrappeChart {
    constructor() {
        super(...arguments);
        this.data = {
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
                        values: [25, 50, 10, 15, 18, 32, 27, 14]
                    },
                    {
                        name: "Yet Another", "color": "blue",
                        values: [15, 20, 3, -15, 58, 12, -17, 37]
                    }
                ]
            },
            type: "bar",
            height: 250,
            isNavigable: true
        };
        this.selectedElementContract = {
            trigger: /* JS */ `
        import 'https://unpkg.com/xtal-shell@0.0.25/$hell.js?module';
        import 'https://unpkg.com/xtal-frappe-chart@0.0.58/xtal-frappe-chart-example1.js?module';
        setTimeout(() =>{
            $hell.$0=document.querySelector('xtal-frappe-chart-example1');
            $hell.cd('div#target/div/svg/g[0]/g[2]/rect[2]');
            setTimeout(() =>{
              $hell.$0.dispatchEvent(new Event('click'));
            }, 500);
            
          }, 3000);
        `,
            expectedEvent: {
                name: 'selected-element-changed',
                detail: {
                    value: {
                        values: [30, 10, 3],
                        label: "6am-9am",
                        index: 2,
                    }
                },
                associatedPropName: 'selectedElement'
            }
        };
    }
    static get is() { return 'xtal-frappe-chart-example1'; }
}
define(XtalFrappeChartExample1);
