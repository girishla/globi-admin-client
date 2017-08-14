   export class SILWorkflowColumn {
        columnName: string;
        columnType: string;
        columnOrder: number;
        dimTableName: string;
        stageTableColumn: boolean;
        targetColumn: boolean;
        legacyColumn: boolean;
        miniDimColumn: boolean;
        domainLookupColumn: boolean;
        autoColumn: boolean;
        createdDate: Date;
        modifiedDate: Date;
        content: any[];
        links: any[];
    }
