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
    routerEventSubscription;
    columnNameList = [];


    ngOnInit(): void {
        this.route.data.subscribe(
            (data: { sourceTableColumn: SourceTableColumn[] }) => {

                console.log(data);
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

    confirm() {

        this.routerEventSubscription = this.router.events.subscribe((val) => {
            //Dont care about what event NavigationStart/NavigationEnd as I need to show busy indicator as long as the router is doing something!

        });

        console.log(this.selectedCols);
        this.ptpStateService.columnsList = this.selectedCols;
        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']
            + "/tables/" + this.route.snapshot.params['table'] + "/generate");


    }

    selectTable() {
        this.routerEventSubscription = this.router.events.subscribe((val) => {
            //Dont care about what event NavigationStart/NavigationEnd as I need to show busy indicator as long as the router is doing something!

        });

        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds']);

    }



}