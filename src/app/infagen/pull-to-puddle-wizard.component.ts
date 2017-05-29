import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
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

    activeIndex: number = 0;
    radioValue: string = "";

    msgs: Message[] = [];

    next() {

        this.activeIndex++;

    }


    ok() {
        this.activeIndex = 0;
    }


    gettables() {

        this.activeIndex++;
        this.router.navigateByUrl('/infagen/datasources/' + this.radioValue.toLowerCase());


    }

    onChange(label: string) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: label });



    }

    ngOnInit(): void {
        //        this.radioValue = "GEN";

        var data=this.route.snapshot.children[0] && this.route.snapshot.children[0].data;

        if (data && data['activeIndex'])
            this.activeIndex = data['activeIndex'];
        else
            this.activeIndex = 0;

    }

}