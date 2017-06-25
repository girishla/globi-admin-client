import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";




@Component({
    templateUrl: './ptpworkflows.html'
})
export class PTPWorkflows implements OnInit {
    allWorkflows: PTPWorkflow[];
    selectedWorkflows: PTPWorkflow[];
    workflowNameList = [];


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
    }

    constructor(private router: Router, private route: ActivatedRoute) {


    }

    editworkflow() {
        console.log(this.selectedWorkflows);
        // this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']
        //     + "/tables/" + this.route.snapshot.params['table'] + "/generate");

    }

    newworkflow() {

        this.router.navigateByUrl('/infaptp/start');

    }



}