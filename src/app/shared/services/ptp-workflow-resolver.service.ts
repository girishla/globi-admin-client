import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { AppStateService } from "app/shared/services/app-state.service";


@Injectable()
export class PTPWorkflowResolver implements Resolve<PTPWorkflow> {
  constructor(
    private PTPWorkflowsService: PTPWorkflowsService,
    private router: Router,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.PTPWorkflowsService.queryAll()
      .catch((err) => {

        console.info(err);
        this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator"});

        return this.router.navigateByUrl('/')
      });
  }


}
