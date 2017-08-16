import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from "app/shared/services/app-state.service";
import { SilMetadata } from "app/shared/models/sil-metadata.model";
import { SilMetadataService } from "app/shared/services/sil-metadata.service";



@Injectable()
export class SilMetadataResolver implements Resolve<SilMetadata> {
  constructor(
    private silMetadataService: SilMetadataService,
    private router: Router,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

      return this.silMetadataService.queryTable(route.params['table'])
        .catch((err) => {

          console.info(err);
          this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator" });

          return this.router.navigateByUrl('/')
        });
  }


}
