import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";
import { SILWorkflow, SILTopDownRequest, SILTopDownRequestTable } from "app/shared/models/sil-workflow.model";
import { DatePipe } from "@angular/common/common";
import { SILWorkflowsService } from "app/shared/services/sil-workflows.service";
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
    templateUrl: './sil-workflows.component.html'
})
export class SILWorkflows implements OnInit {
    allWorkflows: SILWorkflow[];
    selectedWorkflows: SILWorkflow[];
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
            (data: { silWorkflows: SILWorkflow[] }) => {

                console.log(data);


                this.allWorkflows = data.silWorkflows;
                var allWorkflows$ = Observable.from(data.silWorkflows);

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
        private workflowService: SILWorkflowsService,
        private silStateService: SILStateService,
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


    generateWorkflow(runWF:boolean ) {

        this.confirmationService.confirm({
            message: 'This will recreate any existing definitions of the same workflow using current Top-down metadata. Do you wish to proceed ?',
            accept: () => {
                var msgs: GrowlMessage[] = [];
                // let topDownRequests: SILTopDownRequest[]=[];

                this.selectedWorkflows.forEach(silWorkflow => {

                    let topDownRequestItem = new SILTopDownRequestTable();

                    topDownRequestItem.loadType = silWorkflow.loadType;
                    topDownRequestItem.tableName = silWorkflow.tableBaseName;
                    // topDownRequests.push(topDownRequestItem)

                    this.workflowService.regenerate([topDownRequestItem],runWF).subscribe(response => {
                        Object.assign(silWorkflow, response);
                        silWorkflow.message = "";
                        msgs.push({ severity: 'info', summary: 'Submitted', detail: 'Workflow Generation Queued for ' + silWorkflow.workflowName })
                        this.selectedWorkflows = [];
                        this.workflowMessages[silWorkflow.id] = [];

                    }, error => this.showError(error));


                });

                this.appStateService.addMessages(msgs);

            }
        });




    }

    newworkflow() {

        this.router.navigateByUrl('/infa/silworkflows/generate/start');

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