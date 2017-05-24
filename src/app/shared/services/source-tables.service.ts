import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTable} from '../models/source-table.model';

@Injectable()
export class SourceTablesService {
  constructor (
    private apiService: ApiService
  ) {}

  queryByName(tableName:string): Observable<{sourceTables: SourceTable[], sourceTableCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    params.set("name", tableName);
    return this.apiService
    .get(
      '/sourceSystems/search/findByName',
      params
    ).map(data => data);
  }

  queryAll(): Observable<{sourceTables: SourceTable[], sourceTableCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    return this.apiService
    .get(
      '/infagen/datasources/lnicrm/tables',
      params
    ).map(data => data);
  }


}
