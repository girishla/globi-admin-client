import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router,ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";


@Component({
    templateUrl: './selectcolumns.html'
})
export class SelectTableColumns implements OnInit {
    sourceTableColumnList: SourceTableColumn[];
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

    constructor(private router: Router, private route: ActivatedRoute) {





    }




}