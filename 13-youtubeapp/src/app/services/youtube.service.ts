import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyBB4-Cx_HvHfGBB6-7AkIuwD7u4TTz9o0Q';
  private playlistId = 'UUQFZLyU7ndDUk4epI-7QqXw';
  private urlApi = 'https://www.googleapis.com/youtube/v3';
  private nextPageToken: string;

  constructor(private http: HttpClient) { }

  getVideos() {
    const url = `${ this.urlApi }/playlistItems`;

    const httpParams = new HttpParams()
      .set('part', 'snippet')
      .set('playlistId', this.playlistId)
      .set('maxResults', '10')
      .set('key', this.apiKey);

      if(this.nextPageToken) {
        httpParams.set('pageToken', this.nextPageToken);
      }

    return this.http.get( url, { params: httpParams } )
                      .pipe( map((resp: any) => {
                        this.nextPageToken = resp.nextPageToken;

                        const videos:any[] = [];
                        for (const video of resp.items) {
                          videos.push(video.snippet);
                        }

                        return videos;
                      } ));

  }
}
