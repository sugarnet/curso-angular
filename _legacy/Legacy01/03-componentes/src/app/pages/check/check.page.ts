import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  items: any[] = [
    { name: 'primary', selected: true },
    { name: 'secondary', selected: false },
    { name: 'tertiary', selected: true },
    { name: 'danger', selected: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  onClick(check: any) {
    console.log(check);
  }

}
