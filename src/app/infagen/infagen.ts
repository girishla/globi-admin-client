import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';


@Component({
    templateUrl: './infagen.html',
    styles: [`
        .ui-steps-item {
            width: 25%
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class Infagen implements OnInit {

    private stepsItems: MenuItem[];

    ngOnInit() {
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
            },
            {
                label: 'Confirmation'
            }
        ];
    }
}
