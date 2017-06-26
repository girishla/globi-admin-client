import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationStart } from "@angular/router";
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";

@Component({
    selector: 'pull-to-puddle-wizard',
    templateUrl: './pull-to-puddle-wizard.component.html',
    //  providers: [PTPStateService]
})

export class PullToPuddleWizardComponent implements OnInit {

    tables: SourceTable[];
    stepsItems;

    constructor(
        private stService: SourceTablesService,
        private router: Router,
        private route: ActivatedRoute,
        private ptpStateService:PTPStateService

    ) {


    }

    activeIndex: number;
    sourceSystemValue: string = "";

    msgs: Message[] = [];




    onChange(label: string) {

    }


    setCurrentIndex(url) {

        if (url === "/infaptp/start") {
            this.activeIndex = 0;
        }
        else if (((url.startsWith("/infaptp/datasources")) && (url.indexOf("tables") === -1))) {
            this.activeIndex = 1;
        }
        else if ((url.indexOf("tables") > 0)  && (url.indexOf("generate") === -1)) {
            this.activeIndex = 2;
        }
        else if (url.indexOf("generate") > 0) {
            this.activeIndex = 3;
        }


    }

    ngOnInit(): void {

        this.setCurrentIndex(this.router.url);

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                var data = this.route.snapshot.children[0] && this.route.snapshot.children[0].data;

                this.setCurrentIndex(val.url);

            }

        });


     this.stepsItems = [
            {
                label: 'Source'
            },
            {
                label: 'Table'
            },
            {
                label: 'Columns'
            },
            {
                label: 'Confirmation'
            }
        ];

    }

}