import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  news: Article[] = [];
  
  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  constructor( private newService: NewsService ) {
    
  }
  
  ngOnInit(): void {
    this.segment.value = this.categories[0];
    // this.newService.getTopHeadLinesCategory(this.segment.value).subscribe(data => console.log(data));
    this.loadNews(this.categories[0]);
  }

  loadData(event) {
    this.loadNews(this.segment.value, event);
  }
  
  loadNews(category: string, event?) {
    console.log(this.segment.value);
    this.newService.getTopHeadLinesCategory(category).subscribe(data => {

      console.log(data);

      this.news.push(...data.articles);

      if (event) {
        event.target.complete();
      }
    });

  }

  changeCategory(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  

}
