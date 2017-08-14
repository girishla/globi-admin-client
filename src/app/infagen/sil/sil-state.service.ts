import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { Injectable } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { SILWorkflowColumn } from "app/shared/models/sil-workflow-cols.model";

@Injectable()
export class SILStateService {

  selectedTable: string;

  editMode:Boolean=false;
  targetTableName:string;


  
  public clearState() {

    console.info("clearing SIL state on destroy")

    this.selectedTable=null;
    this.targetTableName=null;

    this.editMode=false;


  }


}