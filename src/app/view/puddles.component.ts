import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { DatePipe } from "@angular/common/common";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { ConfirmationService, Message as GrowlMessage } from "primeng/primeng";
import { AppStateService } from "app/shared/services/app-state.service";
import { ConfigService } from "app/shared/services/stomp/config/config.service";
import { STOMPService, STOMPState } from "app/shared/services/stomp";
import { WorkflowNotificationMessage } from "app/shared/models/workflow-notification.model";
import { Message as StompMessage, Message } from 'stompjs';
import { Subject } from "rxjs/Subject";
import find from "lodash/find";
import { Subscription } from "rxjs/Subscription";


@Component({
    templateUrl: './puddles.component.html'
})
export class Puddles implements OnInit {
    allWorkflows: PTPWorkflow[];
    selectedWorkflows: PTPWorkflow[];
    generateActions = [];
    showColumnsDialog: Boolean = false;
    public messages: Subject<Message>;
    showMessagesFlag: Boolean = false;
    workflowMessages: { [key: string]: string[] } = {};
    selectedWorkflow;
    messageSubscription: Subscription;


    ngOnInit(): void {


        // Get configuration from config service...
        this._configService.getConfig().then(
            config => {
                // ... then pass it to (and connect) STOMP:

                if (this._stompService.state.getValue() === STOMPState.CLOSED) {
                    this._stompService.configure(config);
                    this._stompService.try_connect().then(this.on_connect);
                }


            }
        );


        this.route.data.subscribe(
            (data: { ptpworkflows: PTPWorkflow[] }) => {

                this.allWorkflows = data.ptpworkflows;
                var allWorkflows$ = Observable.from(data.ptpworkflows);

                allWorkflows$.map(workflow => {
                    return { "id": workflow.id, "message": workflow.message };
                }).subscribe(wf => {

                    this.workflowMessages[wf.id] = wf.message && wf.message.split("\n")


                });

            }
            , (error) => {
                console.log(error);
                this.showError(error);

            });

    }


    ngOnDestroy(): void {
        // to avoid processing messages unnecessarily
        this._stompService.disconnect();
    }

    constructor(private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private workflowService: PTPWorkflowsService,
        private ptpStateService: PTPStateService,
        private appStateService: AppStateService, private _stompService: STOMPService,
        private _configService: ConfigService, private element: ElementRef) {


    }


    private showError(error) {
        this.appStateService.addMessage({ severity: 'error', summary: 'Server Error :', detail: error })
    }


    showMessagesDialog(id: string) {

        this.selectedWorkflow = id;
        this.showMessagesFlag = true;

    }


    editWizard(workflowId) {
        let editWorkflow = this.allWorkflows.filter(wf => wf.id == workflowId)[0];



        // this.ptpStateService.selectedCols=null;
        this.ptpStateService.selectedWorkflowCols = editWorkflow.columns;
        this.ptpStateService.selectedTable = editWorkflow.sourceTableName;
        this.ptpStateService.selectedSource = editWorkflow.sourceName;
        this.ptpStateService.targetTableName = editWorkflow.targetTableName;

        this.router.navigateByUrl('/infaptp/datasources/' + editWorkflow.sourceName.toLowerCase() + "/tables/" + editWorkflow.sourceTableName.toLowerCase() + "/columns?mode=edit");

    }




    generateWorkflow() {

        this.confirmationService.confirm({
            message: 'This might overwrite any existing definitions of the same workflow. Are you sure that you want to generate a new Workflow.?',
            accept: () => {
                var msgs: GrowlMessage[] = [];

                this.selectedWorkflows.forEach(ptpWorkflow => {

                    this.workflowService.save(ptpWorkflow).subscribe(response => {
                        Object.assign(ptpWorkflow, response);
                        ptpWorkflow.message = "";
                        msgs.push({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + ptpWorkflow.workflowName })
                        this.selectedWorkflows = [];
                        this.workflowMessages[ptpWorkflow.id] = [];

                    }, error => this.showError(error));


                });

                this.appStateService.addMessages(msgs);

            }
        });




    }

    newworkflow() {

        this.router.navigateByUrl('/infaptp/start');

    }

    /** Callback on_connect to queue */
    public on_connect = () => {

        // Store local reference to Observable
        // for use with template ( | async )
        this.messages = this._stompService.messages;

        // Subscribe a function to be run on_next message
        this.messages.subscribe(this.on_next);
    }

    /** Consume a message from the _stompService */
    public on_next = (msg: StompMessage) => {


        let norificationMsg: WorkflowNotificationMessage = JSON.parse(msg.body);



        Observable.from(this.allWorkflows)//
            .find(wf => wf.id === norificationMsg.workflowId)
            .subscribe(wf => {

                if (!this.workflowMessages || !this.workflowMessages[wf.id]) {
                    this.workflowMessages = {};
                    this.workflowMessages[wf.id] = [];
                }
                this.workflowMessages[wf.id].push(...(norificationMsg.messageStr && norificationMsg.messageStr.split("\n")));


                if (norificationMsg.workflowStatus) {
                    wf.workflowStatus = norificationMsg.workflowStatus;
                }

                if (norificationMsg.workflowStatus === "Processed") {
                    this.appStateService.addGrowl({ severity: 'Success', summary: 'Processing Completed', detail: 'Workflow Generation Successful for ' + wf.workflowName })

                }


            });



    }


}