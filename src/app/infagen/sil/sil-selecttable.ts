import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";



@Component({
    templateUrl: './sil-selecttable.html'
})
export class SILSelectTable implements OnInit {
    sourceTableList: SourceTable[];
    tableNameList = [];
    selectedTable: string;


    ngOnInit(): void {

        if (this.silStateService.selectedTable) {
            this.selectedTable = this.silStateService.selectedTable;
        }


        this.route.data.subscribe(

            (data: { sourceTableList: SourceTable[] }) => {


                this.sourceTableList = data.sourceTableList;
                var source = Observable.from(data.sourceTableList);
                source.map(table => table.tableName)
                    .subscribe(tableName => {
                        this.tableNameList.push({ label: tableName, value: tableName });
                    });

                // this.silStateService.sourceTableList = this.sourceTableList;
            }
        );


    }

    cancel(){
        this.router.navigateByUrl('/infa/silworkflows');
    }

    
    confirmDim() {


        this.router.navigateByUrl('/infa/silworkflows/generate/tables/' + this.selectedTable + "/dimension");
    }


    confirmFact() {

        this.router.navigateByUrl('/infa/silworkflows/generate/tables/' + this.selectedTable + "/fact");
    }

    selectSource() {


        this.router.navigateByUrl('/infa/silworkflows/generate/start');
    }



    constructor(private router: Router, private route: ActivatedRoute, private silStateService: SILStateService) {



    }




}