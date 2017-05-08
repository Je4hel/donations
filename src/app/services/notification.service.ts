import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { AppNotification } from "../models/app-notification";

@Injectable()
export class NotificationService {
    notifications: Subject<AppNotification> = new Subject<AppNotification>();

    public queue(notification: AppNotification) {
        console.log("Queued", notification);
        this.notifications.next(notification);
    }

    public getNotifications(): Observable<AppNotification> {
        return this.notifications.asObservable();
    }
}