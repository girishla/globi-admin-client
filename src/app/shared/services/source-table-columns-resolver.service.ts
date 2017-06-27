import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";


@Injectable()
export class SourceTableColumnsResolver implements Resolve<SourceTableColumn[]> {
  constructor(
    private sourceTableColumnsService: SourceTableColumnsService,
    private router: Router,
    private ptpStateService: PTPStateService
  ) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    if (this.ptpStateService.sourceTableCols && this.ptpStateService.sourceTableCols.length>0) {
      return Observable.of(this.ptpStateService.sourceTableCols)
    }
    else {
      return this.sourceTableColumnsService.queryAll(route.params['ds'], route.params['table'])
        .catch((err) => this.router.navigateByUrl('/'));
    }
  }


}
