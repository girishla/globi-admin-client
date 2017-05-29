import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";


@Injectable()
export class SourceTableResolver implements Resolve<SourceTable> {
  constructor(
    private sourceTablesService: SourceTablesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.sourceTablesService.queryAll(route.params['ds'])
           .catch((err) => this.router.navigateByUrl('/'));
  }
  

}
