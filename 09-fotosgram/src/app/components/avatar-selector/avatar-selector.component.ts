import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  avatars = [
      {
        img: 'av-1.png',
        selected: true
      },
      {
        img: 'av-2.png',
        selected: false
      },
      {
        img: 'av-3.png',
        selected: false
      },
      {
        img: 'av-4.png',
        selected: false
      },
      {
        img: 'av-5.png',
        selected: false
      },
      {
        img: 'av-6.png',
        selected: false
      },
      {
        img: 'av-7.png',
        selected: false
      },
      {
        img: 'av-8.png',
        selected: false
      },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  @Output() avatarSelected = new EventEmitter();
  @Input() setedAvatar: string;

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(a => a.selected = false);
    this.avatars.filter(a => a.img === this.setedAvatar).map(a => a.selected = true);
  }

  selectAvatar(avatar) {
    this.avatars.forEach(a => a.selected = false);
    avatar.selected = true;
    this.avatarSelected.emit(avatar.img);
  }
}
