import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";
import { AppStateService } from "app/shared/services/app-state.service";


@Injectable()
export class SourceTableResolver implements Resolve<SourceTable> {
  constructor(
    private sourceTablesService: SourceTablesService,
    private router: Router,
    private ptpStateService: PTPStateService,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    if (this.ptpStateService.sourceTableList) {
      return Observable.of(this.ptpStateService.sourceTableList)
    }
    else {
      return this.sourceTablesService.queryAll(route.params['ds'])
        .catch((err) => {

          console.info(err);
          this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator" });

          return this.router.navigateByUrl('/')
        });
    }

  }


}
