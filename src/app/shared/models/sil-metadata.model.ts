   export class SilMetadata {
        tableName: string;
        stageName: string;
        columnOrder: string;
        columnName: string;
        columnType: string;
        columnSubType: string;
        columnDataType: string;
        columnPrecision: number;
        columnScale: number;
        stageColumnFlag: boolean;
        targetColumnFlag: boolean;
        legacyColumnFlag: boolean;
        miniDimColumnFlag: boolean;
        domainLookupColumnFlag: boolean;
        autoColumnFlag: boolean;
        dimTableName?: any;
        nullable: boolean;
    }