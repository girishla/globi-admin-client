import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SilMetadataTable} from '../models/sil-metadata-table.model';

@Injectable()
export class SilMetadataTablesService {
  constructor (
    private apiService: ApiService
  ) {

  

  }


  queryAll(): Observable<{silMetadataTables: SilMetadataTable[]}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();


    return this.apiService
    .get(
      '/infagen/metadata/sil/tables',
      params
    ).map(data => data);
  }


}
