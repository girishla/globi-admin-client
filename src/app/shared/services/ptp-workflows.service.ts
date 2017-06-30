import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SourceTable } from '../models/source-table.model';
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { AppStateService } from "app/shared/services/app-state.service";
import { ErrorAPIResponse } from "app/shared/models/api-error.model";
import { Message, ConfirmationService } from "primeng/primeng";
import { Router } from "@angular/router";

@Injectable()
export class PTPWorkflowsService {
  constructor(
    private apiService: ApiService,
    private appStateService: AppStateService,
    private confirmationService: ConfirmationService
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

  save(workflow: PTPWorkflow): Observable<PTPWorkflow> {

    return this.apiService.post("/infagen/workflows/ptp", workflow);

  }


  generate(ptpWorkflow: PTPWorkflow):Observable<Boolean> {


    return Observable.create((observer: Observer<boolean>) => {

      this.confirmationService.confirm({
        message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
        accept: () => {

          this.save(ptpWorkflow).subscribe(response => {

            this.appStateService.addMessage({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + ptpWorkflow.workflowName });
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
