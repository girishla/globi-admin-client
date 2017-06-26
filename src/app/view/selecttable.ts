import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";



@Component({
    templateUrl: './selecttable.html'
})
export class SelectTable implements OnInit {
    sourceTableList: SourceTable[];
    tableNameList = [];
    selectedTable: string;


    ngOnInit(): void {

        if (this.ptpStateService.selectedTable) {
            this.selectedTable = this.ptpStateService.selectedTable;
        }


        this.route.data.subscribe(

            (data: { sourceTableList: SourceTable[] }) => {


                this.sourceTableList = data.sourceTableList;
                var source = Observable.from(data.sourceTableList);
                source.map(table => table.tableName)
                    .subscribe(tableName => {
                        this.tableNameList.push({ label: tableName, value: tableName });
                    });

                this.ptpStateService.sourceTableList = this.sourceTableList;
            }
        );


    }


    selectColumns() {
        this.ptpStateService.selectedTable = this.selectedTable;
        this.ptpStateService.sourceTableList = this.sourceTableList;
        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds'] + "/tables/" + this.selectedTable.toLowerCase() + "/columns");
    }

    selectSource() {


        this.router.navigateByUrl('/infaptp/start');
    }



    constructor(private router: Router, private route: ActivatedRoute, private ptpStateService: PTPStateService) {



    }




}