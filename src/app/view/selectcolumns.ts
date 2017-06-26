import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";


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

        this.route.data.subscribe(
            (data: { sourceTableColumn: SourceTableColumn[] }) => {

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
    getColour(col: SourceTableColumn) {

        if (col.integrationIdFlag) return 'blue';
        if (col.ccFlag) return 'red';
        if (col.buidIdFlag) return 'green';
        if (col.pguidFlag) return 'brown';

    }

    confirm() {
        console.log(this.selectedCols);
        this.ptpStateService.columnsList = this.selectedCols;
        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']
            + "/tables/" + this.route.snapshot.params['table'] + "/generate");

    }

    selectTable() {

        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']);

    }

    selectAll() {
        this.selectedCols = this.sourceTableColumnList.slice();

    }
    removeAll() {
        this.selectedCols = [];

    }



}