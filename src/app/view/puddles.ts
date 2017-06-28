import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { DatePipe } from "@angular/common/common";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { ConfirmationService } from "primeng/primeng";
import { AppStateService } from "app/shared/services/app-state.service";




@Component({
    templateUrl: './puddles.html'
})
export class Puddles implements OnInit {
    allWorkflows: PTPWorkflow[];
    selectedWorkflows: PTPWorkflow[];
    workflowNameList = [];
    generateActions = [];


    ngOnInit(): void {
        this.route.data.subscribe(
            (data: { ptpworkflows: PTPWorkflow[] }) => {

                console.log(data);
                this.allWorkflows = data.ptpworkflows;
                var allWorkflows$ = Observable.from(data.ptpworkflows);

                allWorkflows$.map(workflow => workflow.workflowName)
                    .subscribe(workflowName => this.workflowNameList.push({ label: workflowName, value: workflowName }));

            }
        );

        // this.generateActions = [
        //     { label: 'Upload', icon: 'fa-angle-right', command: this.generateWorkflow({ actions: "upload" }) },
        //     { label: 'Upload & Run', icon: 'fa-angle-double-right', command: this.generateWorkflow({ actions: "uploadAndRun" }) }
        // ];

    }

    constructor(private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private workflowService: PTPWorkflowsService,
        private appStateService: AppStateService) {


    }

    editworkflow() {
        console.log(this.selectedWorkflows);
        // this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']
        //     + "/tables/" + this.route.snapshot.params['table'] + "/generate");

    }

    generateWorkflow(options: { actions }) {

        if (options && options.actions === "upload") {


        } else {
            if (options && options.actions === "uploadAndRun") {


                //Generate, Upload & RUn
            }

        }



        this.confirmationService.confirm({
            message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
            accept: () => {

                this.selectedWorkflows.forEach(ptpWorkflow => {

                    this.workflowService.save(ptpWorkflow).subscribe(response => {
                        Object.assign(ptpWorkflow,response);

                    });


                });

                this.appStateService.addMessage({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued' });

            }
        });




    }

    newworkflow() {

        this.router.navigateByUrl('/infaptp/start');

    }



}