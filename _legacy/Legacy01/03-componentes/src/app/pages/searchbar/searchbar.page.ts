import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {

  albums: any[] = [];
  text: string;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.getAlbums().subscribe(data => this.albums = data);
  }

  search(event) {

    this.text = event.detail.value;

  }
}
