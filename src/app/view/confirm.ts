import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { ConfirmationService, Message } from "primeng/primeng";


@Component({
    templateUrl: './confirm.html'
})
export class PTPConfirmGenerate implements OnInit {

    selectedCols: SourceTableColumn[];
    upload: Boolean = true;
    uploadAndRun: Boolean = true;
    sourceFilter: string;
    workflowName: string;
    ptpWorkflow: PTPWorkflow;
    msgs: Message[] = [];




    ngOnInit(): void {
        this.selectedCols = this.ptpStateService.selectedCols;
        this.workflowName = "PTP_" + this.ptpStateService.selectedSource + "_" + this.ptpStateService.selectedTable;


        if (!this.selectedCols) {
            console.warn("redirecting to start as no selected columns found.");
            this.router.navigateByUrl('/infaptp/start');
        }

    }

    constructor(private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private ptpStateService: PTPStateService,
        private workflowService: PTPWorkflowsService) {

    }


    getColumnColour(col: SourceTableColumn) {

        if (col.integrationIdFlag) return 'blue';
        if (col.ccFlag) return 'red';
        if (col.buidIdFlag) return 'green';
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

                this.workflowService.saveAll(this.ptpWorkflow).subscribe(response => {

                    console.log(response);
                    this.msgs = [{ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued' }];
                    this.router.navigateByUrl('/infaptp/workflows');
                });

            }
        });



    }



}