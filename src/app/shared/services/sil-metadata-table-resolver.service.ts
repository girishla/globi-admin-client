import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from "app/shared/services/app-state.service";
import { SilMetadataTable } from "app/shared/models/sil-metadata-table.model";
import { SilMetadataTablesService } from "app/shared/services/sil-metadata-tables.service";


@Injectable()
export class SilMetadataTableResolver implements Resolve<SilMetadataTable> {
  constructor(
    private silMetadataTablesService: SilMetadataTablesService,
    private router: Router,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

      return this.silMetadataTablesService.queryAll()
        .catch((err) => {

          console.info(err);
          this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator" });

          return this.router.navigateByUrl('/')
        });
  }


}
