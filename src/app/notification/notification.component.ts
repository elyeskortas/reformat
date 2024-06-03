// notification.component.ts

import { Component, OnInit } from '@angular/core';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications()
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id)
      .subscribe(() => {
        // Actualiser la liste des notifications après avoir marqué comme lu
        this.loadNotifications();
      });
  }

  deleteNotification(id: number): void {
    this.notificationService.deleteNotification(id)
      .subscribe(() => {
        // Actualiser la liste des notifications après avoir supprimé
        this.loadNotifications();
      });
  }
}
