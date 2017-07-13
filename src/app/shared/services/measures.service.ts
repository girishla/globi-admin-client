import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Measure} from '../models/measure.model';

@Injectable()
export class MeasuresService {
  constructor (
    private apiService: ApiService
  ) {

  

  }

  queryByType(type:string): Observable<Measure[]> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    params.set("type", type);
    return this.apiService
    .get(
      '/measures/search/findByType',
      params
    ).map(data => data);
  }


  queryAll(): Observable<Measure[]> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    return this.apiService
    .get(
      '/measures/' ,
      params
    ).map(data => data);
  }


}
