import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'IECmC7ZSwU9uD9BFizPX1Ei7IYOjopiY';
  private url: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeTags(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http
      .get(`${this.url}/search`, { params })
      .subscribe((resp) => console.log(resp));
  }

  private organizeTags(tag: string) {
    tag = tag.toLowerCase();
    tag = tag.trim();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }
}
