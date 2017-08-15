import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";


@Component({
    templateUrl: './selectcolumns.html'
})
export class SelectTableColumns implements OnInit {
    sourceTableColumnList: SourceTableColumn[];
    selectedCols: SourceTableColumn[];
    selectedTable: string;
    selectedSource: string;
    columnNameList = [];
    editMode: Boolean = false;



    ngOnInit(): void {

        this.selectedTable = this.route.snapshot.params['table'];
        this.selectedSource = this.route.snapshot.params['ds'];


        this.route.queryParams.subscribe(params => {
            if (params['mode'] === "edit") {
                this.editMode = true;
                this.ptpStateService.editMode=true;
            }

        })

        //back and forth navigation
        if(this.ptpStateService.editMode===true){
            this.editMode=true;
        }

        if (this.ptpStateService.selectedCols) {
            this.selectedCols = this.ptpStateService.selectedCols;
        }


        this.route.data.subscribe(
            (data: { sourceTableColumn: SourceTableColumn[], selectedTableColumns: SourceTableColumn[] }) => {



                this.selectedCols = [];

                data.sourceTableColumn.forEach((sourceCol) => {

                    let selCol = data.selectedTableColumns.find((selectedCol) => selectedCol.columnName === sourceCol.columnName);
                    if (selCol) {
                        Object.assign(sourceCol, selCol);
                        this.selectedCols.push(sourceCol);
                    }

                })



                this.sourceTableColumnList = data.sourceTableColumn;
                var source = Observable.from(data.sourceTableColumn);
                source.map(column => column.columnName)
                    .subscribe(columnName => this.columnNameList.push({ label: columnName, value: columnName }));


            }
        );
    }

    ngOnDestroy(): void {


    }


    constructor(private router: Router, private route: ActivatedRoute,
        private ptpStateService: PTPStateService,
        private workflowService: PTPWorkflowsService) {


    }
    getColumnColour(col: SourceTableColumn) {

        if (col.integrationIdFlag) return 'blue';
        if (col.ccFlag) return 'red';
        if (col.buidFlag) return 'green';
        if (col.pguidFlag) return 'brown';

    }

    confirm() {


        this.syncSelection();

        let confirmationPageroute = '/infa/puddles/generate/datasources/' + this.route.snapshot.params['ds']
            + "/tables/" + this.route.snapshot.params['table'] + "/generate";
        this.router.navigateByUrl(confirmationPageroute);

    }

    selectTable() {

        this.syncSelection();
        this.router.navigateByUrl('/infa/puddles/generate/datasources/' + this.route.snapshot.params['ds']);

    }


    private getWorkflowColFrom(sourceCol: SourceTableColumn): PTPWorkflowColumn {

        var wfCol = new PTPWorkflowColumn()
        wfCol.buidColumn = sourceCol.buidFlag || false;
        wfCol.changeCaptureColumn = sourceCol.ccFlag || false;
        wfCol.integrationIdColumn = sourceCol.integrationIdFlag || false;
        wfCol.pguidColumn = sourceCol.pguidFlag || false;
        wfCol.sourceColumnName = sourceCol.columnName || "";
        return wfCol;

    }

    private syncSelection(): void {

        this.ptpStateService.selectedSource = this.selectedSource.toUpperCase();
        this.ptpStateService.selectedWorkflowCols = this.selectedCols.map(col => this.getWorkflowColFrom(col));
        this.ptpStateService.selectedCols = this.selectedCols;
        this.ptpStateService.sourceTableCols = this.sourceTableColumnList;

    }

    selectAll() {
        this.selectedCols = this.sourceTableColumnList.slice();
        this.syncSelection();

    }
    removeAll() {
        this.selectedCols = [];
        this.syncSelection();

    }




}