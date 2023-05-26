import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class PushService {

  messages: OSNotificationPayload[] = [];
  messagesListener = new EventEmitter<OSNotificationPayload>();
  userId: string;

  constructor( private oneSignal: OneSignal, private storage: Storage ) {
    this.loadMessages();
  }

  async initConfig() {
    this.oneSignal.startInit('236a0f86-ad35-4f3c-8609-53bab2dce61c', '989933885530');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(( notification ) => {
      // do something when notification is received
      console.log('Received', notification);
      this.notificationReceived(notification);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe( async( notification ) => {
      // do something when a notification is opened
      console.log('Opened', notification);
      await this.notificationReceived(notification.notification);
    });

    // get suscriptor
    this.oneSignal.getIds().then(data => {
      console.log(data.userId);
      this.userId = data.userId;
    });

    this.oneSignal.endInit();
  }

  async notificationReceived(notification: OSNotification) {
    await this.loadMessages();
    const payload = notification.payload;

    const exists = this.messages.find( m => m.notificationID === payload.notificationID);

    if(exists) {
      return;
    }

    this.messages.unshift(payload);
    this.messagesListener.emit(payload);
    await this.saveMessages();
  }

  async getMessages() {
    await this.loadMessages();
    return [...this.messages];
  }

  saveMessages() {
    this.storage.set('messages', this.messages);
  }

  async loadMessages() {
    this.messages = await this.storage.get('messages') || [];
    return this.messages;
  }

  async deleteMessages() {
    await this.storage.clear();
    await this.storage.remove('messsages');
    this.messages = [];
    this.saveMessages();
  }
}
