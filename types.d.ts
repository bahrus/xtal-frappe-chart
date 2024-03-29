import {SimpleWCInfo} from 'may-it-be/SimpleWCInfo';

declare interface WeakRef<S>{}

export interface SelectedElement {
    label: string;
    values: any[];
    index: number;
}

export interface SelectedElementEventDetail {
    value: SelectedElement
}

export interface XtalFrappeChartEventNameMap {
    'selected-element-changed': SelectedElementEventDetail;
}

export interface IAddDataPointParams {
    label: string;
    valueFromEachDataset: number[];
    index?: number;
}

export interface XtalFrappeChartProps{
    /**
     * Data to be displayed in chart (JSON string for attribute)
     */
    data: HeatMapData | TabularData;
    selectedElement: object,
    value: object,
    mainTemplate: HTMLTemplateElement | string,
    clonedTemplate: DocumentFragment | undefined,
    refs: any,

    /**
     * Add new data point to chart
     * 
     */
    newDataPoint: IAddDataPointParams;

    /**
     * Remove data point from chart
    */
    staleDataPoint: number;

    /**
     * Title of chart
     */
    chartTitle: string;

    /**
     * Height of chart
     */
    height: number;

    /**
     * Colors to be used in chart
     */
    colors: string[];

    /**
     * Type of chart to be displayed
     */
    type: ChartType;

    /**
     * Whether or not chart is navigable
     */
    isNavigable: boolean;

    toolTipOptions: any;

    isC: boolean;

    chartContainerPart: WeakRef<HTMLDivElement>[];

}


export interface XtalFrappeChartActions{
    createChart(self: this): void;
}
export type ChartType = 'axis-mixed' | 'bar' | 'line' | 'scatter' | 'pie' | 'percentage';

export interface ChartOptions{
    data?: HeatMapData | TabularData,
    title?: string,
    height?: number,
    colors?: string[],
    type?: ChartType,
    toolTipOptions: any,
    isNavigable: boolean,
    
}

export interface ChartData{
    tooltipOptions: TooltipOptions,
    valuesOverPoints: OneOrZero,
}

export interface HeatMapData extends ChartData{
    dataPoints: {[key: string]: number},
    start: Date,
    end: Date
}
//type TabularDataChartTypes = 'bar' | 'line';
export interface DataSet{
    name?: string,
    values: number[]
}
export interface TabularData extends ChartData{
    //type?: TabularDataChartTypes,
    labels?: string[],
    datasets?: any[],
    yMarkers?: Marker[],
    yRegions?: Region[],
}

export interface BarOptions{
    spaceRatio: number,
}

export type OneOrZero = 0 | 1;

export interface LineOptions{
    dotSize: number,
    regionFill: OneOrZero,
    hideDots: OneOrZero,
    hideLine: OneOrZero
    heatLine: OneOrZero,

}

export type AxisMode = 'span' | 'tick'

export interface AxisOptions{
    xAxisMode?: AxisMode,
    xIsSeries?: boolean,
}

export interface BarChartData extends TabularData{
    barOptions?: BarOptions,
    axisOptions?: AxisOptions
}
export interface LineChartData extends TabularData{
    axisOptions?: AxisOptions,
    lineOptions?: LineOptions
}

export type LeftRight = 'left' | 'right';

export interface MarkerOptions{
    labelPos?: LeftRight
}

export interface Marker{
    label?: string,
    value?: number,
    options?: MarkerOptions
}

export interface RegionOptions{
    labelPos?: LeftRight
}

export interface Region{
    label?: string,
    start?: number,
    end?: number,
    options?: RegionOptions,
}

export interface TooltipOptions{
    formatTooltipX: (d: any) => string,
    formatTooltipY: (d: any) => string,
}

/**
 * Web component wrapper around the cool Frappe chart (https://frappe.io/charts) library.
 */
export abstract class XtalFrappeChartInfo implements SimpleWCInfo<XtalFrappeChartProps>{
    src: './xtal-frappe-chart.js';
    tagName: 'xtal-frappe-chart';
    props:  XtalFrappeChartProps;
    methods: XtalFrappeChartActions;
}

export type Package = [XtalFrappeChartInfo];