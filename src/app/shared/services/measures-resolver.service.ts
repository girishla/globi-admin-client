import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Measure } from "app/shared/models/measure.model";
import { MeasuresService } from "app/shared/services/measures.service";
import { AppStateService } from "app/shared/services/app-state.service";


@Injectable()
export class MeasuresResolver implements Resolve<Measure> {
  constructor(
    private MeasuresService: MeasuresService,
    private router: Router,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

      return this.MeasuresService.queryAll()
        .catch((err) => {
          console.info(err);
          this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "Unable to retrieve dashboard measures. Please contact your Administrator" });

          return this.router.navigateByUrl('/')
        });
    

  }


}
