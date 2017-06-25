import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";


@Injectable()
export class PTPWorkflowResolver implements Resolve<PTPWorkflow> {
  constructor(
    private PTPWorkflowsService: PTPWorkflowsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.PTPWorkflowsService.queryAll()
           .catch((err) => this.router.navigateByUrl('/'));
  }
  

}
