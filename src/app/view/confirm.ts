import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SourceTableColumn } from "app/shared/models/source-table-column.model";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";


@Component({
    templateUrl: './confirm.html'
})
export class PTPConfirmGenerate implements OnInit {

    selectedCols: SourceTableColumn[];

    ngOnInit(): void {
        this.selectedCols = this.ptpStateService.columnsList;
        if (!this.selectedCols) {
            this.router.navigateByUrl('/infaptp/start');
        }

    }

    constructor(private router: Router, private route: ActivatedRoute, private ptpStateService: PTPStateService) {

    }

    selectColumns() {

        this.router.navigateByUrl('/infaptp/datasources/' + this.route.snapshot.params['ds'] + "/tables/" + this.route.snapshot.params['table'] + "/columns");
    }

    generate() {

        console.log(this.selectedCols);

    }



}