import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SILWorkflow } from "app/shared/models/sil-workflow.model";
import { SILWorkflowsService } from "app/shared/services/sil-workflows.service";
import { AppStateService } from "app/shared/services/app-state.service";


@Injectable()
export class SILWorkflowResolver implements Resolve<SILWorkflow> {
  constructor(
    private SILWorkflowsService: SILWorkflowsService,
    private router: Router,
    private appStateService: AppStateService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.SILWorkflowsService.queryAll()
      .catch((err) => {

        console.info(err);
        this.appStateService.addGrowl({ severity: 'error', summary: 'Server Error :', detail: "The server has responded with an error. Please contact your Administrator"});

        return this.router.navigateByUrl('/')
      });
  }


}
