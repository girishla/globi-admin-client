import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";


@Injectable()
export class SourceTableColumnsResolver implements Resolve<SourceTable> {
  constructor(
    private sourceTableColumnsService: SourceTableColumnsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.sourceTableColumnsService.queryAll(route.params['ds'], route.params['table'])
      .catch((err) => this.router.navigateByUrl('/'));
  }


}
