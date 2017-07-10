import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPWorkflow } from "app/shared/models/ptp-workflow.model";
import { Puddles } from "app/view/puddles";


@Component({
    templateUrl: './selectcolumns.html'
})
export class SelectTableColumns implements OnInit {
    sourceTableColumnList: SourceTableColumn[];
    selectedCols: SourceTableColumn[];
    selectedTable: string;
    selectedSource: string;
    columnNameList = [];
    inWizardContext: Boolean = true;



    ngOnInit(): void {

        //To hide wizard buttons when accessed as a child route of Puddles view
        if (this.router.url.includes("puddles", 0)) {
            this.inWizardContext = false;
        }

        this.selectedTable = this.route.snapshot.params['table'];
        this.selectedSource = this.route.snapshot.params['ds'];

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

        if(!this.inWizardContext){
            this.ptpStateService.clearState();
        }
        


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

        let confirmationPageroute = '/infaptp/datasources/' + this.route.snapshot.params['ds']
            + "/tables/" + this.route.snapshot.params['table'] + "/generate";
        this.router.navigateByUrl(confirmationPageroute);

    }

    selectTable() {

        this.syncSelection();
        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']);

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


    saveAndGenerate() {
        this.syncSelection();
        let ptpWorkflow = new PTPWorkflow();
        ptpWorkflow.sourceName = this.selectedSource.toUpperCase();
        ptpWorkflow.sourceTableName = this.selectedTable.toUpperCase();
        ptpWorkflow.workflowName = this.ptpStateService.getWorkflowName().toUpperCase();
        ptpWorkflow.columns = this.ptpStateService.selectedWorkflowCols;

        this.workflowService.generate(ptpWorkflow).subscribe(generated => {

            if (generated) {

                Puddles.returned.next(ptpWorkflow.workflowName);

                this.router.navigateByUrl("/infaptp/puddles")
            }
        }


        );


    }



}