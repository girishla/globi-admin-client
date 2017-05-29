import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router,ActivatedRouteSnapshot } from '@angular/router';



@Component({
    templateUrl: './selectsource.html'
})
export class SelectSource implements OnInit {

    sourceSystemValue: string;

    ngOnInit(): void {
    
        this.sourceSystemValue=this.sourceSystemValue|| "GEN";

    }


    selecttable() {
        this.router.navigateByUrl('/infaptp/datasources/' + this.sourceSystemValue.toLowerCase());

    }

    
    constructor(private router: Router, private route: ActivatedRoute) {



    }




}