(function () {
    const _lpn = 'lib-path';
    class XtalFrappeChart extends HTMLElement{
        _libPath = 'https://unpkg.com/frappe-charts@0.0.3/dist/frappe-charts.min.iife.js';
        
        get libPath(){
            return this._libPath;
        }
        set libPath(val){
            this.setAttribute(_lpn, val)
        }
        static get observedAttributes() {
            return [
                /** @type {string} Url to Frappe Library. By default uses
                 *  https://unpkg.com/frappe-charts@0.0.3/dist/frappe-charts.min.iife.js
                 *  but you can install a local copy and use this property to point to it.
                 */
                _lpn,
            ]
        }
        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            switch (name) {
                case _lpn:
                    this._libPath = newValue;
                    break;
            }
        }
    }
})();