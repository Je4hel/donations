import { Component, OnInit } from "@angular/core";

import { NotificationService } from "../services/notification.service";
import { AppNotification, NotificationType } from "../models/app-notification";

@Component({
    selector: 'my-app',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = 'Donations';
    notifications: AppNotification[] = [];

    constructor(private _notificationService: NotificationService) {}

    public ngOnInit(): void {
        this._notificationService.getNotifications()
            .subscribe(notification => {
                if (notification.duration > 0) {
                    setTimeout(() => {
                        let idx = this.notifications.indexOf(notification);
                        this.notifications.splice(idx, 1);
                    }, notification.duration);
                }

                this.notifications.push(notification);
            });
    }
}
