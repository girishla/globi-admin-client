

import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";

export class PTPWorkflow {
    sourceName: string;
    sourceTableName: string;
    sourceFilter?: any;
    columns: PTPWorkflowColumn[];
    id: number;
    createdDate: Date;
    modifiedDate: Date;
    workflowName: string;
    workflowUri: string;
    workflowType: string;
    workflowStatus: string;
    message: string;
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

// export interface MessageObject {
//     createdDate: Date;
//     modifiedDate: Date;
//     statusMessage: string;
// }