    export class Column {
        sourceColumnName: string;
        integrationIdColumn: boolean;
        changeCaptureColumn: boolean;
        createdDate: Date;
        modifiedDate: Date;
    }

    export class Workflow {
        workflowName: string;
        workflowScmUri: string;
        workflowType: string;
        id: number;
        createdDate: Date;
        modifiedDate: Date;
    }

    export class PTPWorkflow {
        sourceName: string;
        sourceTableName: string;
        columns: Column[];
        workflow: Workflow;
        createdDate: Date;
        modifiedDate: Date;
    }


