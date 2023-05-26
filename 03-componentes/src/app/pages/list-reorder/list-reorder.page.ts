import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {

  heroes = ['Batman', 'Flash', 'Superman', 'Wonder Woman', 'Aquaman', 'Cyborg'];

  constructor() { }

  ngOnInit() {
  }

  reorder(event) {
    // console.log(event);

    const item = this.heroes.splice(event.detail.from, 1)[0];
    this.heroes.splice(event.detail.to, 0, item);

    event.detail.complete();
  }

  guardar() {

    console.log(this.heroes);
  }

}
