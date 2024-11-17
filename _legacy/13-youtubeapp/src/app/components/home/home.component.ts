import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor( private youtubeService: YoutubeService ) { }

  ngOnInit() {
    this.youtubeService.getVideos().subscribe(data => {
      console.log(data);
      this.videos = data;
    });
  }

  verVideo(video: any) {
    this.videoSel = video;

    $('#exampleModal').modal();
  }

  cerrar() {
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }

  verMas() {
    this.youtubeService.getVideos().subscribe(data => {
      console.log(data);
      this.videos.push.apply(this.videos, data);
    });
  }

}
