

import { SILWorkflowColumn } from "app/shared/models/sil-workflow-cols.model";


export class SILWorkflow {
    tableBaseName: string;
    id: number;
    loadType: string;
    stageName: string;
    columns: SILWorkflowColumn[];
    createdDate?: any;
    modifiedDate: Date;
    workflowName: string;
    workflowUri: string;
    workflowType: string;
    workflowStatus: string;
    workflowRunStatus?: any;
    message: string;
    _links: Links;
}

export interface Links {
    self: Self;
    SILWorkflow: SILWorkflow;
}
export interface SILWorkflow {
    href: string;
}
export interface Self {
    href: string;
}



export class SILTopDownRequest {
        loadType: string;
        tableName: string;
  }