
export interface MeasureResponse {
    _embedded: EmbeddedMeasures;
    _links: Object
}


export interface Measure {
    dimension: string;
    type: string;
    measure: number;
}



export interface EmbeddedMeasures {
    measures:Measure[]
}