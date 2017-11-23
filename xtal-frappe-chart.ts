declare class Chart{constructor(data)};
(function () {
    interface IDynamicJSLoadStep{
        src?: string;
    }
    const _lpn = 'lib-path';
    const _dn = 'data';
    class XtalFrappeChart extends HTMLElement{
        _libPath = 'https://unpkg.com/frappe-charts@0.0.7/dist/frappe-charts.min.iife.js';
        _data: object;
        _chart: Chart;
        _previousData: object;
        constructor(){
            super();
            //this.attachShadow({mode: 'open'});
            this.style.display="block";
            // this.style.width="500px";
            // this.style.height = "500px";
        }
        get libPath(){
            return this._libPath;
        }
        set libPath(val){
            this.setAttribute(_lpn, val)
        }
        get data(){
            return this._data;
        }
        set data(val){
            this._data = val;
            this.connectedCallback();
        }
        static get observedAttributes() {
            return [
                /** @type {string} Url to Frappe Library. By default uses
                 *  https://unpkg.com/frappe-charts@0.0.3/dist/frappe-charts.min.iife.js
                 *  but you can install a local copy and use this property to point to it.
                 */
                _lpn,
                /**
                 * @type {object} Data to chart
                 */
                _dn,
            ]
        }
        _upgradeProperty(prop) {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }
        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            switch (name) {
                case _lpn:
                    this._libPath = newValue;
                    break;
                case _dn:
                    this._data = JSON.parse(newValue);
                    break;
            }
        }
        loadChart(){
            if(!this._data) return;
            if(typeof this._data !== 'object') return; 
            if(this._previousData && this._data === this._previousData) return;
            this._previousData = this._data;
            //this.shadowRoot.innerHTML = "<div></div>";
            //this._data['parent'] = this.shadowRoot;
            //this._data['parent'] = this.shadowRoot.firstChild;
            this._data['parent'] = this;
            this._chart = new Chart(this._data);
            this._chart['parent'].addEventListener('data-select', (e) => {
                const selectedData = [];
                this._data['data'].datasets.forEach(dataSet => {
                    
                    selectedData.push(dataSet.values[e.index]);
                });
                this['selectedElement'] = selectedData;
                const newEvent = new CustomEvent('selected-element-changed', {
                    detail: {
                        value: selectedData
                    },
                    bubbles: true,
                    composed: false,
                } as CustomEventInit);
                this.dispatchEvent(newEvent);
            });
        }

        connectedCallback(){
            this._upgradeProperty(_dn);
            if(typeof(Chart) === 'undefined'){
                this.downloadJSFilesInParallelButLoadInSequence([
                    {
                        src: this._libPath
                    }
                ]).then(() => this.loadChart())
            }else{
                this.loadChart();
            }
        }
        downloadJSFilesInParallelButLoadInSequence(refs: IDynamicJSLoadStep[]){
            //debugger;
            //see https://www.html5rocks.com/en/tutorials/speed/script-loading/
            return new Promise((resolve, reject) => {
                const notLoadedYet : {[key: string] : boolean} = {};
                const nonNullRefs = refs.filter(ref => ref !== null);
                nonNullRefs.forEach(ref => {
                    notLoadedYet[ref.src] = true;
                });
                nonNullRefs.forEach(ref =>{
                    const script = document.createElement('script');
                    script.src = ref.src;
                    script.async = false;
                    script.onload = () =>{
                        //delete notLoadedYet[script.src];
                        Object.keys(notLoadedYet).forEach(key =>{
                            if(script.src.endsWith(key)){
                                delete notLoadedYet[key];
                                return;
                            }
                        })
                        if(Object.keys(notLoadedYet).length === 0){
                            resolve();
                        }
                    }
                    document.head.appendChild(script);
                });
            })

        }
    }
    customElements.define('xtal-frappe-chart', XtalFrappeChart);
})();