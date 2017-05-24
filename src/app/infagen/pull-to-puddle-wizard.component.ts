import {Component} from '@angular/core';
import {Message} from 'primeng/components/common/api';

@Component({
    selector: 'pull-to-puddle-wizard',
    templateUrl: './pull-to-puddle-wizard.component.html'
})
export class PullToPuddleWizardComponent {
    activeIndex: number = 0;
    firstName: string;
    lastName: string;
    address: string;

    msgs: Message[] = [];

    next() {
        this.activeIndex++;
    }

    ok() {
        this.activeIndex = 0;
    }

    onChange(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }
}