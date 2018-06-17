import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/NotificationModel';
import { NotificationsService } from './notifications.service';

@Component({
  providers: [NotificationsService],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  notifications: NotificationModel[];

  ngOnInit() {
    this.notificationsService.Get(10).subscribe(res => {
      this.notifications = res;
    }, err => null);
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
