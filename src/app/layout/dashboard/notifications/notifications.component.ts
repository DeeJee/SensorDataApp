import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/NotificationModel';
import { NotificationsService } from './notifications.service';

import { SignalR, BroadcastEventListener, ISignalRConnection } from 'ng2-signalr';
import { Subscription } from 'rxjs';

@Component({
  providers: [NotificationsService],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService,
    private _signalR: SignalR) { }

  notifications: NotificationModel[];

  private _connection: ISignalRConnection;
  private _subscription: Subscription;

  ngOnInit() {
    this.notificationsService.Get(10).subscribe(res => {
      this.notifications = res;
    }, err => null);

    let onNotificationReceived$ = new BroadcastEventListener<NotificationModel>('NotificationReceived');
    this._signalR.connect().then(c => {
      this._connection = c;
      // register the listener
      this._connection.listen(onNotificationReceived$);
    });

    // subscribe to event
    this._subscription = onNotificationReceived$.subscribe((notification: NotificationModel) => {
      console.log(`${notification.LogLevel}:${notification.Text}`);
      this.notifications.splice(0, 0, notification);
    });

  }


  showAll(): void {
    console.log("showAll clicked");
    this.notificationsService.GetAll().subscribe(res => {
      this.notifications = res;
    }, err => null);
  }

  delete(id: number): void {
    this.notificationsService.Delete(id).subscribe(res => {

      let index: number;
      this.notifications.forEach((item) => {
        if (item.Id === id) {
          index = this.notifications.indexOf(item);
        }
      })
      this.notifications.splice(index, 1);
    }, err => null);
  }
}
