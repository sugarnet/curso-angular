import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() item: any;
  @Output() clickPost = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  clickEnPost() {
    this.clickPost.emit(this.item.id);
  }

}
