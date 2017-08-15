import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationStart } from '@angular/router';
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";



@Component({
    templateUrl: './selectsource.html'
})
export class SelectSource implements OnInit {

    sourceSystemValue: string;

    ngOnInit(): void {

        this.sourceSystemValue = this.ptpStateService.selectedSource || "GEN";

    }


    selecttable() {

        if (!(this.ptpStateService.selectedSource == this.sourceSystemValue)) {
            this.ptpStateService.sourceTableList = null;
        }
        this.ptpStateService.selectedSource = this.sourceSystemValue;
        this.router.navigateByUrl('/infaptp/datasources/' + this.sourceSystemValue.toLowerCase());


    }


    constructor(private router: Router, private route: ActivatedRoute, private ptpStateService: PTPStateService) {



    }




}