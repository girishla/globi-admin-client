import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    templateUrl: './selecttables.html'
})
export class SelectTables implements OnInit {
    sourceTableList: SourceTable[];
    tableNameList = [];

    ngOnInit(): void {
        this.route.data.subscribe(



            (data: { sourceTable: SourceTable[] }) => {
                this.sourceTableList = data.sourceTable;
                var source = Observable.from(data.sourceTable);
                source.map(table => table.tableName)
                    .subscribe(tableName => this.tableNameList.push({ label: tableName, value: tableName }));

            }
        );
    }

    constructor(private router: Router, private route: ActivatedRoute) {



    }




}