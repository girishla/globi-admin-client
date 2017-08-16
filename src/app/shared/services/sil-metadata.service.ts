import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SilMetadata} from '../models/sil-metadata.model';

@Injectable()
export class SilMetadataService {
  constructor (
    private apiService: ApiService
  ) {

  

  }

  queryTable(tableName:String): Observable<{silMetadata: SilMetadata[]}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    return this.apiService
    .get(
      '/infagen/metadata/sil/tables/' + tableName,
      params
    ).map(data => data);
  }


}
