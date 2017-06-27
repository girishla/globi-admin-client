import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { PTPWorkflowColumn } from "app/shared/models/ptp-workflow-cols.model";


@Component({
    templateUrl: './selectcolumns.html'
})
export class SelectTableColumns implements OnInit {
    sourceTableColumnList: SourceTableColumn[];
    selectedCols: SourceTableColumn[];
    selectedTable: string;
    columnNameList = [];


    ngOnInit(): void {

        this.selectedTable = this.route.snapshot.params['table'];

        if (this.ptpStateService.selectedCols) {
            this.selectedCols = this.ptpStateService.selectedCols;
        }

        this.route.data.subscribe(
            (data: { sourceTableColumn: SourceTableColumn[],selectedTableColumns:SourceTableColumn[] }) => {

                console.log(data.selectedTableColumns);

                this.selectedCols=data.selectedTableColumns;

                this.sourceTableColumnList = data.sourceTableColumn;
                var source = Observable.from(data.sourceTableColumn);
                source.map(column => column.columnName)
                    .subscribe(columnName => this.columnNameList.push({ label: columnName, value: columnName }));


            }
        );
    }

    constructor(private router: Router, private route: ActivatedRoute,
        private ptpStateService: PTPStateService) {


    }
    getColumnColour(col: SourceTableColumn) {

        if (col.integrationIdFlag) return 'blue';
        if (col.ccFlag) return 'red';
        if (col.buidIdFlag) return 'green';
        if (col.pguidFlag) return 'brown';

    }

    confirm() {
        

         this.syncSelection();
        
        let confirmationPageroute='/infaptp/datasources/' + this.route.snapshot.params['ds']
            + "/tables/" + this.route.snapshot.params['table'] + "/generate";
        this.router.navigateByUrl(confirmationPageroute);

    }

    selectTable() {

        this.syncSelection();
        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']);

    }


    private getWorkflowColFrom(sourceCol:SourceTableColumn):PTPWorkflowColumn{

        var wfCol = new PTPWorkflowColumn() 
        wfCol.buidColumn=sourceCol.buidIdFlag || false;
        wfCol.changeCaptureColumn=sourceCol.ccFlag || false;
        wfCol.integrationIdColumn=sourceCol.integrationIdFlag || false;
        wfCol.pguidColumn=sourceCol.pguidFlag || false;
        return wfCol;

    }

    private syncSelection():void{

        // this.selectedCols = this.sourceTableColumnList.slice();
        this.ptpStateService.selectedWorkflowCols=this.selectedCols.map(col => this.getWorkflowColFrom(col));
        this.ptpStateService.selectedCols = this.selectedCols;
        this.ptpStateService.sourceTableCols=this.sourceTableColumnList;

    }

    selectAll() {

        this.syncSelection();

    }
    removeAll() {
        this.selectedCols = [];
        this.syncSelection();
        
    }



}