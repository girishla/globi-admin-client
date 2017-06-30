import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { Injectable } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";

@Injectable()
export class PTPStateService {
  selectedSource: string;
  selectedTable: string;
  sourceTableList: SourceTable[];
  sourceTableCols: SourceTableColumn[];
  selectedCols: SourceTableColumn[];
  selectedWorkflowCols: PTPWorkflowColumn[];

  public clearState() {

    console.info("clearing PTP state on destroy")

    this.selectedSource=null;
    this.selectedCols=null;
    this.selectedSource=null;
    this.selectedWorkflowCols=null;
    this.sourceTableCols=null;
    this.sourceTableList=null;


  }

  getWorkflowName(){

    return "PTP_" + this.selectedSource + "_" + this.selectedTable

  }

}