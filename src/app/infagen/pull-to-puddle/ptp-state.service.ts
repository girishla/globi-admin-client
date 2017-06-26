import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { Injectable } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";

@Injectable()
export class PTPStateService {
  selectedSource:string;
  selectedTable:string;
  tableNameList: string[]=[];
  sourceTableList: SourceTable[];
  columnsList:SourceTableColumn[];
}