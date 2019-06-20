import {Chart, PercentageChart, PieChart, Heatmap, AxisChart} from 'frappe-charts/dist/frappe-charts.esm.js';
import {XtallatX} from 'xtal-element/xtal-latx.js';
import {define} from 'trans-render/define.js';
import {disabled, hydrate} from 'trans-render/hydrate.js';

const data = 'data';
declare var xtal_frappe_chart;
declare var frappe;
export interface IAddDataPointParams{
    label: string, 
    valueFromEachDataset: number[], 
    index?: number;
}



function loadCss(url: string){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', e =>{
        init();
    })
    document.head.appendChild(link);
}

/**
 * `xtal-frappe-charts`
 * Dependency free web component wrapper around frappé charting library
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
*/        
export class XtalFrappeChart extends  XtallatX(hydrate(HTMLElement)){
    static get is(){return 'xtal-frappe-chart';}
    _data: object;
    _chart: Chart;
    _previousData: object;
    value: object;
    constructor(){
        super();
        //

    }

    /**
     * @type {object} Data to chart
     */
    get data(){
        return this._data;
    }
    set data(val){
        this._data = val;
        this.onPropsChange();
    }
    static get observedAttributes() {
        return super.observedAttributes.concat( [
            data,
        ]);
    }



    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case data:
                this._data = JSON.parse(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
        this.onPropsChange();
    }
    onPropsChange(){
        if(this._disabled || !this._data || (typeof(this._data) !== 'object')) return;
        setTimeout(() =>{
            this.loadChart();
        }, 50);
        
    }


    _selectedElement : any[];
    get selectedElement(){
        return this._selectedElement;
    }

    set selectedElement(nv){
        this._selectedElement = nv;
        this.value = nv;
        this.de('selected-element', {
            value: nv
        });        
    }

    loadChart(){
        this.style.display="block";
        if(this._previousData && this._data === this._previousData) return;
        this._previousData = this._data;
        //this._data['parent'] = this;
        if(typeof(Chart) !== 'undefined'){
            this._chart = new Chart(this, this._data);
        }else{
            this._chart = new frappe.Chart(this, this._data);
        }
        setTimeout(() =>{
            this._chart['parent'].addEventListener('data-select', (e) => {
                const selectedData = [];
                this._data['data'].datasets.forEach(dataSet => {
                    selectedData.push(dataSet.values[e.index]);
                });
                this.selectedElement = selectedData;
            });
        }, 50);

        this._pendingNewDataPoints.forEach(dp =>{
            this._chart.addDataPoint(dp.label, dp.valueFromEachDataset, dp.index);
        })
    }
    _pendingNewDataPoints : IAddDataPointParams[] = [];
    _newDataPoint: IAddDataPointParams;
    get newDataPoint(){
        return this._newDataPoint;
    }
    set newDataPoint(val){
        this._newDataPoint = val;
        if(this._chart){
            this._chart.addDataPoint(val.label, val.valueFromEachDataset, val.index);
        }else{
            this._pendingNewDataPoints.push(val);
        }
    }

    _staleDataPoint: number;
    get staleDataPoint(){
        return this._staleDataPoint;
    }
    set staleDataPoint(val){
        this._staleDataPoint = val;
        this._chart.removeDataPoint(val);
    }

    _updateData: any;
    get updateData(){
        return this._updateData;
    }
    set updateData(val){
        this._updateData = val;
        this._chart.update(val);
    }

    _connected: boolean;
    connectedCallback(){
        this.propUp([data,'newDataPoint', 'staleDataPoint', 'updateData'] );
        this._connected = true;
        this.onPropsChange();
    }

}
function init(){
    define(XtalFrappeChart);
}

//thanks Firefox!
const link = self['xtal_frappe-chart_css'] as HTMLLinkElement;
if(link){
    if(link.rel !== 'stylesheet'){
        loadCss(link.href)
    }else{
        init();
    }
}else{
    loadCss('https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.css');
}

