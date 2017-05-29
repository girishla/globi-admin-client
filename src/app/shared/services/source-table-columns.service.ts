import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTableColumn} from '../models/source-table-column.model';

@Injectable()
export class SourceTableColumnsService {
  constructor (
    private apiService: ApiService
  ) {

  

  }

  queryAll(sourceName:string,tableName:string): Observable<{sourceTableColumns: SourceTableColumn[], sourceTableColumnCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();


    return this.apiService
    .get(
      '/infagen/datasources/' + sourceName + '/tables/' + tableName.toLowerCase() +   '/columns',
      params
    ).map(data => data);
  }


}
