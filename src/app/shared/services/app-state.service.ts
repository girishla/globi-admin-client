import { Message, MenuItem } from "primeng/primeng";
import { Injectable, EventEmitter } from '@angular/core';
import find from "lodash/find";
import { Observable } from "rxjs/Observable";
import { RouterLink } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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