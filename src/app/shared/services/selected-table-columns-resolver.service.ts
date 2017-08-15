import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";
import { AppStateService } from "app/shared/services/app-state.service";


@Injectable()
export class SelectedTableColumnsResolver implements Resolve<SourceTableColumn[]> {
  constructor(
    private sourceTableColumnsService: SourceTableColumnsService,
    private router: Router,
    private ptpStateService: PTPStateService,
    private appStateService: AppStateService
  ) { }


  private getMappedSourceCols(sourceCols: SourceTableColumn[]): SourceTableColumn[] {

    sourceCols = sourceCols.filter(col => this.existsInSelectedCols(col.columnName));


    sourceCols.forEach((sourceCol) =>  {

      if (this.ptpStateService.selectedWorkflowCols) {


        let selectedWorkflowColMatched = this.ptpStateService.selectedWorkflowCols.filter(col => col.sourceColumnName === sourceCol.columnName)[0];

        sourceCol.buidFlag = selectedWorkflowColMatched.buidColumn;
        sourceCol.ccFlag = selectedWorkflowColMatched.changeCaptureColumn;
        sourceCol.integrationIdFlag = selectedWorkflowColMatched.integrationIdColumn;
        sourceCol.pguidFlag = selectedWorkflowColMatched.pguidColumn;


      }

    });


    return sourceCols;

  }

  private existsInSelectedCols(colName: string): boolean {

    let exists = false;
    if (this.ptpStateService.selectedWorkflowCols) {
      exists = this.ptpStateService.selectedWorkflowCols.filter(wfCol => wfCol.sourceColumnName === colName).length > 0
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
        .catch((err) => {

          console.info(err);
          this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator" });

          return this.router.navigateByUrl('/')
        });
    }


  }


}
