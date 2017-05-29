import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationStart } from "@angular/router";
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";

@Component({
    selector: 'pull-to-puddle-wizard',
    templateUrl: './pull-to-puddle-wizard.component.html'
})

export class PullToPuddleWizardComponent implements OnInit {

    tables: SourceTable[];

    constructor(
        private stService: SourceTablesService,
        private router: Router,
        private route: ActivatedRoute

    ) {

    }

    activeIndex: number;
    sourceSystemValue: string = "";

    msgs: Message[] = [];

    // next() {
    //     this.activeIndex++;
    // }

    // ok() {
    //     this.activeIndex = 0;
    // }


    selecttable() {
        this.router.navigateByUrl('/infaptp/datasources/' + this.sourceSystemValue.toLowerCase());

    }

    selectSource() {
        this.router.navigateByUrl('/infaptp');

    }

    selectColumns() {
        this.router.navigateByUrl('/infaptp/datasources/' + this.sourceSystemValue.toLowerCase() + "/tables");

    }


    onChange(label: string) {
        // this.msgs.length = 0;
        // this.msgs.push({ severity: 'info', summary: label });


    }


    setCurrentIndex(url) {

        if (url === "/infaptp") {
            this.activeIndex = 0;
        }
        else if (((url.startsWith("/infaptp/datasources")) && (url.indexOf("tables") === -1))) {
            this.activeIndex = 1;
        }
        else if (url.indexOf("tables") > 0) {
            this.activeIndex = 2;
        }
        else if (url.indexOf("confirmation") > 0) {
            this.activeIndex = 3;
        }


    }

    ngOnInit(): void {
        this.sourceSystemValue = "GEN";

        this.setCurrentIndex(this.router.url);

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                var data = this.route.snapshot.children[0] && this.route.snapshot.children[0].data;

                this.setCurrentIndex(val.url);

            }

        });

        /*        var data = this.route.snapshot.children[0] && this.route.snapshot.children[0].data;
        
                if (data && data['activeIndex'])
                    this.activeIndex = data['activeIndex'];
                else
                    this.activeIndex = 0;*/

    }

}