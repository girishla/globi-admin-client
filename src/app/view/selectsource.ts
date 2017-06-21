import { Component, OnInit } from '@angular/core';
import { SourceTable } from "app/shared/models/source-table.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationStart } from '@angular/router';



@Component({
    templateUrl: './selectsource.html'
})
export class SelectSource implements OnInit {

    sourceSystemValue: string;
    routerEventSubscription;

    ngOnInit(): void {

        this.sourceSystemValue = this.sourceSystemValue || "GEN";

    }


    selecttable() {

      this.routerEventSubscription=  this.router.events.subscribe((val) => {
        //Dont care about what event NavigationStart/NavigationEnd as I need to show busy indicator as long as the router is doing something!

        });

        this.router.navigateByUrl('/infaptp/datasources/' + this.sourceSystemValue.toLowerCase());


    }


    constructor(private router: Router, private route: ActivatedRoute) {



    }




}