import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';



@Component({
    templateUrl: './selecttable.html'
})
export class SelectTable implements OnInit {
    sourceTableList: SourceTable[];
    tableNameList = [];
    routerEventSubscription;
    isRunning:Boolean=true;
    selectedTable: string;


    ngOnInit(): void {

    

        this.route.data.subscribe(
            (data: { sourceTable: SourceTable[] }) => {
                this.isRunning=false;
                this.sourceTableList = data.sourceTable;
                var source = Observable.from(data.sourceTable);
                source.map(table => table.tableName)
                    .subscribe(tableName => this.tableNameList.push({ label: tableName, value: tableName }));

            }
        );
    }


    selectColumns() {

        this.routerEventSubscription = this.router.events.subscribe((val) => {
            //Dont care about what event NavigationStart/NavigationEnd as I need to show busy indicator as long as the router is doing something!
        });

        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds'] + "/tables/" + this.selectedTable.toLowerCase() + "/columns");
    }

    selectSource() {

        this.routerEventSubscription = this.router.events.subscribe((val) => {
            //Dont care about what event NavigationStart/NavigationEnd as I need to show busy indicator as long as the router is doing something!
        });


        this.router.navigateByUrl('/infaptp/start');
    }



    constructor(private router: Router, private route: ActivatedRoute) {



    }




}