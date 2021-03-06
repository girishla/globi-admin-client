import {Component, Input} from '@angular/core';

@Component({
    selector: 'pe-step',
    styles: ['.pe-step-container {padding: 45px 25px 45px 25px; margin-bottom: 20px;}'],
    template: `
        <div *ngIf="active" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `
})
export class StepComponent {
    @Input() styleClass: string;
    @Input() label: string;
    active: boolean = false;
}