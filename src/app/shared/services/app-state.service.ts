import { Message } from "primeng/primeng";
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppStateService {
    msgUpdated: EventEmitter<Message[]> = new EventEmitter();
    growlUpdated: EventEmitter<Message[]> = new EventEmitter();


    addMessage(msg: Message) {

        this.msgUpdated.emit([msg]);

    }

    addMessages(msgs: Message[]) {

        this.msgUpdated.emit(msgs);

    }

    addGrowl(msg: Message) {

        this.growlUpdated.emit([msg]);

    }

    addGrowls(msgs: Message[]) {

        this.growlUpdated.emit(msgs);

    }


}