import { Message } from "primeng/primeng";
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppStateService {
    msgUpdated: EventEmitter<Message> = new EventEmitter();
    growlUpdated: EventEmitter<Message> = new EventEmitter();


    addMessage(msg: Message) {

        this.msgUpdated.emit(msg);

    }

    addGrowl(msg: Message) {

        this.growlUpdated.emit(msg);

    }


}