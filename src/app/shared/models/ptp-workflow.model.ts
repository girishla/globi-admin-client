export class Column {
    sourceColumnName: string;
    integrationIdColumn: boolean;
    changeCaptureColumn: boolean;
    pguidColumn: boolean;
    buidColumn: boolean;
    createdDate: Date;
    modifiedDate: Date;
}

export class PTPWorkflow {
    sourceName: string;
    sourceTableName: string;
    sourceFilter?: any;
    columns: Column[];
    id: number;
    createdDate: Date;
    modifiedDate: Date;
    workflowName: string;
    workflowUri: string;
    workflowType: string;
    workflowStatus: string;
    _links: Links;
}

export interface Links {
    self: Self;
    pTPWorkflow: PTPWorkflow;
}
export interface PTPWorkflow {
    href: string;
}
export interface Self {
    href: string;
}