import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";
import { SilMetadata } from "app/shared/models/sil-metadata.model";
import { Observable } from "rxjs/Observable";
import { SILTopDownRequest, SILWorkflow } from "app/shared/models/sil-workflow.model";
import { ConfirmationService, Message } from "primeng/primeng";
import { SILWorkflowsService } from "app/shared/services/sil-workflows.service";
import { AppStateService } from "app/shared/services/app-state.service";
import { ErrorAPIResponse } from "app/shared/models/api-error.model";


@Component({
    selector: 'app-sil-confirm-dimension',
    templateUrl: './sil-confirm-dimension.component.html',
    styleUrls: ['./sil-confirm-dimension.component.css']
})

export class SilConfirmDimensionComponent implements OnInit {


    silMetadata: SilMetadata[];
    silMetadataPrimary: SilMetadata[];
    silMetadataMini: SilMetadata[];
    silMetadataLegacy: SilMetadata[];

    selectedTable: string;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private silStateService: SILStateService,
        private confirmationService: ConfirmationService,
        private workflowService: SILWorkflowsService,
        private appStateService: AppStateService) {



    }



    ngOnInit() {

        this.route.params.subscribe(params => {
            this.selectedTable = params['table'];

        });

        this.route.data.subscribe(

            (data: { silMetadata: SilMetadata[] }) => {
                this.silMetadata = data.silMetadata;

                let metadata$ = Observable.from(this.silMetadata);

                metadata$.filter(col => col.targetColumnFlag && col.stageColumnFlag && (col.columnType === "Attribute" || col.columnType === "Measure Attribute")).toArray()
                    .subscribe(cols => this.silMetadataPrimary = cols);

                metadata$.filter(col => col.miniDimColumnFlag && col.stageColumnFlag && (col.columnType === "Attribute" || col.columnType === "Measure Attribute")).toArray()
                    .subscribe(cols => this.silMetadataMini = cols);

                metadata$.filter(col => col.legacyColumnFlag && col.stageColumnFlag && (col.columnType === "Attribute" || col.columnType === "Measure Attribute")).toArray()
                    .subscribe(cols => this.silMetadataLegacy = cols);


            }


        );

    }


    selectMetadataTable() {
        this.router.navigateByUrl('/infa/silworkflows/generate/tables');
    }


    showError(error: ErrorAPIResponse) {

        this.appStateService.addMessage({ severity: 'error', summary: 'Server Error :', detail: error.userMessage });
    }

    cancel(){
        this.router.navigateByUrl('/infa/silworkflows');
    }



    generate() {


        this.confirmationService.confirm({
            message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
            accept: () => {

                var msgs: Message[] = [];
                let topDownRequests: SILTopDownRequest[] = [];

                let topDownRequestItem = new SILTopDownRequest();

                topDownRequestItem.loadType = "DIMENSION";
                topDownRequestItem.tableName =  this.selectedTable;
                topDownRequests.push(topDownRequestItem)


                this.workflowService.regenerate(topDownRequests).subscribe(response => {
                    Object.assign(SILWorkflow, response);
                    msgs.push({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued.' })

                }, error => this.showError(error));



                this.appStateService.addMessages(msgs);
                this.router.navigateByUrl('/infa/silworkflows');



            }
        });







    }



}
