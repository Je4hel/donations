export enum NotificationType {
    Info,
    Success,
    Warning,
    Error
}

export class AppNotification {
    message: string;
    title: string;
    type: NotificationType;
    duration: number;

    constructor(message: string, title = "", type = NotificationType.Info, duration = 0) {
        this.message = message;
        this.title = title;
        this.type = type;
        this.duration = duration;
    }
}