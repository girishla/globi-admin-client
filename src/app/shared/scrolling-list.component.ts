import { Component, AfterViewChecked, ElementRef, Input } from '@angular/core';



@Component({
    selector: 'scrolling-list',
    template: `
        <div style="max-height:200px; overflow-y:auto;" class="scrolling-list">
            <ul style="list-style: none;">
                <li *ngFor="let message of messages;">
                    {{ message }}
                </li>
            </ul>
        </div>
    `
})



export class ScrollingListComponent implements AfterViewChecked {
    @Input() messages: any[] = [];
    private _prevScrollingListHeight: number = 0;
    private elScrollingList;

    constructor(public element: ElementRef) {



    }

    ngOnInit() {

        this.elScrollingList = this.element.nativeElement.querySelector('.scrolling-list');

    }

    public ngAfterViewChecked(): void {
        /* need _canScrollDown because it triggers even if you enter text in the textarea */

        if (this._canScrollDown()) {
            this.scrollDown();
        }
    }

    private _canScrollDown(): boolean {
        /* compares prev and current scrollHeight */

        var can = (this._prevScrollingListHeight !== this.elScrollingList.scrollHeight);

        this._prevScrollingListHeight = this.elScrollingList.scrollHeight;

        return can;
    }

    public scrollDown(): void {
        this.elScrollingList.scrollTop = this.elScrollingList.scrollHeight;
    }
}