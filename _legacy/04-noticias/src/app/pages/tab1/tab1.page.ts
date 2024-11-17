import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articles: Article[] = [];
  
  constructor( private newsService: NewsService ) {}
  
  ngOnInit(): void {
    this.loadNews();
  }

  loadData(event) {
    this.loadNews(event);
  }

  loadNews( event? ) {
    this.newsService.getTopHeadLines().subscribe(data => {
      console.log(data);

      if (data.articles.length == 0) {
        event.target.disabled = true;
        event.target.complete();
      }

      this.articles.push(...data.articles);

      if (event) {
        event.target.complete();
      }

    });
  }
}
