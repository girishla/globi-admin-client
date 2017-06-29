import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTable } from '../models/source-table.model';
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";

@Injectable()
export class PTPWorkflowsService {
  constructor(
    private apiService: ApiService
  ) {



  }

  queryByName(workflowName: string): Observable<{ ptpWorkflows: PTPWorkflow[], workflowCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    params.set("name", workflowName);
    return this.apiService
      .get(
      '/ptpworkflows/search/findByWorkflowName',
      params
      ).map(data => data);
  }


  queryAll(): Observable<{ ptpWorkflows: PTPWorkflow[], workflowCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();


    return this.apiService
      .get(
      '/ptpworkflows?page=0&size=300&sort=modifiedDate,desc',
      params
      ).map(data => data._embedded.ptpworkflows);
  }

  save(workflow: PTPWorkflow):  Observable<PTPWorkflow> {

    return this.apiService.post("/infagen/workflows/ptp",workflow);

  }


}
