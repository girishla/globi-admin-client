import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";


@Injectable()
export class SelectedTableColumnsResolver implements Resolve<SourceTableColumn[]> {
  constructor(
    private sourceTableColumnsService: SourceTableColumnsService,
    private router: Router,
    private ptpStateService: PTPStateService
  ) { }


  private getMappedSourceCols(sourceCols: SourceTableColumn[]): SourceTableColumn[] {

    sourceCols = sourceCols.filter(col => this.existsInSelectedCols(col.columnName));

    sourceCols.forEach(sourceCol => {

      if (this.ptpStateService.selectedWorkflowCols) {

        this.ptpStateService.selectedWorkflowCols.filter(col => col.sourceColumnName === sourceCol.columnName).forEach(col => {

          sourceCol.buidIdFlag = col.buidColumn;
          sourceCol.ccFlag = col.changeCaptureColumn;
          sourceCol.integrationIdFlag = col.integrationIdColumn;
          sourceCol.pguidFlag = col.pguidColumn;

        })

      }


    });


    return sourceCols;

  }

  private existsInSelectedCols(colName: string): boolean {

    let exists = false;
    if (this.ptpStateService.selectedWorkflowCols) {
      exists = this.ptpStateService.selectedWorkflowCols.find(wfCol => wfCol.sourceColumnName === colName) != null
    }

    return exists;
  }



  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    if (this.ptpStateService.selectedCols) {
      return Observable.of(this.ptpStateService.selectedCols)
    }
    else {
      return this.sourceTableColumnsService.queryAll(route.params['ds'], route.params['table'])
        .map(cols => this.getMappedSourceCols(cols))
        .do(col => console.log(col))
        .catch((err) => this.router.navigateByUrl('/'));
    }


  }


}
