import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { DatePipe } from "@angular/common/common";




@Component({
    templateUrl: './ptpworkflows.html'
})
export class PTPWorkflows implements OnInit {
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

        this.generateActions = [
            { label: 'Upload', icon: 'fa-angle-right', command: this.generateWorkflow({actions:"upload"})},
            { label: 'Upload & Run', icon: 'fa-angle-double-right',  command: this.generateWorkflow({actions:"uploadAndRun"})}
        ];

    }

    constructor(private router: Router, private route: ActivatedRoute) {


    }

    editworkflow() {
        console.log(this.selectedWorkflows);
        // this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']
        //     + "/tables/" + this.route.snapshot.params['table'] + "/generate");

    }

    generateWorkflow(options: {actions:string}) {

        if(options && options.actions==="upload"){
            //Generate & Upload

        }else{
            if(options && options.actions==="uploadAndRun"){


            //Generate, Upload & RUn
            }

        }

    }

    newworkflow() {

        this.router.navigateByUrl('/infaptp/start');

    }



}