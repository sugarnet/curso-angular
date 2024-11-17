import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {

  items = Array(20);
  @ViewChild(IonInfiniteScroll, {static: false}) ionInfiniteScroll: IonInfiniteScroll;

  constructor() { }

  ngOnInit() {
  }

  loadData(event: any) {

    console.log("Cargando nuevos elementos...");

    setTimeout(() => {

      if (this.items.length > 50) {
        event.target.complete();
        this.ionInfiniteScroll.disabled = true;
        return;
      }

      let newItems = Array(20);
      this.items.push(...newItems);
      event.target.complete();
    }, 1000);
  }
}
