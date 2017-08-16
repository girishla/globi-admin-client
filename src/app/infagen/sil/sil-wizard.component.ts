import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Message, MenuItem } from 'primeng/components/common/api';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, NavigationEnd } from "@angular/router";
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { SILStateService } from "app/infagen/sil/sil-state.service";



@Component({
    selector: 'sil-wizard',
    templateUrl: './sil-wizard.component.html',


})

export class SilWizardComponent implements OnInit {

    tables: SourceTable[];
    stepsItems: MenuItem[];

    constructor(
        private stService: SourceTablesService,
        private router: Router,
        private route: ActivatedRoute,
        private silStateService: SILStateService

    ) {


    }

    activeIndex: number;
    sourceSystemValue: string = "";

    msgs: Message[] = [];


    setCurrentIndex(url) {

        if (url === "/infa/silworkflows/generate/start") {
            this.activeIndex = 0;
        }
        else if (url === "/infa/silworkflows/generate/tables") {

            this.activeIndex = 1;
        }
        else if (((url.startsWith("/infa/silworkflows/generate/tables")) && (url.indexOf("fact") != -1 || url.indexOf("dimension") != -1))) {
            this.activeIndex = 2
        }

    }

    ngOnDestroy(): void {

        this.silStateService.clearState();

    }

    ngOnInit(): void {

        this.setCurrentIndex(this.router.url);

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                var data = this.route.snapshot.children[0] && this.route.snapshot.children[0].data;

                this.setCurrentIndex(val.url);

            }

        });

        this.stepsItems = [
            {
                label: 'Start'
            },
            {
                label: 'Select Metadata Definition'
            },
            {
                label: 'Review & Confirm'

            }
        ];


    }

}