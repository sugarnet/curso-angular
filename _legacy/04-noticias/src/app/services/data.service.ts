import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  articles: Article[] = [];

  constructor(private storage: Storage) {
    this.loadNews();
  }

  async saveNew( article: Article ) {

    const existe = this.articles.find( a => a.title === article.title );

    if(!existe) {
      this.articles.unshift(article);
      await this.storage.set('articles', this.articles);
    }

  }

  async loadNews() {
    const articles = await this.storage.get('articles');

    if (articles) {
      this.articles = articles;
    } 
  }

  async deleteNew(article: Article) {
    this.articles = this.articles.filter(a => a.title != article.title);
    await this.storage.set('articles', this.articles);

  }
}
