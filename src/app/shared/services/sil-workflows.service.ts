import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTable } from '../models/source-table.model';
import { SILWorkflow, SILTopDownRequest, SILTopDownRequestTable } from "app/shared/models/sil-workflow.model";
import { AppStateService } from "app/shared/services/app-state.service";
import { ErrorAPIResponse } from "app/shared/models/api-error.model";
import { Message, ConfirmationService } from "primeng/primeng";
import { Router } from "@angular/router";

@Injectable()
export class SILWorkflowsService {
  constructor(
    private apiService: ApiService,
    private appStateService: AppStateService,
    private confirmationService: ConfirmationService
  ) {



  }

  queryByName(workflowName: string): Observable<SILWorkflow> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    params.set("workflowName", workflowName);
    return this.apiService
      .get(
      '/silworkflows/search/findByWorkflowName',
      params
      ).map(data => data);
  }

  queryById(Id: string): Observable<SILWorkflow> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    params.set("name", Id);
    return this.apiService
      .get(
      '/silworkflows/' + Id,
      params
      ).map(data => data);
  }


  queryAll(): Observable<{ silWorkflows: SILWorkflow[], workflowCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();


    return this.apiService
      .get(
      '/silworkflows?page=0&size=300&sort=modifiedDate,desc',
      params
      ).map(data => data._embedded.silworkflows);
  }

  save(workflow: SILWorkflow): Observable<SILWorkflow> {

    return this.apiService.post("/infagen/workflows/sil", workflow);

  }


  regenerate(topDownRequests: SILTopDownRequestTable[], runWF: boolean) {

    var req: SILTopDownRequest;

    req = { tables: topDownRequests, runWorkflow: runWF };

    return this.apiService.post("/infagen/workflows/silFromMetadata", req);

  }

}
