export interface SelectedElement {
    label: string;
    values: any[];
    index: number;
}

export interface SelectedElementEventDetail {
    value: SelectedElement
}

export interface EventNameMap {
    'selected-element-changed': SelectedElementEventDetail;
}

export interface IAddDataPointParams {
    label: string;
    valueFromEachDataset: number[];
    index?: number;
}

export interface XtalFrappeChartIfc{
    data: ChartOptions;
    readonly selectedElement: object,
}

export interface ChartOptions{
    data?: HeatMapData | TabularData,
    title?: string,
    height?: number,
    colors?: string[],
    type?: 'axis-mixed' | 'bar' | 'line' | 'scatter' | 'pie' | 'percentage'
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