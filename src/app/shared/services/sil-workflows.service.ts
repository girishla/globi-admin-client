import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTable } from '../models/source-table.model';
import { SILWorkflow } from "app/shared/models/sil-workflow.model";
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


  generate(silWorkflow: SILWorkflow):Observable<Boolean> {


    return Observable.create((observer: Observer<boolean>) => {

      this.confirmationService.confirm({
        message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
        accept: () => {

          this.save(silWorkflow).subscribe(response => {

            this.appStateService.addMessage({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + silWorkflow.workflowName });
            observer.next(true);
            observer.complete();
          }, (error: ErrorAPIResponse) => {
            console.log(error);
            var msgs: Message[] = [];

            if (error.validationErrors && error.validationErrors.length > 0) {
              error.validationErrors.forEach(validationError => msgs.push({ severity: 'error', summary: 'Validation Failed :', detail: validationError.message }))
            }

            if (msgs.length > 0) {
              this.appStateService.addGrowls(msgs);
            } else {
              this.appStateService.addGrowl({ severity: 'error', summary: 'Submission Error :', detail: error.userMessage })
            }
            observer.next(false);
            observer.complete();

          });

        }
      });

    });








  }


}
