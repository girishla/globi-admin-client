import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { DatePipe } from "@angular/common/common";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { ConfirmationService, Message } from "primeng/primeng";
import { AppStateService } from "app/shared/services/app-state.service";





@Component({
    templateUrl: './puddles.html'
})
export class Puddles implements OnInit {
    allWorkflows: PTPWorkflow[];
    selectedWorkflows: PTPWorkflow[];
    workflowNameList = [];
    generateActions = [];
    showColumnsDialog: Boolean = false;


    ngOnInit(): void {



        this.route.data.subscribe(
            (data: { ptpworkflows: PTPWorkflow[] }) => {

                console.log(data);
                this.allWorkflows = data.ptpworkflows;
                var allWorkflows$ = Observable.from(data.ptpworkflows);

                allWorkflows$.map(workflow => workflow.workflowName)
                    .subscribe(workflowName => this.workflowNameList.push({ label: workflowName, value: workflowName }));

            }
            , (error) => {
                console.log(error);
                this.appStateService.addMessage({ severity: 'error', summary: 'Server Error :', detail: error });

            });


     //to reset child columns dialog on reentry to route
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd && event.url === "/infaptp/puddles") {
                    this.showColumnsDialog = false;
                }
                
            });

        // this.generateActions = [
        //     { label: 'Upload', icon: 'fa-angle-right', command: this.generateWorkflow({ actions: "upload" }) },
        //     { label: 'Upload & Run', icon: 'fa-angle-double-right', command: this.generateWorkflow({ actions: "uploadAndRun" }) }
        // ];

    }



    constructor(private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private workflowService: PTPWorkflowsService,
        private ptpStateService: PTPStateService,
        private appStateService: AppStateService) {


    }

    editworkflow(workflowId) {

        let editWorkflow = this.allWorkflows.filter(wf => wf.id == workflowId)[0];

        console.log("editWorkflow.columns", editWorkflow.columns);

        // this.ptpStateService.selectedCols=null;
        this.ptpStateService.selectedWorkflowCols = editWorkflow.columns;
        this.ptpStateService.selectedTable = editWorkflow.sourceTableName;
        this.ptpStateService.selectedSource = editWorkflow.sourceName;


        this.showColumnsDialog = true;

        this.router.navigateByUrl('/infaptp/puddles/' + workflowId + '/' + editWorkflow.sourceName.toLowerCase() + '/' + editWorkflow.sourceTableName.toLowerCase() + '/columns');

        //   this.router.navigate(['/infaptp/puddles/100//columns', id]);

    }

    hideColumnsDialog() {

        this.router.navigateByUrl('/infaptp/puddles');

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
                var msgs: Message[] = [];

                this.selectedWorkflows.forEach(ptpWorkflow => {

                    this.workflowService.save(ptpWorkflow).subscribe(response => {
                        Object.assign(ptpWorkflow, response);
                        msgs.push({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + ptpWorkflow.workflowName })

                    });


                });

                this.appStateService.addMessages(msgs);

            }
        });




    }

    newworkflow() {

        this.router.navigateByUrl('/infaptp/start');

    }



}