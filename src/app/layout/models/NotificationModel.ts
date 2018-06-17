export class NotificationModel {
    constructor(public Id: number,
        public DeviceId: string,
        public LogLevel: string,
        public Text: string,
        public Created: Date) { }
}