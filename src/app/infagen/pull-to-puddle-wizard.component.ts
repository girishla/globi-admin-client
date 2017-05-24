import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router } from "@angular/router";
import { SourceTable } from "app/shared/models/source-table.model";
import { SourceTablesService } from "app/shared/services/source-tables.service";

@Component({
    selector: 'pull-to-puddle-wizard',
    templateUrl: './pull-to-puddle-wizard.component.html'
})

export class PullToPuddleWizardComponent implements OnInit {

    tables: SourceTable[];

    constructor(
        private stService: SourceTablesService

    ) {

        stService.queryAll().subscribe(data => {
            this.tables = data.sourceTables;
            console.log(data)  ;
        })
         

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

    onChange(label: string) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: label });
    }
    ngOnInit(): void {
        this.radioValue = "GEN";
    }

}