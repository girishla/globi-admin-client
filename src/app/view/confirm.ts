import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { ConfirmationService, Message } from "primeng/primeng";
import { AppStateService } from "app/shared/services/app-state.service";
import { ErrorAPIResponse } from "app/shared/models/api-error.model";


@Component({
    templateUrl: './confirm.html'
})
export class PTPConfirmGenerate implements OnInit {

    selectedCols: SourceTableColumn[];
    upload: Boolean = true;
    uploadAndRun: Boolean = true;
    sourceFilter: string;
    workflowName: string;
    targetTableName:string;
    ptpWorkflow: PTPWorkflow;




    ngOnInit(): void {
        this.selectedCols = this.ptpStateService.selectedCols;
        this.workflowName = "PTP_" + this.ptpStateService.selectedSource + "_" + this.ptpStateService.selectedTable;
        this.targetTableName=this.ptpStateService.targetTableName || (this.ptpStateService.selectedSource + "_" + this.ptpStateService.selectedTable).toUpperCase();

        if (!this.selectedCols || !this.ptpStateService.selectedSource || !this.ptpStateService.selectedTable) {
            console.warn("redirecting to start as required data not found.",this.selectedCols,this.ptpStateService.selectedSource,this.ptpStateService.selectedTable);
            this.router.navigateByUrl('/infaptp/start');
        }

    }

    constructor(private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private ptpStateService: PTPStateService,
        private workflowService: PTPWorkflowsService,
        private appStateService: AppStateService) {

    }


    getColumnColour(col: SourceTableColumn) {

        if (col.integrationIdFlag) return 'blue';
        if (col.ccFlag) return 'red';
        if (col.buidFlag) return 'green';
        if (col.pguidFlag) return 'brown';

    }

    selectColumns() {

        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds'] + "/tables/" + this.route.snapshot.params['table'] + "/columns");
    }

    generate() {

        this.confirmationService.confirm({
            message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
            accept: () => {
                this.ptpWorkflow = new PTPWorkflow();
                this.ptpWorkflow.sourceName = this.ptpStateService.selectedSource;
                this.ptpWorkflow.sourceTableName = this.ptpStateService.selectedTable;
                this.ptpWorkflow.workflowName = this.workflowName;
                this.ptpWorkflow.columns = this.ptpStateService.selectedWorkflowCols;
                this.ptpWorkflow.targetTableName=this.targetTableName;

                this.workflowService.save(this.ptpWorkflow).subscribe(response => {

                    console.log(response);
                    this.appStateService.addMessage({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + this.workflowName });
                    this.router.navigateByUrl('/infaptp/puddles');
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

                });

            }
        });



    }



}