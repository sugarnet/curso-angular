import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superheros: Observable<any[]>;

  segment: string;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.superheros = this.dataService.getSuperHeros();
  }

  segmentChanged(event) {

    this.segment = event.detail.value;
  }
}
