import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PushService } from '../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  messages: OSNotificationPayload[] = [];

  constructor( public pushService: PushService, private applicationRef: ApplicationRef ) {}

  ngOnInit() {

    this.pushService.messagesListener.subscribe(notification => {
      this.messages.unshift(notification);
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.messages = await this.pushService.getMessages();
  }

  async deleteMessages() {
    await this.pushService.deleteMessages();
    this.messages = [];
  }
}
