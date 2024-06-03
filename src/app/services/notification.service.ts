import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];

  constructor() { }

  getNotifications(): Observable<Notification[]> {
    // Logique pour récupérer les notifications depuis une source de données (par exemple, une API)
    return of(this.notifications);
  }

  markAsRead(id: number): Observable<void> {
    // Logique pour marquer une notification comme lue
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return of();
  }

  deleteNotification(id: number): Observable<void> {
    // Logique pour supprimer une notification
    this.notifications = this.notifications.filter(n => n.id !== id);
    return of();
  }
}
