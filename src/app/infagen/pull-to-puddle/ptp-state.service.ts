import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { Injectable } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";

@Injectable()
export class PTPStateService {
  selectedSource:string;
  selectedTable:string;
  sourceTableList: SourceTable[];
  sourceTableCols: SourceTableColumn[];
  selectedCols:SourceTableColumn[];
  selectedWorkflowCols:PTPWorkflowColumn[];
}