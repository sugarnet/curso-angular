import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private pageHeadLines = 0;
  private pageCategory = 0;
  private currentCategory = '';

  constructor( private http: HttpClient ) { }

  private executeQuery<T>(query: string) {
    return this.http.get<T>(`${ apiUrl }${ query }`, { headers });
  }

  getTopHeadLines() {
    this.pageHeadLines++;
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${ this.pageHeadLines }`);
  }
  
  getTopHeadLinesCategory(category: string) {

    if (this.currentCategory === category) {
      this.pageCategory++;
    } else {
      this.currentCategory = category;
      this.pageCategory = 1;
    }

    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${ category }&page=${ this.pageCategory }`);
  }
}
